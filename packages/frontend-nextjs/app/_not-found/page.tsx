export const dynamic = 'force-dynamic';

import { NextPage } from "next";
import { Suspense } from "react";

const RegisterPage: NextPage = () => {
    return <Suspense fallback={(<h1>{"Loading"}</h1>)}>
        <h1>{"Not found"}</h1>
    </Suspense>
}

export default RegisterPage;