"use client";

import { Box, Menu, styled, Typography } from "@mui/material";

export const Logo = styled(Typography)(({ theme }) => ({
    mr: 2,
    display: 'flex',
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
}))

export const MenuAppBar = styled(Menu)(({ theme }) => ({
    [theme.breakpoints.down("sm")]: {
        display: "block"
    },
    display: "none"
}));

export const LogoBoxDesktop = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("lg")]: {
        display: "none"
    },
    display: "block"
}));

export const LogoBoxMobile = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("lg")]: {
        display: "block"
    },
    display: "none"
}));