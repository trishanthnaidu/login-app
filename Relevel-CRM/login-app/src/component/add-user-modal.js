import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
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

export const AddUserModal = function ({ open, setOpen, addRowData }) {
    const handleClose = function () {
        setOpen(!open);
    };
    const taskDescRef = React.useRef();
    const [owner, setOwner] = React.useState("");
    const [creator, setCreator] = React.useState("");

    const addNewRowData = function () {
        addRowData({
            taskDesc: taskDescRef.current.value || "",
            owner: owner || "",
            creator: creator || "",
        });
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    sx={{ color: "white" }}
                    variant="body1"
                    component="p"
                >
                    Create a Task
                </Typography>
                <TextField
                    inputRef={taskDescRef}
                    label="Task Description"
                    variant="outlined"
                />

                <DropDown
                    items={users}
                    label="Owner"
                    handler={setOwner}
                    value={owner}
                />
                <DropDown
                    items={users}
                    label="Creator"
                    handler={setCreator}
                    value={creator}
                />

                <Button
                    variant="contained"
                    size="large"
                    onClick={addNewRowData}
                >
                    Add Task
                </Button>
            </Box>
        </Modal>
    );
};
