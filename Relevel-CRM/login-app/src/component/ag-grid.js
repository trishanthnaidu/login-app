import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useGridData } from "./grid-data";
import { Button, IconButton } from "@mui/material";
import { Download, Edit, Edit2, Edit3, X } from "react-feather";
import { read } from "xlsx";

const GridContainer = styled.div`
    width: 91vw;
    height: 300px;
    min-width: 600px;

    & .ag-header {
        color: #fff;
        background-color: #1d1724;
        border-bottom: solid 1px #cca1da;
    }
    & .ag-cell {
        color: #9d88b6;
        background-color: #1d1724;
    }
    & .ag-row {
        color: #9d88b6;
        border-bottom: solid 1px #493650;
    }
    & .ag-header-cell {
        color: #fddbff;
    }
    & .ag-root-wrapper {
        border: 1px solid #493650;
    }
    & .ag-center-cols-viewport {
        background-color: #1d1724;
    }
`;
const defaultColDef = {
    sortable: true,
};
const statusMap = {
    0: "Backlog",
    1: "In Progress",
    2: "Complete",
    3: "Closed",
    4: "Closed",
};
const Grid = styled(AgGridReact)``;
export const AgGrid = function ({
    tableData,
    exportAsCSV,
    onUpdate,
    setIsEdit,
    importAsCSV,
}) {
    const gridRef = React.useRef();
    const cellRendererFn = function (params) {
        if (params.value === "content") {
            return <span>{params.value}</span>;
        }
        return params.value;
    };
    const cellStatusRendererFn = function (params) {
        let color = "#4caf50";
        switch (params.value) {
            case 0: {
                color = "#e91e63";
                break;
            }
            case 1: {
                color = "#00bcd4";
                break;
            }
            case 2: {
                color = "#4caf50";
                break;
            }
            case 3: {
                color = "#673ab7";
                break;
            }
            default: {
                color = "#e91e63";
            }
        }
        return (
            <span style={{ color, fontWeight: "bold" }}>
                {statusMap[params.value]}
            </span>
        );
    };
    const cellUserRendererFn = function (params) {
        return (
            <a style={{ color: "#d390ee" }} href="#">
                {params.value}
            </a>
        );
    };
    const onChangeStatus = function (params) {
        let row = params.node.data;
        row.status = params.node.data.actions;
        row.actions = Number(params.node.data.actions) + 1;

        onUpdate(row);
    };
    const onEdit = function (params) {
        setIsEdit({ isEdit: true, rowData: params.node.data });
    };
    const deleteRow = function (params) {
        let row = params.node.data;
        onUpdate({
            ...row,
            taskDesc: "",
            owner: "",
            creator: "",
            status: "4",
            loggedHours: "",
        });
    };
    useEffect(
        function () {
            if (exportAsCSV) {
                gridRef.current.api.exportDataAsCsv({
                    columnKeys: [
                        "taskId",
                        "taskDesc",
                        "owner",
                        "creator",
                        "status",
                        "loggedHours",
                    ],
                });
            }
        },
        [exportAsCSV]
    );
    useEffect(
        function () {
            if (importAsCSV) {
                const getCSVSheet = async function () {
                    const resp = await fetch(
                        "https://www.ag-grid.com/example-assets/olympic-data.xlsx"
                    );
                    const data = await resp.arrayBuffer();

                    // transformation of the raw data
                    /* convert data to binary string */
                    let transformedData = new Uint8Array(data);
                    let arr = [];

                    for (var i = 0; i !== transformedData.length; ++i) {
                        arr[i] = String.fromCharCode(transformedData[i]);
                    }
                    debugger;
                    let bstr = arr.join("");
                    let workbook = read(bstr, { type: "binary" });
                    let firstSheetName = workbook.SheetNames[0];
                    let worksheet = workbook.Sheets[firstSheetName];

                    // we expect the following columns to be present
                    let columns = {
                        A: "athlete",
                        B: "age",
                        C: "country",
                        D: "year",
                        E: "date",
                        F: "sport",
                        G: "gold",
                        H: "silver",
                        I: "bronze",
                        J: "total",
                    };

                    let rowData = [];

                    // start at the 2nd row - the first row are the headers
                    let rowIndex = 2;

                    // iterate over the worksheet pulling out the columns we're expecting
                    while (worksheet["A" + rowIndex]) {
                        let row = {};
                        Object.keys(columns).forEach(function (column) {
                            row[columns[column]] =
                                worksheet[column + rowIndex].w;
                        });

                        rowData.push(row);

                        rowIndex++;
                    }

                    //

                    setCsv(rowData);
                };

                getCSVSheet();
            }
        },
        [importAsCSV]
    );
    const [csv, setCsv] = useState([]);
    const cellActionRendererFn = function (params) {
        return (
            <span
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    size="small"
                    variant="outlined"
                    sx={{ margin: "0" }}
                    onClick={() => onChangeStatus(params)}
                    disabled={params.value == 4}
                >
                    {statusMap[params.value]}
                </Button>
                <span>
                    <IconButton
                        color="secondary"
                        sx={{ marginLeft: "4px" }}
                        size="small"
                        onClick={() => onEdit(params)}
                    >
                        <Edit2 />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        sx={{ marginLeft: "4px" }}
                        size="small"
                        onClick={() => deleteRow(params)}
                    >
                        <X />
                    </IconButton>
                </span>
            </span>
        );
    };
    const columnDefs = [
        {
            field: "taskId",
            cellRenderer: cellRendererFn,
        },
        {
            field: "taskDesc",
            cellRenderer: cellRendererFn,
        },
        {
            field: "owner",
            cellRenderer: cellUserRendererFn,
        },
        {
            field: "creator",
            cellRenderer: cellUserRendererFn,
        },
        {
            field: "status",
            cellRenderer: cellStatusRendererFn,
        },
        {
            field: "loggedHours",
            width: 160,
            cellRenderer: cellRendererFn,
        },
        {
            field: "actions",
            width: 260,
            cellRenderer: cellActionRendererFn,
        },
    ];
    if (!importAsCSV)
        return (
            <GridContainer className="ag-theme-alpine">
                <Grid
                    ref={gridRef}
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                />
            </GridContainer>
        );
    else {
        return (
            <GridContainer className="ag-theme-alpine">
                <Grid
                    ref={gridRef}
                    rowData={csv}
                    columnDefs={[
                        { field: "athlete", minWidth: 180 },
                        { field: "age" },
                        { field: "country", minWidth: 150 },
                        { field: "year" },
                        { field: "date", minWidth: 130 },
                        { field: "sport", minWidth: 100 },
                        { field: "gold" },
                        { field: "silver" },
                        { field: "bronze" },
                        { field: "total" },
                    ]}
                    defaultColDef={defaultColDef}
                />
            </GridContainer>
        );
    }
};
