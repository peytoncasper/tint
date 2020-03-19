export interface AnalysisState {
    providerBreakdown: object;
    workspaceBreakdown: object;
    organizationBreakdown: object;
    costTrend: object;
    records: Array<object>;
}

export const UPDATE_PROVIDER_BREAKDOWN = "analysis/update-provider-breakdown";
export const UPDATE_WORKSPACE_BREAKDOWN = "analysis/update-workspace-breakdown";
export const UPDATE_ORGANIZATION_BREAKDOWN = "analysis/update-organization-breakdown";
export const UPDATE_RECORDS = "analysis/update-records";
export const UPDATE_COST_TREND = "analysis/update-cost-trend";

interface UpdateProviderBreakdownAction {
    type: typeof UPDATE_PROVIDER_BREAKDOWN,
    providerBreakdown: object
}

interface UpdateWorkspaceBreakdownAction {
    type: typeof UPDATE_WORKSPACE_BREAKDOWN,
    workspaceBreakdown: object
}

interface UpdateOrganizationBreakdownAction {
    type: typeof UPDATE_ORGANIZATION_BREAKDOWN,
    organizationBreakdown: object
}

interface UpdateCostTrendAction {
    type: typeof UPDATE_COST_TREND,
    costTrend: Array<object>
}

interface UpdateRecordsAction {
    type: typeof UPDATE_RECORDS,
    records: Array<object>
}

export type AnalysisActionTypes = UpdateProviderBreakdownAction | UpdateWorkspaceBreakdownAction | UpdateOrganizationBreakdownAction | UpdateRecordsAction | UpdateCostTrendAction