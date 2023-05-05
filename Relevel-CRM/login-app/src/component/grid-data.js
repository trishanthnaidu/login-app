import React from "react";
import axios from "axios";

const tableData = [
    {
        taskDesc: "Farewell",
        owner: "@trnaidu",
        creator: "@trnaidu",
        status: 0,
        actions: 1,
        taskId: 1353,
        loggedHours: "24h",
    },
    {
        taskDesc: "Create visualisations for Admin Panel",
        owner: "@munarveriya",
        creator: "@trnaidu",
        status: 0,
        actions: 1,
        taskId: 1352,
        loggedHours: "14h",
    },
    {
        taskDesc: "Create API for Engg Panel",
        owner: "@sapalai",
        creator: "@askumar",
        status: 0,
        actions: 1,
        taskId: 1351,
        loggedHours: "10h",
    },
    {
        taskDesc: "Create Engg Panel",
        owner: "@askumar",
        creator: "@askumar",
        status: 0,
        actions: 1,
        taskId: 1350,
        loggedHours: "3h",
    },
    {
        taskDesc: "Learn CRM",
        owner: "@vimokashi",
        creator: "@askumar",
        status: 0,
        actions: 1,
        taskId: 1349,
        loggedHours: "6h",
    },
    {
        taskDesc: "Learn JavaScript",
        owner: "@trnaidu",
        creator: "@askumar",
        status: 0,
        actions: 1,
        taskId: 1348,
        loggedHours: "23h",
    },
    {
        taskDesc: "Learn Rootz JS",
        owner: "@trnaidu",
        creator: "@sapalai",
        status: 0,
        actions: 1,
        taskId: 1347,
        loggedHours: "17h",
    },
    {
        taskDesc: "Learn Redux Js",
        owner: "@gyprakash",
        creator: "@askumar",
        status: 0,
        actions: 1,
        taskId: 1346,
        loggedHours: "19h",
    },
    {
        taskDesc: "Learn React JS ",
        owner: "@vimokashi",
        creator: "@trnaidu",
        status: 0,
        actions: 1,
        taskId: 1345,
        loggedHours: "24h",
    },
    {
        taskDesc: "Learn HTML - Part 2",
        owner: "@trnaidu",
        creator: "@munarveriya",
        status: 0,
        actions: 1,
        taskId: 1344,
        loggedHours: "9h",
    },
    {
        taskDesc: "Learn CSS",
        owner: "@vimokashi",
        creator: "@gyprakash",
        status: 0,
        actions: 1,
        taskId: 1343,
        loggedHours: "12h",
    },
    {
        taskDesc: "Learn HTML",
        owner: "@gyprakash",
        creator: "@vimokashi",
        status: 0,
        actions: 1,
        taskId: 1342,
        loggedHours: "12h",
    },
    {
        taskId: 1341,
        taskDesc: "Create an Admin Panel",
        owner: "@trnaidu",
        creator: "@trnaidu",
        status: 0,
        loggedHours: "22h",
        actions: 1,
    },
]

export const useGridData = function ({
    url,
    method = "get",
    data = {},
    hasId = false,
}) {
    const [respData, setRespData] = React.useState([]);
    function getStats(isAdmin, userName = "@trnaidu") {
        if (isAdmin)
            return {
                backlog: tableData.filter((x) => x.status === 0).length,
                inProgress: tableData.filter((x) => x.status === 1).length,
                complete: tableData.filter((x) => x.status === 2).length,
                closed: tableData.filter((x) => x.status === 3).length,
            };
        else
            return {
                backlog: tableData.filter(
                    (x) => x.status === 0 && x.owner === userName
                ).length,
                inProgress: tableData.filter(
                    (x) => x.status === 1 && x.owner === userName
                ).length,
                complete: tableData.filter(
                    (x) => x.status === 2 && x.owner === userName
                ).length,
                closed: tableData.filter(
                    (x) => x.status === 3 && x.owner === userName
                ).length,
            };
    }
    React.useEffect(() => {
        const getData = async function (props) {
            // let resp = await axios({ method, url, data });
            // adding id to every row data for mui grid
            // hasId && resp.data.forEach((item, index) => (item.id = index));

            setRespData({
                tableData,
                statData: getStats(tableData),
                isError: false,
            });
        };

        getData();
    }, []);

    return respData;
};
