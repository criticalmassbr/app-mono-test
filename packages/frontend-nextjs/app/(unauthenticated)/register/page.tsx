export const dynamic = 'force-dynamic';

import { NextPage } from "next";
import { Suspense } from "react";
import RegisterPageComponent from "./component";

const RegisterPage: NextPage = () => {
    return <Suspense fallback={(<h1>{"Loading"}</h1>)}>
        <RegisterPageComponent />
    </Suspense>
}

export default RegisterPage;