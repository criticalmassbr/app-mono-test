export const dynamic = 'force-dynamic';

import { Metadata, NextPage } from "next";
import FeedPageComponent from "./component";
import { authenticatedUser } from "@/src/lib/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Feed"
}

const FeedPage: NextPage = async () => {
    const user = await authenticatedUser();
    if (!user) {
        redirect("/login");
    }

    return <Suspense>
        <FeedPageComponent { ...{ user }} />
    </Suspense>
}

export default FeedPage; 