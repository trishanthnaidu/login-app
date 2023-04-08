import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import styled from "styled-components";
import { useGridData } from "./grid-data";

const GridContainer = styled.div`
    width: 50vw;
    height: 300px;
    min-width: 600px;
`;
const defaultColDef = {
    sortable: true,
};
export const AgGrid = function () {
    const rowData = useGridData({
        url: "https://www.ag-grid.com/example-assets/row-data.json",
    });
    const columnDefs = [
        { field: "make" },
        { field: "model" },
        { field: "price" },
    ];
    return (
        <GridContainer className="ag-theme-alpine">
            <AgGridReact
                defaultColDef={defaultColDef}
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </GridContainer>
    );
};
