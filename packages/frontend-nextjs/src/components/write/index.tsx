"use client"

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from "@mui/material";
import { FC, MouseEventHandler, useState } from "react";
import { ButtonWrite } from "./style";
import { Create } from "@mui/icons-material";
import { useMessage } from "@/src/contexts/message";

const WritePost: FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [content, setContent] = useState('');
    const { showMessage } = useMessage();
    const { palette } = useTheme();

    const handleSubmit: MouseEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!!content.length) {
            const body = { content };
            const response = await fetch(`${process.env.NEXT_PUBLIC_API ?? ''}/post`, { method: "POST", body: JSON.stringify(body) });
            if (response.ok) {
                showMessage("Posted", "success");
                setContent("");
            } else {
                showMessage(response.statusText ?? "Not mapped", "error");
            }
            onClose();
        }
    };

    const onClose = () => setDialogOpen(false);
    const onOpen = () => setDialogOpen(true);

    return <>
        <ButtonWrite onClick={onOpen}>
            <Create />
        </ButtonWrite>
        <Dialog maxWidth="lg" open={dialogOpen} PaperProps={{ sx: { width: "100% !important" } }} onClose={onClose}>
            <Box onSubmit={handleSubmit} component={"form"} width={"100%"}>
                <DialogTitle>{`Create a post`}</DialogTitle>
                <DialogContent>
                    <TextField multiline autoFocus margin="dense" variant="filled" id="content" label="Your thinkings" type="text" fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ textTransform: "capitalize"}} color="error" onClick={onClose} type="button">{`Cancel`}</Button>
                    <Button sx={{ textTransform: "capitalize", color: "#000012" }} type="submit">{`Publish`}</Button>
                </DialogActions>
            </Box>
        </Dialog>
    </>
}

export default WritePost;