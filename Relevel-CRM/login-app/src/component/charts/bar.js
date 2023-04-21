import Chart from "chart.js/auto";
import { red } from "@mui/material/colors";
import { Bar } from "react-chartjs-2";

const labels = [
    "@trnaidu",
    "@gyprakash",
    "@askumar",
    "@vimokashi",
    "@sapalai",
    "@munarveriya",
];

const transformData = function (data = []) {
    const rowData = data.tableData || [];
    const map = new Map([]);

    // adding total task numbers in each owners name - Map
    rowData.forEach((row) => {
        if (map.has(row.owner)) {
            // owner is present
            map.set(row.owner, map.get(row.owner) + 1);
        } else {
            // owner is not present
            map.set(row.owner, 1);
        }
    });

    return labels.map((owner) => map.get(owner));
};

export const BarChart = function ({ data }) {
    return (
        <Bar
            datasetIdKey="id"
            data={{
                labels,
                datasets: [
                    {
                        label: "Task owned by Owners",
                        data: transformData(data),
                        borderColor: red[400],
                        backgroundColor: `${red[400]}55`,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderSkipped: false,
                        barThickness: 40,
                    },
                ],
            }}
        />
    );
};
