package tint_data

import (
	"encoding/json"
	"github.com/hashicorp/go-tfe"
	"io/ioutil"
	"net/http"
)




func Initialize(config *tfe.Config) ([]*Record, error) {
	// Attempt to load data from disk
	data, err := Load()
	if err == nil { return data, nil }

	client, _ := tfe.NewClient(config)

	// Grab all available Organizations
	organizations, err := getOrganizations(client)
	if err != nil {return nil, err }

	// Iterate all Organizations and fetch all available workspaces
	// with Cost Estimation enabled.
	workspaces, err := getWorkspaces(client, organizations)
	if err  != nil {return nil, err}

	// Iterate all Workspaces and get a list of Terraform Runs that have either
	// applied or destroyed resources and have an attached Cost Estimate
	runs, err := getRuns(client, workspaces)
	if  err != nil {return nil, err}

	data = populateCostData(runs, config)

	return data, nil
}



func populateCostData(records []*Record, config *tfe.Config) (ret []*Record) {
	// TODO: Optimize
	ret = make([]*Record, 0)

	for i, record := range records {
		providerCostBreakdown, err :=getProviderCostBreakdown(record, config)
		if err != nil {
			continue
		}

		record.ProviderCostBreakdown = providerCostBreakdown

		if i > 0 {
			for j, returnRecord := range ret {
				if returnRecord.EndTime.Before(record.StartTime) || returnRecord.EndTime.Equal(record.StartTime) {
					ret = append(ret, &Record{})
					copy(ret[j + 1:], ret[j:])
					ret[j] = record
				} else if j == len(ret) - 1 {
					ret = append(ret, returnRecord)
				}
			}
		} else {
			ret = append(ret, record)
		}


	}

	return
}

func getProviderCostBreakdown(record *Record, config *tfe.Config) (ret map[string]ProviderCostBreakdown, err error) {
	ret = make(map[string]ProviderCostBreakdown)

	url := config.Address + "/api/v2/cost-estimates/" + record.CostEstimateId

	client := &http.Client{}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {return nil, err}

	req.Header.Add("Authorization", "Bearer " + config.Token)
	resp, err := client.Do(req)
	if err != nil {return nil, err}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	var costEstimate CostEstimateResponse
	err = json.Unmarshal(body, &costEstimate)

	if err != nil {return nil, err}

	for _, resource := range costEstimate.Data.Attributes.Resources.Matched {
		var totalCost float64

		if record.IsDestroy {
			totalCost = 0
		} else {
			elapsedTime := record.EndTime.Sub(record.StartTime)
			if elapsedTime.Hours() < 1 {
				totalCost = resource.HourlyCost
			} else {
				totalCost = resource.HourlyCost * elapsedTime.Hours()
			}
		}


		if breakdown, exists := ret[resource.Provider]; exists {
			breakdown.DeltaMonthlyCost = breakdown.DeltaMonthlyCost + resource.DeltaMonthlyCost
			breakdown.HourlyCost = breakdown.HourlyCost + resource.HourlyCost
			breakdown.MonthlyCost = breakdown.MonthlyCost + resource.ProposedMonthlyCost
		} else {
			ret[resource.Provider] = ProviderCostBreakdown{
				MonthlyCost:      resource.ProposedMonthlyCost,
				DeltaMonthlyCost: resource.DeltaMonthlyCost,
				HourlyCost:       resource.HourlyCost,
				TotalCost:		  totalCost,
			}
		}

	}

	return
}

