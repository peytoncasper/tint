import {ThunkAction} from "redux-thunk";
import {ApplicationState} from "../index";
import {Action} from "redux";
import axios, {AxiosResponse} from "axios";
import {
    AnalysisActionTypes, UPDATE_COST_TREND,
    UPDATE_ORGANIZATION_BREAKDOWN,
    UPDATE_PROVIDER_BREAKDOWN, UPDATE_RECORDS,
    UPDATE_WORKSPACE_BREAKDOWN
} from "./types";

export const getProviderBreakdown = (): ThunkAction<void, ApplicationState, null, Action<string>> => async dispatch => {
    axios.get(
        "/analysis/providerBreakdown"
    )
    .then((res: AxiosResponse<any>) => {
        dispatch({
            type: UPDATE_PROVIDER_BREAKDOWN,
            providerBreakdown: res.data
        })
    })
    .catch((res: AxiosResponse<any>) => {
    })
};

export const getWorkspaceBreakdown = (): ThunkAction<void, ApplicationState, null, Action<string>> => async dispatch => {
    axios.get(
        "/analysis/workspaceBreakdown"
    )
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: UPDATE_WORKSPACE_BREAKDOWN,
                workspaceBreakdown: res.data
            })
        })
        .catch((res: AxiosResponse<any>) => {
        })
};

export const getOrganizationBreakdown = (): ThunkAction<void, ApplicationState, null, Action<string>> => async dispatch => {
    axios.get(
        "/analysis/organizationBreakdown"
    )
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: UPDATE_ORGANIZATION_BREAKDOWN,
                organizationBreakdown: res.data
            })
        })
        .catch((res: AxiosResponse<any>) => {
        })
};

export const getCostTrend = (): ThunkAction<void, ApplicationState, null, Action<string>> => async dispatch => {
    axios.get(
        "/analysis/costTrend"
    )
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: UPDATE_COST_TREND,
                costTrend: res.data
            })
        })
        .catch((res: AxiosResponse<any>) => {
        })
};

export const getRecords = (): ThunkAction<void, ApplicationState, null, Action<string>> => async dispatch => {
    axios.get(
        "/analysis"
    )
        .then((res: AxiosResponse<any>) => {
            dispatch({
                type: UPDATE_RECORDS,
                records: res.data
            })
        })
        .catch((res: AxiosResponse<any>) => {
        })
};