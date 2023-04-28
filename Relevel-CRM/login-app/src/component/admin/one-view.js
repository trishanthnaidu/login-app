import React from "react";
import axios from "axios";
import { AgGrid } from "../ag-grid";
import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import { StatCard } from "../stat-card";
import { useGridData } from "../grid-data";
import { AddUserModal } from "../add-user-modal";
import { ChevronLeft, ChevronRight, Edit3, Plus } from "react-feather";
import { EditTask } from "../edit-task-modal";
import { useNavigate } from "react-router-dom";
import { BarChart } from "../charts/bar";
import { AreaChart } from "../charts/area";

const StatContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const GridSection = styled.div`
    margin: 20px;
    display: flex;
    flex-direction: column;
`;
const ChartSection = styled.div`
    margin: 20px;
    display: flex;
    justify-content: space-between;
`;
const BarSection = styled.div`
    width: 800px;
    height: 330px;
`;
const PieSection = styled.div`
    width: 330px;
`;
const ButtonContainer = styled.div`
    width: 82%;
    display: flex;
    margin-top: 20px;
    justify-content: flex-start;
`;

export const OneView = function () {
    let rowData = useGridData({
        url: `http://localhost:9000/getTableData?userName=${sessionStorage.getItem(
            "userName"
        )}`,
    });
    const [state, setState] = React.useState(rowData);
    const [open, setOpen] = React.useState(false);
    const [onEdit, setOnEdit] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { isEdit: false, rowData: [] }
    );
    React.useEffect(
        function () {
            debugger;
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
            data: { data, userName: sessionStorage.getItem("userName") },
        });
        setState({
            tableData: resp.data.tableData,
            statData: resp.data.statData,
            isError: resp.data.isError,
        });
    };
    const onRowUpdate = async function (data) {
        let resp = await axios({
            method: "post",
            url: "http://localhost:9000/updateDataToTable",
            data: { data, userName: sessionStorage.getItem("userName") },
        });
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
                    setIsEdit={setOnEdit}
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
            <ChartSection>
                <BarSection>
                    <BarChart data={rowData} />
                </BarSection>
                <PieSection>
                    <AreaChart data={rowData} />
                </PieSection>
            </ChartSection>
            <AddUserModal
                open={open}
                setOpen={setOpen}
                addRowData={addRowData}
            />
            <EditTask
                isEdit={onEdit.isEdit}
                setIsEdit={setOnEdit}
                rowData={onEdit.rowData}
                updateRowData={onRowUpdate}
            />
        </React.Fragment>
    );
};
