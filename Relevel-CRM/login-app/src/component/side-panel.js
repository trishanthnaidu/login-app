import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { TextFields, Dashboard } from "@mui/icons-material";
import MuiDrawer from "@mui/material/Drawer";
import {
    List,
    IconButton,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Divider,
    ListItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer)(() => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",

    "& .MuiDrawer-paper": {
        marginTop: "40px",
        backgroundColor: "#08050b",
    },

    "& .MuiSvgIcon-root": {
        color: "#ff7272",
    },
}));

export const SidePanel = function () {
    const nav = useNavigate();

    return (
        <Drawer variant="permanent">
            <List>
                {["Inbox", "Starred"].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: "center",
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: "auto",
                                    justifyContent: "center",
                                }}
                            >
                                {index % 2 === 0 ? (
                                    <Dashboard
                                        onClick={() => nav("/admin/one-view")}
                                    />
                                ) : (
                                    <TextFields
                                        onClick={() =>
                                            nav("/admin/hello-world")
                                        }
                                    />
                                )}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
