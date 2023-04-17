import React from "react";
import axios from "axios";
import { AgGrid } from "../ag-grid";
import styled from "styled-components";
import { Button } from "@mui/material";
import { StatCard } from "../stat-card";
import { useGridData } from "../grid-data";
import { AddUserModal } from "../add-user-modal";
import { Edit3, Plus } from "react-feather";

const StatContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const GridSection = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    width: 82%;
    display: flex;
    margin-top: 20px;
    justify-content: flex-start;
`;

export const OneView = function () {
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
            statData: resp.data.statData,
            isError: resp.data.isError,
        });
    };
    const onRowUpdate = async function (data) {
        debugger;
        let resp = await axios({
            method: "post",
            url: "http://localhost:9000/updateDataToTable",
            data,
        });
        debugger;
        setState({
            tableData: resp.data.tableData,
            statData: resp.data.statData,
            isError: resp.data.isError,
        });
    };
    return (
        <React.Fragment>
            <StatContainer>
                <StatCard
                    type="Backlog"
                    icon={<Edit3 />}
                    value={state?.statData?.backlog}
                    theme="3"
                />
                <StatCard
                    type="In Progress"
                    icon={<Edit3 />}
                    value={state?.statData?.inProgress}
                    theme="2"
                />
                <StatCard
                    type="Complete"
                    icon={<Edit3 />}
                    value={state?.statData?.complete}
                    theme="4"
                />
                <StatCard
                    type="Closed"
                    icon={<Edit3 />}
                    value={state?.statData?.closed}
                    theme="1"
                />
            </StatContainer>

            <GridSection>
                <AgGrid
                    tableData={state.tableData}
                    isError={state.isError}
                    onUpdate={onRowUpdate}
                />
                <ButtonContainer>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={addNewRow}
                        startIcon={<Plus />}
                    >
                        Create a Task
                    </Button>
                </ButtonContainer>
            </GridSection>
            <AddUserModal
                open={open}
                setOpen={setOpen}
                addRowData={addRowData}
            />
        </React.Fragment>
    );
};
