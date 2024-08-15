import { NextRequest, NextResponse } from 'next/server';
import OwnPrismaClient from "@/utils/OwnPrismaClient";
import GetPost from '@/src/@types/api/posts';
import { authenticatedUser } from '@/src/lib/user';

type Validator = { profileId: number, postId: number };

const getReact = async ({ profileId, postId }: Validator) => await OwnPrismaClient.reaction.findUnique({
    where: {
        postId_profileId: {
            postId,
            profileId
        }
    },
    select: { id: true }
});

const isLiked = async (config: Validator) => {
    const existReact = await getReact(config)
    return existReact != null;
}

const isUnliked = async (config: Validator) => {
    const existReact = await getReact(config)
    return existReact == null;
}

const update = async ({ profileId, postId }: Validator, action: "like" | "unlike") => {
    const res = (action == "like") ? await OwnPrismaClient.reaction.create({
        data: {
            profileId,
            postId
        }, select: { id: true }
    }) :
        await OwnPrismaClient.reaction.delete({
            where: {
                postId_profileId: {
                    profileId: Number(profileId),
                    postId: Number(postId)
                }
            }, select: { id: true }
        });

    return !!res.id;
}

const getPostInfo = async (postId: string | number) => {
    const user = await authenticatedUser();
    if (!user) {
        return false;
    }
    const post: GetPost | null = await OwnPrismaClient.post.findUnique({
        where: {
            id: Number(postId)
        },
        select: {
            id: true,
            content: true,
            profileId: true,
            profile: {
                select: {
                    name: true,
                    bio: true,
                    birthDate: true,
                    userId: true,
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            }, reactions: {
                select: {
                    profile: {
                        select: {
                            name: true,
                            bio: true,
                            userId: true
                        }
                    }
                }
            }
        }
    });
    if (!!post) {
        post.liked = post.reactions.map(e => e.profile.userId)?.includes(user.id);
        return post;
    }
    return post;
}

export async function POST(req: NextRequest) {
    let response: NextResponse<any> = NextResponse.json({}, { status: 400, statusText: "Reaction exist" });
    try {
        const body = await req.json();
        if (!body) {
            response = NextResponse.json({}, { status: 400, statusText: "Body bad formed" });
        }
        const { profileId, postId, action } = body;
        if (!profileId || !postId || !action) {
            response = NextResponse.json({}, { status: 400, statusText: "Body bad formed" });
        } else {
            if (['like', 'unlike'].includes(action)) {
                if (String(action).toLowerCase() == "like".toLowerCase()) {
                    const likeVerify = await isLiked({ profileId: Number(profileId), postId: Number(postId) });
                    if (!likeVerify) {
                        const tup = await update({ profileId, postId }, "unlike");
                        if (tup) {
                            const newInfo = await getPostInfo(postId);
                            if (newInfo !== false) response = NextResponse.json(newInfo, { status: 200 })
                        }
                    }
                }
                if (String(action).toLowerCase() == "unlike".toLowerCase()) {
                    const unlikeVerify = await isUnliked({ profileId: Number(profileId), postId: Number(postId) });
                    if (!unlikeVerify) {
                        const tup = await update({ profileId, postId }, "unlike");
                        if (tup) {
                            const newInfo = await getPostInfo(postId);
                            if (newInfo !== false) response = NextResponse.json(newInfo, { status: 200 })
                        }
                    }
                }
            }
        }
    } catch (error) {
        response = NextResponse.json({}, { status: 500, statusText: error instanceof Error ? error.message : "Error" })
    } finally {
        return response;
    }
}