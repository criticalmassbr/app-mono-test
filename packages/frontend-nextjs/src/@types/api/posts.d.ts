type GetPost = ProfileInfo & PostInfoInGetPosts


type ProfileInfo = {
    profile: ProfileInGetPosts;
    reactions: ReactionInGetPost[];
}
type ProfileInGetPosts = {
    id: number;
    userId: number;
    bio: string | null;
    birthDate: Date | null;
}

type ReactionInGetPost = {
    id: number;
    postId: number;
    profileId: number;
}

type PostInfoInGetPosts = {
    id: number;
    content: string;
    profileId: number;
}

export default GetPost;