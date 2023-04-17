const express = require("express");
const cors = require("cors");
const app = express();
const port = 9000;
const dataSet = {
    trishanthnaidu: {
        isAdmin: true,
        password: "Pwd123",
        isLoggedIn: false,
    },
    testuser: {
        isAdmin: false,
        password: "Pwd456",
        isLoggedIn: false,
    },
};
let lastTaskIdCached = null;
let tableData = [
    {
        taskId: 1341,
        taskDesc: "Create an Admin Panel",
        owner: "@trnaidu",
        creator: "@trnaidu",
        status: 0,
        loggedHours: "2h",
        actions: 1,
    },
];
function getStats() {
    return {
        backlog: tableData.filter((x) => x.status === 0).length,
        inProgress: tableData.filter((x) => x.status === 1).length,
        complete: tableData.filter((x) => x.status === 2).length,
        closed: tableData.filter((x) => x.status === 3).length,
    };
}
app.use(express.json(), express.urlencoded(), cors());
app.get("/getTableData", (req, res) => {
    res.send({ tableData, isError: false, statData: getStats() });
});
app.post("/updateDataToTable", (req, res) => {
    const row = req.body || {};
    const tableDataUpdated = [...tableData];
    const rowToBeUpdated = tableDataUpdated.find(
        (x) => x.taskId === row?.taskId
    );

    rowToBeUpdated.taskId = row.taskId;
    rowToBeUpdated.taskDesc = row.taskDesc;
    rowToBeUpdated.owner = row.owner;
    rowToBeUpdated.creator = row.creator;
    rowToBeUpdated.status = row.status;
    rowToBeUpdated.loggedHours = row.loggedHours;
    rowToBeUpdated.actions = Number(row.actions) + 1;

    // immutability
    tableData = [...tableDataUpdated];

    res.send({ tableData, isError: false, statData: getStats() });
});
app.post("/addDataToTable", (req, res) => {
    const newRow = req.body || {};
    const newTaskId =
        lastTaskIdCached ||
        tableData.sort((a, b) => b.taskId - a.taskId)[0].taskId + 1;
    lastTaskIdCached = newTaskId + 1;
    newRow.status = 0;
    newRow.actions = 1;
    newRow.taskId = newTaskId;
    newRow.loggedHours = "0h";
    tableData = [newRow, ...tableData];

    res.send({ tableData, isError: false, statData: getStats() });
});
app.post("/authenticateUser", (req, res) => {
    const req_UserName = req.body.userName || "";
    const req_Password = req.body.password || "";

    if (dataSet.hasOwnProperty(req_UserName)) {
        // check for the user's password
        if (dataSet[req_UserName].password === req_Password) {
            dataSet[req_UserName].isLoggedIn = true;
            res.send({
                isAuthenticated: true,
                message: "Ok",
                isAdmin: dataSet[req_UserName].isAdmin,
            });
        } else
            res.send({
                isAdmin: false,
                isAuthenticated: false,
                message: "password is incorrect",
            });
    } else
        res.send({
            isAdmin: false,
            isAuthenticated: false,
            message: "the username does not exist",
        });
});
app.post("/registerUser", (req, res) => {
    const req_UserName = req.body.userName || "";
    const req_Password = req.body.password || "";

    // extending the dataset
    dataSet[req_UserName] = {
        password: req_Password,
    };
    console.log(dataSet);
    res.send({ isRegistered: true });
});
app.post("/checkUserExists", (req, res) => {
    const req_UserName = req.body.userName || "";

    if (dataSet.hasOwnProperty(req_UserName)) {
        res.send({ isExistingUser: true });
    } else res.send({ isExistingUser: false });
});
app.get("/checkSession", (req, res) => {
    const req_UserName = req.query.usrn || "";
    console.log("asdfasdfasdf", req_UserName);

    if (!!req_UserName && dataSet[req_UserName]?.isLoggedIn === true) {
        res.send({ isAuthenticated: true, message: "Ok" });
    } else {
        res.send({
            isAuthenticated: true,
            message: "Ok",
            redirectUrl: "/login",
        });
    }
});
app.listen(port, () => {
    console.log("app server is live on port:", port);
});
