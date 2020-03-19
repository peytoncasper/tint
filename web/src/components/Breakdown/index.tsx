import React from 'react'
import styled from "styled-components";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState} from "../../store";
import {Doughnut} from "react-chartjs-2";

type BreakdownProps = {
    providerBreakdown: object
    workspaceBreakdown: object
    organizationBreakdown: object
};

type BreakdownState = {
};

const Panel = styled.div`
    display: flex;
    flex-direction: column;
`;

const Breakdown = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
    margin: 20px;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.25);

`;
const PanelHeader = styled.div`
    display: flex;
    font-weight: bold;  
    font-family: 'Roboto', sans-serif;
    background: #ffffff; 
    width: 100%;
`;

class Index extends React.Component<BreakdownProps, BreakdownState>{
    constructor(props: BreakdownProps){
        super(props);
    }

    formatProviderData(): object {
        return {
            labels: Object.keys(this.props.providerBreakdown),

            datasets: [{
                data: Object.values(this.props.providerBreakdown),
                backgroundColor: [
                    '#3b505c',
                    '#007377',
                    '#1b9362',
                    '#88a828',
                    '#ffa600'
                ],
                hoverBackgroundColor: [
                    '#3b505c',
                    '#007377',
                    '#1b9362',
                    '#88a828',
                    '#ffa600'
                ]
            }],
        };
    }

    formatWorkspaceData(): object {
        return {
            labels: Object.keys(this.props.workspaceBreakdown),
            datasets: [{
                data: Object.values(this.props.workspaceBreakdown),
                label: "Spend",
                backgroundColor: [
                    '#3b505c',
                    '#007377',
                    '#1b9362',
                    '#88a828',
                    '#ffa600'
                ],
                hoverBackgroundColor: [
                    '#3b505c',
                    '#007377',
                    '#1b9362',
                    '#88a828',
                    '#ffa600'
                ]
            }]
        };
    }

    formatOrganizationData(): object {
        return {
            labels: Object.keys(this.props.organizationBreakdown),

            datasets: [{
                data: Object.values(this.props.organizationBreakdown),
                backgroundColor: [
                    '#3b505c',
                    '#007377',
                    '#1b9362',
                    '#88a828',
                    '#ffa600'
                ],
                hoverBackgroundColor: [
                    '#3b505c',
                    '#007377',
                    '#1b9362',
                    '#88a828',
                    '#ffa600'
                ]
            }]
        };
    }

    render() {
        return (
            <Panel>
                <Breakdown>
                    <PanelHeader>Terraform Spend by Cloud Provider</PanelHeader>
                    <Doughnut options={{
                        title: {
                            display: true,
                            text: 'Cost Breakdown by Provider',
                            fontColor: '#ffffff'
                        },
                        legend: {
                            position: "left",
                            labels: {
                                fontSize: 15,
                                boxWidth: 15,
                                fontColor: '#000000'
                            }
                        }
                    }} data={this.formatProviderData()}/>
                </Breakdown>
                <Breakdown>
                    <PanelHeader>Terraform Spend by Workspace</PanelHeader>
                    <Doughnut options={{
                        title: {
                            display: true,
                            text: 'Cost Breakdown by Workspace',
                            fontColor: '#ffffff'
                        },
                        legend: {
                            position: "left",
                            labels: {
                                fontSize: 10,
                                boxWidth: 10,
                                fontColor: '#000000'
                            }
                        }
                    }} data={this.formatWorkspaceData()}/>
                </Breakdown>
                <Breakdown>
                    <PanelHeader>Terraform Spend by Organization</PanelHeader>
                    <Doughnut options={{
                        title: {
                            display: true,
                            text: 'Cost Breakdown by Organization',
                            fontColor: '#ffffff'
                        },
                        legend: {
                            position: "left",
                            labels: {
                                fontSize: 15,
                                boxWidth: 15,
                                fontColor: '#000000'
                            }
                        }
                    }} data={this.formatOrganizationData()}/>
                </Breakdown>
            </Panel>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    providerBreakdown: state.analysis.providerBreakdown,
    workspaceBreakdown: state.analysis.workspaceBreakdown,
    organizationBreakdown: state.analysis.organizationBreakdown
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
});

const BreakdownContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default BreakdownContainer