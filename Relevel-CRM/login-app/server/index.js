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

app.use(express.json(), express.urlencoded(), cors());

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
