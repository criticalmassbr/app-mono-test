import {NextRequest, NextResponse} from 'next/server';
import {getReact, update} from "@/src/lib/reactions";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        if (!body) return NextResponse.json({}, {status: 400, statusText: 'Body bad formed'});

        const {profileId, postId} = body;
        if (!profileId || !postId) return NextResponse.json({}, {status: 400, statusText: 'Body bad formed'});

        const reactionExists = await getReact({profileId: Number(profileId), postId: Number(postId)});
        if (reactionExists) {
            const updated = await update({profileId, postId}, 'unlike');
            if (updated) return NextResponse.json({success: true}, {status: 200});
        }
        return NextResponse.json({}, {status: 400, statusText: 'Not liked yet'});
    } catch (error) {
        return NextResponse.json({}, {status: 500, statusText: error instanceof Error ? error.message : 'Error'});
    }
}