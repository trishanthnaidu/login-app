import { Route } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Edit, Edit2, Edit3 } from "react-feather";
import { BrowserRouter, Routes } from "react-router-dom";
import styled from "styled-components";
import { AddUserModal } from "./add-user-modal";
import { AgGrid } from "./ag-grid";
import { useGridData } from "./grid-data";
import { SidePanel } from "./side-panel";
import { StatCard } from "./stat-card";

const Container = styled.div`
    display: flex;
    padding: 20px;
    margin-left: 64px;
    flex-direction: column;
    width: calc(100vw - 104px);
`;
const StatContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const GridSection = styled.div`
    margin: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    width: 82%;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
export const AdminPanel = function () {
    let rowData = useGridData({
        url: "http://localhost:9000/getTableData",
    });
    const [state, setState] = React.useState(rowData);
    const [open, setOpen] = React.useState(false);
    React.useEffect(
        function () {
            setState(rowData);
        },
        [rowData]
    );
    const addNewRow = async function () {
        setOpen(!open);
    };
    const addRowData = async function (data) {
        let resp = await axios({
            method: "post",
            url: "http://localhost:9000/addDataToTable",
            data,
        });
        setState({
            tableData: resp.data.tableData,
            isError: resp.data.isError,
        });
    };
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/one-view" component={} />
                </Routes>
            </BrowserRouter>
            <Container>
                <StatContainer>
                    <StatCard
                        type="Open"
                        icon={<Edit3 />}
                        value="8"
                        theme="1"
                    />
                    <StatCard
                        type="Open"
                        icon={<Edit3 />}
                        value="8"
                        theme="2"
                    />
                    <StatCard
                        type="Open"
                        icon={<Edit3 />}
                        value="8"
                        theme="3"
                    />
                    <StatCard
                        type="Open"
                        icon={<Edit3 />}
                        value="8"
                        theme="4"
                    />
                </StatContainer>

                <GridSection>
                    <ButtonContainer>
                        <Button variant="contained" onClick={addNewRow}>
                            Add Row
                        </Button>
                    </ButtonContainer>
                    <AgGrid
                        tableData={state.tableData}
                        isError={state.isError}
                    />
                </GridSection>
                <AddUserModal
                    open={open}
                    setOpen={setOpen}
                    addRowData={addRowData}
                />
            </Container>

            <SidePanel />
        </div>
    );
};
