import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

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

export const AddUserModal = function ({ open, setOpen, addRowData }) {
    const handleClose = function () {
        setOpen(!open);
    };
    const emailRef = React.useRef();
    const userRef = React.useRef();
    const userIdRef = React.useRef();
    const userStatusRef = React.useRef();
    const userTypesRef = React.useRef();
    const addNewRowData = function () {
        debugger;
        addRowData({
            email: emailRef.current.value || "",
            user: userRef.current.value || "",
            userId: userIdRef.current.value || "",
            userStatus: userStatusRef.current.value || "",
            userTypes: userTypesRef.current.value || "",
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
                <Typography variant="body1" component="body">
                    New User
                </Typography>
                <TextField
                    inputRef={emailRef}
                    label="email"
                    variant="outlined"
                />
                <TextField inputRef={userRef} label="user" variant="outlined" />
                <TextField
                    inputRef={userIdRef}
                    label="userId"
                    variant="outlined"
                />
                <TextField
                    inputRef={userStatusRef}
                    label="userStatus"
                    variant="outlined"
                />
                <TextField
                    inputRef={userTypesRef}
                    label="userTypes"
                    variant="outlined"
                />
                <Button variant="contained" onClick={addNewRowData}>
                    Add User
                </Button>
            </Box>
        </Modal>
    );
};
