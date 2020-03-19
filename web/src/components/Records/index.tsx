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
`;

const PanelHeader = styled.div`
    display: flex;
    
    background: #000000; 
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
                options: {
                    title: {
                        display: true,
                        text: 'Cost Breakdown by Provider'
                    }
                },
                fill: true,
                backgroundColor: "#7f78d2",
                borderColor: "#481380"
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
                <PanelHeader>d</PanelHeader>
                    <Line options={{
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
                                fontColor: '#ffffff'
                            }
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

const RecordsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default RecordsContainer