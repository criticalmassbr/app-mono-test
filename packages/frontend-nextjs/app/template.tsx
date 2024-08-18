import AppThemeProvider from "@/src/contexts/theme";
import { FC, PropsWithChildren } from "react";

const Template: FC<PropsWithChildren> = ({ children }) => {
   
    return (<AppThemeProvider>
        {children}
    </AppThemeProvider>)
}

export default Template;