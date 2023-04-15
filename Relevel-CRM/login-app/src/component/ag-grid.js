import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useGridData } from "./grid-data";

const GridContainer = styled.div`
    width: 74vw;
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
`;
const defaultColDef = {
    sortable: true,
};

const Grid = styled(AgGridReact)``;
export const AgGrid = function ({ tableData, isError }) {
    const cellRendererFn = function (params) {
        if (params.value === "content") {
            return <span contentEditable>{params.value}</span>;
        }
        return params.value;
    };
    const columnDefs = [
        {
            field: "email",
            cellRenderer: cellRendererFn,
        },
        {
            field: "user",
            cellRenderer: cellRendererFn,
        },
        {
            field: "userId",
            cellRenderer: cellRendererFn,
        },
        {
            field: "userStatus",
            cellRenderer: cellRendererFn,
        },
        {
            field: "userTypes",
            cellRenderer: cellRendererFn,
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
