import React from 'react'
import styled from "styled-components";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState} from "../../store";

type HeaderProps = {
};

type HeaderState = {
};

const Header = styled.div`
    display: flex;
    flex-direction: row;
    background: #007377; 
    color: #ffffff;
    width: 100%;
    min-height: 40px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 40px;
`;

class Index extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);
    }

    render() {
        return (
            <Header>
                Terraform Cost Visualization
            </Header>
        )
    }
}

const mapStateToProps = (state: ApplicationState) => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
});

const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default HeaderContainer