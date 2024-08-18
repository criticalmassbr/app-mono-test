"use client";

import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import {ReactNode, FC} from 'react';

declare module '@mui/material/styles' {
    interface Palette {
        projectColor: Palette['primary'];
    }

    interface PaletteOptions {
        projectColor: PaletteOptions['primary'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        projectColor: true;
    }
}

const theme = createTheme({
    palette: {
        projectColor: {
            light: '#cbcbcb',
            main: '#b1b1b1',
            dark: '#989898'
        },
    },
})

interface AppThemeProviderProps {
    children: ReactNode;
}

const AppThemeProvider: FC<AppThemeProviderProps> = ({children}) => (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
)

export default AppThemeProvider;