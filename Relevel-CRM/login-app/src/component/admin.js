import React from "react";
import { Edit, Edit2, Edit3 } from "react-feather";
import styled from "styled-components";
import { StatCard } from "./stat-card";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
`;

export const AdminPanel = function () {
    return (
        <Container>
            <StatCard type="Open" icon={<Edit3 />} value="8" theme="1" />
            <StatCard type="Open" icon={<Edit3 />} value="8" theme="2" />
            <StatCard type="Open" icon={<Edit3 />} value="8" theme="3" />
            <StatCard type="Open" icon={<Edit3 />} value="8" theme="4" />
        </Container>
    );
};
