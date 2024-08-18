import { Button, IconButton, styled } from "@mui/material";

export const ButtonWrite = styled(IconButton)(({ theme }) => ({
    position: "fixed",
    bottom: "5%",
    left: "75%",
    background: theme.palette.projectColor.dark,
    color: 'white',
    ": hover": {
        background: theme.palette.projectColor.main,
    color: 'white',
    }
}))