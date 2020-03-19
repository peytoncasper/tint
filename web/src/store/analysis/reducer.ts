import {
    AnalysisActionTypes,
    AnalysisState, UPDATE_COST_TREND,
    UPDATE_ORGANIZATION_BREAKDOWN,
    UPDATE_PROVIDER_BREAKDOWN, UPDATE_RECORDS,
    UPDATE_WORKSPACE_BREAKDOWN
} from "./types";

const initialState: AnalysisState = {
    providerBreakdown: {},
    workspaceBreakdown: {},
    organizationBreakdown: {},
    costTrend: {},
    records: []
};

export function analysisReducer(
    state = initialState,
    action: AnalysisActionTypes
): AnalysisState {
    switch (action.type) {
        case UPDATE_PROVIDER_BREAKDOWN:
            return {
                ...state,
                providerBreakdown: action.providerBreakdown
            };
        case UPDATE_WORKSPACE_BREAKDOWN:
            return {
                ...state,
                workspaceBreakdown: action.workspaceBreakdown
            };
        case UPDATE_ORGANIZATION_BREAKDOWN:
            return {
                ...state,
                organizationBreakdown: action.organizationBreakdown
            };
        case UPDATE_COST_TREND:
            return {
                ...state,
                costTrend: action.costTrend
            };
        case UPDATE_RECORDS:
            return {
                ...state,
                records: action.records
            };
        default:
            return state
    }
}