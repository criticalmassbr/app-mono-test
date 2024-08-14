import { Metadata, NextPage } from "next";
import FeedPageComponent from "./component";

export const metadata: Metadata = {
    title: "Feed"
}

const FeedPage: NextPage = async () => {
    return <FeedPageComponent />
}

export default FeedPage; 