"use server";

import Navigation from "@/src/components/navigation";
import JsonWebToken from "@/utils/jwt";
import { FC, PropsWithChildren, Suspense } from "react";

const fetchUser = async () => {
    const userData = await  JsonWebToken.userFromToken();
    return userData;
}
const Template: FC<PropsWithChildren> = async ({ children }) => {
    const userData = await fetchUser();
    
    return <Suspense fallback={(<h1>{"Loading"}</h1>)}>
        <Navigation { ...{ userData }} />
        {children}
    </Suspense>
}

export default Template;