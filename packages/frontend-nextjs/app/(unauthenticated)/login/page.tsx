export const dynamic = 'force-dynamic';

import { NextPage } from "next";
import { Suspense } from "react";
import LoginPageComponent from "./component";

const LoginPage: NextPage = () => {
    return <Suspense fallback={(<h1>{"Loading"}</h1>)}>
        <LoginPageComponent />
    </Suspense>
}

export default LoginPage;