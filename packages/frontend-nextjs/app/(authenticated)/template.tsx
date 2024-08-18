import Navigation from "@/src/components/navigation";
import WritePost from "@/src/components/write";
import { authenticatedUser } from "@/src/lib/user";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren, Suspense } from "react";

const AuthTemplate: FC<PropsWithChildren> = async ({ children }) => {
    const userData = await authenticatedUser()
    if (!userData) {
        redirect("/login");
    }

    return <Suspense fallback={(<h1>{`Loading...`}</h1>)}>
        <Navigation { ...{ userData }} />
        {children}
        <WritePost />
    </Suspense>
}

export default AuthTemplate;