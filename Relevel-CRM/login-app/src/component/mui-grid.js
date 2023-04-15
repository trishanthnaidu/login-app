import React from "react";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { DataGrid } from "@mui/x-data-grid";
import { Tab, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import styled from "styled-components";
import { useGridData } from "./grid-data";

const GridContainer = styled.div`
    width: 100%;
    height: 500px;
    background-color: white;
`;

const columnDefs = [
    { field: "make1" },
    { field: "model1" },
    { field: "price1" },
];

export const MuiGrid = function () {
    const rowData = useGridData({
        hasId: true,
        url: "https://www.ag-grid.com/example-assets/row-data.json",
    });
    const transformedData = rowData.map((item) => {
        // boiler-plating and destructuring
        const { make: make1, model: model1, price: price1, id } = item;
        return { id, make1, model1, price1 };
    });
    return (
        <GridContainer>
            <DataGrid
                checkboxSelection
                rows={transformedData}
                columns={columnDefs}
            />
        </GridContainer>
    );
};

/**
 * 
 *  return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>empID</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>age</TableCell>
                        <TableCell>org</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData.map((row) => (
                        <TableRow
                            key={row.empID}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{row.empID}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.age}</TableCell>
                            <TableCell>{row.org}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
 */
