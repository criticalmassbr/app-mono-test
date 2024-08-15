"use client";

import { createContext, useContext, useState, ReactNode, FC, PropsWithChildren } from 'react';
import { Snackbar, Alert, Slide, SlideProps, useTheme, Palette } from '@mui/material';
function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

type ColorsPalette = "error" | "info" | 'success' | "primary" | "warning"

type MessageContextType = {
    showMessage: (message: string, color?: ColorsPalette) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (context === undefined) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};

export const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('');
    const { palette } = useTheme();

    const showMessage = (message: string, color?: ColorsPalette) => {
        const colorPalette = color ?? "success";
        setMessage(message);
        setColor((palette as any)[colorPalette as any].main);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleClose}
                    severity={color as 'success' | 'info' | 'warning' | 'error'}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </MessageContext.Provider>
    );
};