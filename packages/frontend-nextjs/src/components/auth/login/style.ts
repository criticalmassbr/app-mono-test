import { Box, Button, Container, styled, TextField, Typography } from "@mui/material";

export const LoginContainer = styled(Container)({
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
});

export const LoginCard = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginY: "auto",
    border: "1px solid #cecece80",
    padding: 20,
    borderRadius: 10
});

export const LoginField = styled(TextField)({
    marginTop: "10px !important"
});

export const LoginButton = styled(Button)({
    mt: 15,
    textTransform: "capitalize",
});

export const LoginChangeMode = styled(Typography)(({ theme }) => ({
   marginTop: 15,
   fontSize: 12,
   textAlign: "center",
   color: theme.palette.primary.dark,
   cursor: "pointer",
}));

export const LoginError = styled(LoginChangeMode)(({ theme }) => ({
    color: theme.palette.error.main,
 }))