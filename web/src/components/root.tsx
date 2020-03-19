import React from 'react'
import { connect } from 'react-redux'

import {ApplicationState} from "../store";
import {ThunkDispatch} from "redux-thunk";
import styled from "styled-components";
import {
    getOrganizationBreakdown,
    getProviderBreakdown,
    getWorkspaceBreakdown,
    getRecords,
    getCostTrend
} from "../store/analysis/actions";

import { Doughnut } from 'react-chartjs-2';
import BreakdownContainer from "./Breakdown";
import HeaderContainer from "./Header";
import CostTrendContainer from "./CostTrendContainer";
import RecordsContainer from "./Records";

const Root = styled.div`
    height: 100vh;
    width: 100vw;
`;

const Body = styled.div`
    display: flex;
    width: 100vw;
    background: #ffffff;
    flex-direction: row;
`;

type RootProps = {
    getProviderBreakdown: () => void
    getWorkspaceBreakdown: () => void
    getOrganizationBreakdown: () => void
    getCostTrend: () => void
    getRecords: () => void
};

type RootState = {
};

class RootComponent extends React.Component<RootProps, RootState>{

    constructor(props: RootProps){
        super(props);
    }

    componentDidMount(): void {
        this.props.getProviderBreakdown();
        this.props.getWorkspaceBreakdown();
        this.props.getOrganizationBreakdown();
        this.props.getCostTrend();
        this.props.getRecords();
    }

    render() {
        return (
            <Root>
                <HeaderContainer/>
                <Body>
                    {/*<RecordsContainer/>*/}
                    <CostTrendContainer/>
                    <BreakdownContainer/>
                </Body>
            </Root>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
    getProviderBreakdown: () => {
        dispatch(getProviderBreakdown());
    },
    getWorkspaceBreakdown: () => {
        dispatch(getWorkspaceBreakdown());
    },
    getOrganizationBreakdown: () => {
        dispatch(getOrganizationBreakdown());
    },
    getCostTrend: () => {
        dispatch(getCostTrend());
    },
    getRecords: () => {
        dispatch(getRecords());
    }
});

const RootContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RootComponent);

export default RootContainer