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
let tableData = [
    {
        email: "trnaidu@gmail.com",
        user: "Trishanth Naidu",
        userId: "trnaidu",
        userStatus: "ACTIVE",
        userTypes: "EDUCATOR",
    },
    {
        email: "njain@gmail.com",
        user: "Naman Jain",
        userId: "njain",
        userStatus: "ACTIVE",
        userTypes: "STUDENT",
    },
    {
        email: "dgoyal@gmail.com",
        user: "Deepanshu Goyal",
        userId: "dgoyal",
        userStatus: "ACTIVE",
        userTypes: "STUDENT",
    },
    {
        email: "spalai@gmail.com",
        user: "Sandeep Palai",
        userId: "spalai",
        userStatus: "ACTIVE",
        userTypes: "STUDENT",
    },
    {
        email: "skhandekar@gmail.com",
        user: "Sagar Khandekar",
        userId: "skhandekar",
        userStatus: "ACTIVE",
        userTypes: "STUDENT",
    },
    {
        email: "asingh@gmail.com",
        user: "Abhimanyu singh",
        userId: "asingh",
        userStatus: "INACTIVE",
        userTypes: "STUDENT",
    },
    {
        email: "nkumari@gmail.com",
        user: "Nisha Kumari",
        userId: "nkumari",
        userStatus: "INACTIVE",
        userTypes: "STUDENT",
    },
];
app.use(express.json(), express.urlencoded(), cors());
app.get("/getTableData", (req, res) => {
    res.send({ tableData, isError: false });
});
app.post("/addDataToTable", (req, res) => {
    const newRow = req.body || {};

    tableData = [newRow, ...tableData];
    res.send({ tableData, isError: false });
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
