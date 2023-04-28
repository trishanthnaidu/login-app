import axios from "axios";
import React from "react";
import styled from "styled-components";
import { AgGrid } from "./ag-grid";
import { StatCard } from "./stat-card";
import { Edit3, Plus } from "react-feather";
import { useGridData } from "./grid-data";
import { Box, Typography, TextField, Button } from "@mui/material";
import DropDown from "./dropdown";

const style = {
    display: "flex",

    "& .MuiTextField-root": {
        margin: "10px 2px",
    },
};

const users = [
    "@trnaidu",
    "@gyprakash",
    "@askumar",
    "@vimokashi",
    "@sapalai",
    "@munarveriya",
];
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

const Container = styled.div`
    padding: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;
const AddTaskSlab = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;
const baseURL = "http://localhost:9000/";
export const Home = function () {
    let rowData = useGridData({
        url: `${baseURL}getTableData?userName=${sessionStorage.getItem(
            "userName"
        )}`,
    });
    const [state, setState] = React.useState(rowData);
    const [open, setOpen] = React.useState(false);
    const [onEdit, setOnEdit] = React.useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { isEdit: false, rowData: [] }
    );
    const taskDescRef = React.useRef();
    const [creator, setCreator] = React.useState("");
    React.useEffect(
        function () {
            setState(rowData);
        },
        [rowData]
    );
    const addNewRow = async function () {
        setOpen(!open);
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
    const addNewRowData = function () {
        addRowData({
            taskDesc: taskDescRef.current.value || "",
            owner: sessionStorage.getItem("userName") || "",
            creator: creator || "",
        });
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

    return (
        <Container>
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
            <AddTaskSlab>
                <Typography
                    sx={{ color: "white" }}
                    variant="body1"
                    component="p"
                >
                    Create a Task
                </Typography>
                <Box sx={style}>
                    <TextField
                        variant="outlined"
                        inputRef={taskDescRef}
                        label="Task Description"
                    />

                    <TextField
                        disabled
                        label="Owner"
                        variant="outlined"
                        value={sessionStorage.getItem("userName")}
                    />
                    <DropDown
                        items={users}
                        label="Creator"
                        handler={setCreator}
                        value={creator}
                    />
                </Box>
                <ButtonContainer>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={addNewRowData}
                        startIcon={<Plus />}
                    >
                        Create a Task
                    </Button>
                </ButtonContainer>
            </AddTaskSlab>
            <GridSection>
                <AgGrid
                    tableData={state.tableData}
                    isError={state.isError}
                    onUpdate={onRowUpdate}
                    setIsEdit={setOnEdit}
                />
            </GridSection>
        </Container>
    );
};
