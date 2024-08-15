"use client";

import { Avatar, Box, Button, Card, CardContent, styled, Typography } from "@mui/material";

export const PostCard = styled(Card)(({ theme }) => ({
    margin: '20px 0',
    borderRadius: 15,
    border: 'solid 1px #cecece85'
}));

export const PostContent = styled(CardContent)(({ theme }) => ({

}));

export const PostText = styled(Typography)(({ theme }) => ({
    fontSize: 12
}));

export const PostProfileBox = styled(Button)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    textTransform: "capitalize",
    marginBottom: 10
}));

export const PostProfile = styled(Typography)(({ theme }) => ({
    fontSize: 12,
    fontWeight: 600
}));

export const PostProfileImg = styled(Avatar)(({ theme }) => ({
    width: "30px",
    height: "30px",
}));

export const PostReactionBox = styled(Box)(({ theme }) => ({
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
}));
