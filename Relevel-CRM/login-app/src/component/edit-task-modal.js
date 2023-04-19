import React from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    Drawer,
} from "@mui/material";

import DropDown from "./dropdown";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",

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

const statusData = ["Backlog", "In Progress", "Complete", "Closed"];
const statusMap = { Backlog: 0, "In Progress": 1, Complete: 2, Closed: 3 };

export const EditTask = function ({
    isEdit,
    setIsEdit,
    updateRowData,
    rowData,
}) {
    const handleClose = function () {
        setIsEdit({ isEdit: !isEdit });
    };
    const taskDescRef = React.useRef();
    const loggedHoursRef = React.useRef();
    const [owner, setOwner] = React.useState(rowData.owner);
    const [status, setStatus] = React.useState(statusData[rowData.status]);

    const updateRow = function () {
        updateRowData({
            ...rowData,
            loggedHours: loggedHoursRef.current.value || "",
            taskDesc: taskDescRef.current.value || "",
            owner: owner || rowData.owner || "",
            status: statusMap[status],
            actions: status === 3 ? 4 : statusMap[status] + 1,
        });
    };

    return (
        <Modal
            open={isEdit}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{ color: "white" }} variant="h5" component="p">
                    Updating Task
                </Typography>
                <Drawer />
                <Typography
                    sx={{ color: "#D29FF5", margin: "20px 4px 10px" }}
                    variant="h6"
                    component="p"
                >
                    Task Id: <b>{rowData.taskId}</b>
                </Typography>
                <TextField
                    inputRef={taskDescRef}
                    label="Task Description"
                    variant="outlined"
                    defaultValue={rowData.taskDesc}
                />
                <DropDown
                    items={users}
                    label="Owner"
                    handler={setOwner}
                    value={rowData.owner}
                />
                <TextField
                    disabled
                    label="Creator"
                    variant="outlined"
                    defaultValue={rowData.creator}
                />
                <DropDown
                    items={statusData}
                    label="Status"
                    handler={setStatus}
                    value={statusData[rowData.status]}
                />
                <TextField
                    inputRef={loggedHoursRef}
                    label="Logged Hours"
                    variant="outlined"
                    defaultValue={rowData.loggedHours}
                />
                <Button
                    sx={{
                        margin: "30px 0 4px",
                        borderRadius: "30px",
                        padding: "12px",
                    }}
                    variant="contained"
                    size="large"
                    onClick={updateRow}
                    circle
                >
                    Update Task
                </Button>
            </Box>
        </Modal>
    );
};
