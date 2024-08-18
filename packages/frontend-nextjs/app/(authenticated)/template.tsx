import { FC, PropsWithChildren } from "react";

const AuthTemplate: FC<PropsWithChildren> = ({ children }) => {
    return <>
        {children}
    </>
}

export default AuthTemplate;