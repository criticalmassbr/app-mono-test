import {NextRequest, NextResponse} from 'next/server';
import OwnPrismaClient from "@/src/lib/OwnPrismaClient";
import GetPost from '@/api_types/posts';
import {authenticatedUser} from "@/src/lib/user";

export async function GET(req: NextRequest) {
    const userData = await authenticatedUser();
    if (!userData) throw new Error("UserData not found");

    const { searchParams } = new URL(req.url);
    const param = searchParams.get('postId');
    if (!param)  NextResponse.json({}, { status: 401, statusText: "PostID Must be provided" })

    const postId = Number(param);

    const post: GetPost | null = await OwnPrismaClient.post.findUnique({
        where: {
            id: postId
        },
        include: {
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
        },
    });
    if (!post) return NextResponse.json({}, { status: 404, statusText: "Post not found" })
    post.liked = post.reactions.some(e => e.profile.userId == userData.id);
    return NextResponse.json(post, { status: 200 });
}