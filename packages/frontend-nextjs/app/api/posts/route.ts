import {NextRequest, NextResponse} from 'next/server';
import OwnPrismaClient from "@/src/lib/OwnPrismaClient";
import GetPost from '@/api_types/posts';
import {authenticatedUser} from "@/src/lib/user";
import RedisClient from "@/src/lib/redis";

const cacheKey = (userId: number, page: number = 1) => {
    return `posts:all:${userId}:${page}`;
}

export async function GET(req: NextRequest) {
    const userData = await authenticatedUser();
    if (!userData) throw new Error("UserData not found");

    const {searchParams} = new URL(req.url);
    const param = searchParams.get('page');
    const page = Boolean(param) ? Number(param) : 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const cachedPosts = await RedisClient.get(cacheKey(userData.id, page));

    if (cachedPosts) {
        return NextResponse.json(JSON.parse(cachedPosts));
    }

    let posts: GetPost[] = await OwnPrismaClient.post.findMany({
        skip: offset, take: pageSize,
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

    posts = posts.map(post => {
        post.liked = post.reactions.some(e => e.profile.userId == userData.id);
        return post;
    });
    await RedisClient.set(cacheKey(userData.id, page), JSON.stringify(posts), {EX: 3600});

    return NextResponse.json(posts, {status: 200});
}