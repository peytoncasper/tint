package tint_data

import (
	"context"
	"github.com/hashicorp/go-tfe"
)

func getWorkspaces(client *tfe.Client, organizations []*tfe.Organization) ([]*tfe.Workspace, error) {
	workspaces := make([]*tfe.Workspace, 0)

	for _, org := range organizations {
		orgWorkspaces, err := getOrganizationWorkspaces(client, org)
		if err != nil { return nil, err }

		workspaces = append(workspaces, orgWorkspaces...)
	}

	return workspaces, nil
}

func getOrganizationWorkspaces(client *tfe.Client, organization *tfe.Organization) ([]*tfe.Workspace, error) {
	workspaces := make([]*tfe.Workspace, 0)

	currentPage := 0
	totalPages := 1
	pageSize := 10

	for currentPage < totalPages {
		workspacePage, err := getWorkspacePage(client, organization.Name, tfe.WorkspaceListOptions{
			ListOptions: tfe.ListOptions{
				PageNumber: currentPage,
				PageSize:   pageSize,
			},
		})

		if err != nil { return nil, err }

		workspaces = append(workspaces, workspacePage.Items...)

		totalPages = workspacePage.TotalPages
		currentPage++
	}

	return workspaces, nil
}

func getWorkspacePage(client *tfe.Client, organizationName string, options tfe.WorkspaceListOptions) (*tfe.WorkspaceList, error) {
	workspaces, err := client.Workspaces.List(context.Background(), organizationName, options)
	if err != nil {
		return nil, err
	}

	return workspaces, nil
}
