import { NextRequest, NextResponse } from 'next/server';
import OwnPrismaClient from "@/src/lib/OwnPrismaClient";
import GetPost from '@/api_types/posts';
import { authenticatedUser } from "@/src/lib/user";
import RedisClient from '@/src/lib/redis';

const cacheKey = (userId: number) => {
    return `posts:all:${userId}:1`;
}

export async function GET(req: NextRequest) {
    const userData = await authenticatedUser();
    if (!userData) throw new Error("UserData not found");

    const { searchParams } = new URL(req.url);
    const param = searchParams.get('postId');
    if (!param) NextResponse.json({}, { status: 401, statusText: "PostID Must be provided" })

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


export async function POST(req: NextRequest) {
    const userData = await authenticatedUser();
    if (!userData) throw new Error("UserData not found");
    if (!userData?.profile) throw new Error("Profile not found");
    
    const body = await req.json();
    if (!body) throw new Error("Error in body");

    try {
        const post: GetPost = await OwnPrismaClient.post.create({
            data: {
                content: body.content,
                profileId: userData?.profile?.id,
                createdAt: new Date(),
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
            }
        });
        const k = cacheKey(userData.id);
        const cachedPosts = await RedisClient.get(k);
        if (!!cachedPosts) {
            const posts = JSON.parse(cachedPosts) as GetPost[];
            const temp = [ ...posts ];
            temp.unshift(post);
            await RedisClient.set(k, JSON.stringify(temp), {EX: 3600});
        }
        
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({}, { statusText: error instanceof Error ? error.message : 'Error creating post', status: 500 });
    }
};