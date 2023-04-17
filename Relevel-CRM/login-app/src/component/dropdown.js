import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props) {
    const handleChange = (event) => {
        props.handler(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120, margin: "10px 2px" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    {props.label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={props.value}
                    label="Age"
                    onChange={handleChange}
                >
                    {props.items.map((item) => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
