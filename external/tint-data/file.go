package tint_data

import (
	"encoding/csv"
	"encoding/json"
	"io"
	"log"
	"os"
	"time"
)

type Record struct {
	OrganizationName string `json:"organization_name"`
	WorkspaceId string `json:"workspace_id"`
	WorkspaceName string `json:"workspace_name"`
	RunId string `json:"run_id"`
	CostEstimateId string `json:"cost_estimate_id"`

	IsDestroy bool `json:"destroy"`

	ProviderCostBreakdown map[string]ProviderCostBreakdown `json:"provider_cost_breakdown"`

	StartTime time.Time `json:"start_time"`
	EndTime time.Time `json:"end_time"`
}

type ProviderCostBreakdown struct {
	MonthlyCost float64 `json:"monthly_cost"`
	DeltaMonthlyCost float64 `json:"delta_monthly_cost"`
	HourlyCost float64 `json:"hourly_cost"`

	TotalCost float64 `json:"total_cost"`
}

// Flatten the Record into a encoding/csv compatible row for saving to disk.
func (r *Record) ToRow() []string {
	// Convert the ProviderCostBreakdown into a JSON string
	costBreakdown, err := json.Marshal(r.ProviderCostBreakdown)

	if err != nil {
		return []string{}
	}

	return []string {
		r.OrganizationName,
		r.WorkspaceId,
		r.WorkspaceName,
		r.RunId,
		r.CostEstimateId,
		string(costBreakdown),
		r.StartTime.String(),
		r.EndTime.String(),
	}
}

func Load() (data []*Record, err error) {
	data = make([]*Record, 0)

	file, err := os.Open("data/records.csv")

	if err != nil {
		return nil, err
	}

	defer file.Close()

	reader := csv.NewReader(file)

	for {
		row, err := reader.Read()
		if err != nil {
			if err == io.EOF {
				return data, nil
			}
			return nil, err
		}

		var costBreakdown map[string]ProviderCostBreakdown
		err = json.Unmarshal([]byte(row[5]), &costBreakdown)

		if err != nil {
			log.Print("Error costBreakdown: ", row)
			return nil, err
		}

		startTime, err := time.Parse("2006-01-02 15:04:05.999999999 -0700 MST", row[6])

		if err != nil {
			log.Print("Error start time: ", row)
			return nil, err
		}

		endTime, err := time.Parse("2006-01-02 15:04:05.999999999 -0700 MST", row[7])

		if err != nil {
			log.Print("Error end time: ", row)
			return nil, err
		}

		data = append(data, &Record{
			OrganizationName:      row[0],
			WorkspaceId:           row[1],
			WorkspaceName:         row[2],
			RunId:                 row[3],
			CostEstimateId:        row[4],
			ProviderCostBreakdown: costBreakdown,
			StartTime:             startTime,
			EndTime:               endTime,
		})
	}
}

func Save(data []*Record) error {
	file, _ := os.Create("data/records.csv")

	writer := csv.NewWriter(file)

	for _, value := range data {
		writer.Write(value.ToRow())
	}

	writer.Flush()
	file.Close()

	return nil
}