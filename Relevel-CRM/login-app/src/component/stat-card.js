import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const themeContext = {
    1: "#673ab7",
    2: "#00bcd4",
    3: "#e91e63",
    4: "#4caf50",
};

const Container = styled.div`
    width: 300px;
    margin: 20px;
    height: 140px;
    display: flex;
    padding: 5px 10px;
    border-radius: 6px;
    flex-direction: column;
    background-color: ${(props) => themeContext[props.theme]}22;
    border: solid 1px ${(props) => themeContext[props.theme]}33;
`;

const TypeContainer = styled.div`
    height: 35%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${(props) => themeContext[props.theme]}22;
`;

const ValueContainer = styled(TypeContainer)`
    height: 65%;
`;

const CircularProgressContainer = styled.div`
    width: 30px;
    height: 30px;
    margin: 10px;
    position: relative;
`;

const ProgressBarWrapper = styled.span`
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
    position: relative;
    border: 3px solid #ffffffaa;
    border-top-color: ${(props) => themeContext[props.theme]};
`;

const BarEndOne = styled.span`
    left: 2px;
    top: 1.5px;
    width: 3px;
    height: 3px;
    display: block;
    background: ${(props) => themeContext[props.theme]};
    position: absolute;
    border-radius: 50%;
`;

const BarEndTwo = styled(BarEndOne)`
    top: 2px;
    left: auto;
    right: 1.5px;
`;

const Value = styled.span`
    margin: 10px;
    font-size: 35px;
    color: ${(props) => themeContext[props.theme]};
`;

const Icon = styled(Value)`
    margin: 8px;

    & svg {
        color: ${(props) => themeContext[props.theme]};
    }
`;

const Type = styled(Icon)`
    color: #eee;
    font-size: 20px;
`;

export const StatCard = function (props) {
    return (
        <Container theme={props.theme}>
            <TypeContainer>
                <Icon theme={props.theme}>{props.icon}</Icon>
                <Type>{props.type}</Type>
            </TypeContainer>
            <Divider theme={props.theme} />
            <ValueContainer>
                <Value theme={props.theme}>{props.value}</Value>
                <CircularProgressContainer>
                    <ProgressBarWrapper theme={props.theme}>
                        <BarEndOne theme={props.theme} />
                        <BarEndTwo />
                    </ProgressBarWrapper>
                </CircularProgressContainer>
            </ValueContainer>
        </Container>
    );
};

StatCard.propTypes = {
    theme: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
};
