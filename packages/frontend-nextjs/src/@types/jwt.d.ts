type UserDataFromToken = {
    id: number;
    email: string;
    profile: {
        id: number;
        bio: string | null;
        name: string;
        birthDate: Date | null;
        posts: {
            id: number;
            content: string;
            profileId: number;
        }[];
        reactions: {
            id: number;
            postId: number;
            profileId: number;
        }[];
    } | null;
} | null

export default UserDataFromToken;