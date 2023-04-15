import React from "react";
import styled from "styled-components";
import { SidePanel } from "../side-panel";

const Container = styled.div`
    display: flex;
    padding: 20px;
    margin-left: 64px;
    flex-direction: column;
    width: calc(100vw - 104px);
`;

export const AdminContainer = function ({ childComponents }) {
    return (
        <Container>
            {childComponents}
            <SidePanel />
        </Container>
    );
};
