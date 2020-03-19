package tint_data

import (
	"context"
	"github.com/hashicorp/go-tfe"
	"time"
)

func getRuns(client *tfe.Client, workspaces []*tfe.Workspace) ([]*Record, error) {
	runs := make([]*Record, 0)

	for _, workspace := range workspaces {
		workspaceRuns, err := getWorkspaceRuns(client, workspace)
		if err != nil { return nil, err }

		runs = append(runs, workspaceRuns...)
	}

	return runs, nil
}

func getWorkspaceRuns(client *tfe.Client, workspace *tfe.Workspace) ([]*Record, error) {
	runs := make([]*Record, 0)

	currentPage := 0
	totalPages := 1
	pageSize := 30

	var previousRun *Record

	for currentPage < totalPages {
		runPage, err := getRunPage(client, workspace.ID, tfe.RunListOptions{
			ListOptions: tfe.ListOptions{
				PageNumber: currentPage,
				PageSize:   pageSize,
			},
		})

		if err != nil { return nil, err }

		for _, run := range runPage.Items {
			if run.Status == "applied" && run.CostEstimate != nil {



				currentRun := &Record {
					OrganizationName:      workspace.Organization.Name,
					WorkspaceId:           workspace.ID,
					WorkspaceName:         workspace.Name,
					RunId:                 run.ID,
					CostEstimateId:        run.CostEstimate.ID,
					IsDestroy:			   run.IsDestroy,
					ProviderCostBreakdown: nil,
					StartTime:             run.StatusTimestamps.AppliedAt,
					EndTime:               time.Time{},
				}

				if previousRun != nil {
					currentRun.EndTime = previousRun.StartTime
				}

				// Destroy Runs are necessary for calculating Start/End times of Apply runs
				// However, they are not needed in the final dataset. Filter out destroy records.
				if !currentRun.IsDestroy {
					runs = append(runs, currentRun)
				}
				previousRun = currentRun
			}
		}

		totalPages = runPage.TotalPages
		currentPage++
	}

	return runs, nil
}

func getRunPage(client *tfe.Client, workspaceId string, options tfe.RunListOptions) (*tfe.RunList, error) {
	runs, err := client.Runs.List(context.Background(), workspaceId, options)
	if err != nil {
		return nil, err
	}

	return runs, nil
}
