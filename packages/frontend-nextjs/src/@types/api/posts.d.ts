type GetPost = {
    id: number
    content: string
    profileId: number
    liked?: boolean
} & {
    profile: {
        name: string;
        userId: number;
        bio: string | null;
        birthDate: Date | null;
        user: {
            email: string;
        };
    };
    reactions: {
        profile: {
            name: string;
            userId: number;
            bio: string | null;
        };
    }[];
}


export default GetPost;