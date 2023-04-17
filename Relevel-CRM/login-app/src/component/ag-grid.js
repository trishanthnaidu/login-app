import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useGridData } from "./grid-data";
import { Button } from "@mui/material";

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
export const AgGrid = function ({ tableData, isError, onUpdate }) {
    const cellRendererFn = function (params) {
        if (params.value === "content") {
            return <span>{params.value}</span>;
        }
        return params.value;
    };
    const cellStatusRendererFn = function (params) {
        return <span>{statusMap[params.value]}</span>;
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

        onUpdate(row);
    };
    const cellActionRendererFn = function (params) {
        return (
            <Button
                size="small"
                variant="outlined"
                onClick={() => onChangeStatus(params)}
                disabled={params.value == 4}
            >
                {statusMap[params.value]}
            </Button>
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
            cellRenderer: cellRendererFn,
        },
        {
            field: "actions",
            cellRenderer: cellActionRendererFn,
        },
    ];
    return (
        <GridContainer className="ag-theme-alpine">
            <Grid
                rowData={tableData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </GridContainer>
    );
};
