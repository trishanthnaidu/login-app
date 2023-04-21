import React from "react";
import Chart from "chart.js/auto";
import { blue, cyan, green, purple, red, yellow } from "@mui/material/colors";
import { Doughnut } from "react-chartjs-2";
import DropDown from "../dropdown";
import { useState } from "react";
import styled from "styled-components";

const SelectOwners = styled.div`
    right: 20%;
    width: 200px;
    position: absolute;
    margin-right: 40px;
`;

const users = [
    "@trnaidu",
    "@gyprakash",
    "@askumar",
    "@vimokashi",
    "@sapalai",
    "@munarveriya",
];

const filterData = function (data = [], owner) {
    const rowData = data.tableData || [];

    return rowData
        .filter((row) => row.owner === owner)
        .map((row) => ({ labels: row.taskId, data: row.loggedHours }));
};

export const AreaChart = function ({ data }) {
    const [owner, setOwner] = useState(users[0]);
    const filteredData = filterData(data, owner) || [{ labels: [], data: [] }];
    return (
        <div>
            <SelectOwners>
                <DropDown
                    items={users}
                    label="Owners"
                    value={owner}
                    handler={setOwner}
                />
            </SelectOwners>
            <Doughnut
                datasetIdKey="id"
                data={{
                    labels: filteredData.map((items) => items.labels),
                    datasets: [
                        {
                            label: "Task owned by Owners",
                            data: filteredData.map((items) =>
                                Number(items.data.replace("h", ""))
                            ),
                            borderColor: [
                                red[400],
                                blue[400],
                                green[400],
                                yellow[400],
                                purple[400],
                                cyan[400],
                            ],
                            backgroundColor: [
                                `${red[400]}55`,
                                `${blue[400]}55`,
                                `${green[400]}55`,
                                `${yellow[400]}55`,
                                `${purple[400]}55`,
                                `${cyan[400]}55`,
                            ],
                        },
                    ],
                }}
            />
        </div>
    );
};
