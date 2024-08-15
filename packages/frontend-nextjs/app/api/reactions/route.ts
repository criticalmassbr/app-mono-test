import { NextRequest, NextResponse } from 'next/server';
import OwnPrismaClient from "@/utils/OwnPrismaClient";

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

export async function POST(req: NextRequest) {
    let response = NextResponse.json({}, { status: 200 });
    try {
        const body = await req.json();
        if (!body) {
            response = NextResponse.json({}, { status: 400, statusText: "Body bad formed" });
        }
        const { profileId, postId, action } = body;
        if (!profileId || !postId || !action) {
            response = NextResponse.json({}, { status: 400, statusText: "Body bad formed" });
        }
        if (['like', 'unlike'].includes(action) == false) {
            response = NextResponse.json({}, { status: 400, statusText: "Reaction exist" });
        } else {
            if (action == "like") {
                const likeVerify = await isLiked({ profileId: Number(profileId), postId: Number(postId) });
                if (likeVerify) {
                    response = NextResponse.json({}, { status: 400, statusText: "Reaction exist" });
                }
            }
            if (action == "unlike") {
                const unlikeVerify = await isUnliked({ profileId: Number(profileId), postId: Number(postId) });
                if (unlikeVerify) {
                    response = NextResponse.json({}, { status: 400, statusText: "Reaction exist" });
                }
            }
            const tryingToSave = await OwnPrismaClient.reaction.create({
                data: {
                    profileId,
                    postId
                }
            });
            if (!tryingToSave?.id) {
                throw new Error("Prisma didn't update db");
            }
        }
    } catch (error) {
        response = NextResponse.json({}, { status: 500, statusText: error instanceof Error ? error.message : "Error" })
    } finally {
        response;
    }
}