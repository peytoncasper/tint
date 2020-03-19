import React from 'react'
import styled from "styled-components";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState} from "../../store";
import {Doughnut, Line} from "react-chartjs-2";

type BreakdownProps = {
    costTrend: object
};

type BreakdownState = {
};

const Panel = styled.div`
    display: flex;
    flex: 1
    flex-direction: column;
    background: #ffffff; 
    width: 100%;
    border-radius: 10px;
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
        console.log(this.props.costTrend)



        return {
            labels: Object.keys(this.props.costTrend),

            datasets: [{
                data: Object.values(this.props.costTrend),
                // fill: true,
                label: "Spend",
                backgroundColor: "#1eb2a6",
                borderColor: "#1eb2a6"
                // backgroundColor: "#7f78d2",
                // backgroundColor: [
                //     '#3b505c',
                //     '#007377',
                //     '#1b9362',
                //     '#88a828',
                //     '#ffa600'
                // ],
                // hoverBackgroundColor: [
                //     '#3b505c',
                //     '#007377',
                //     '#1b9362',
                //     '#88a828',
                //     '#ffa600'
                // ]
            }]
        };
    }

    render() {
        return (
            <Panel>
                <PanelHeader>Total Terraform Spend</PanelHeader>
                    <Line options={{
                        legend: {
                            position: "left",
                            labels: {
                                fontSize: 15,
                                boxWidth: 15,
                                fontColor: '#000000'
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    // Include a dollar sign in the ticks
                                    callback: function(value: number, index: number, values: Array<number>) {
                                        return '$' + value;
                                    }
                                }
                            }]
                        }
                    }} data={this.formatProviderData()}/>
                {/*</Breakdown>*/}
            </Panel>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    costTrend: state.analysis.costTrend,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
});

const CostTrendContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default CostTrendContainer