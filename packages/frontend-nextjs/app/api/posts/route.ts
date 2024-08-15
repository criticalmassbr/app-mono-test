import { NextRequest, NextResponse } from 'next/server';
import OwnPrismaClient from "@/utils/OwnPrismaClient";
import GetPost from '@/api_types/posts';
import * as jose from 'jose'

const secretKey = process.env.JWT_SECRET_KEY || 'dialog';

const jwtConfig = {
    secret: new TextEncoder().encode(secretKey),
}

const userId = async (req: NextRequest) => {
    let token = req.cookies.get("auth_token")?.value ?? undefined;
    if (token != undefined) {
        try {
            const decoded = await jose.jwtVerify(token, jwtConfig.secret)
            if (decoded.payload?.userId) {
                return String(decoded.payload?.userId);
            } else {
                return null
            }
        } catch (err) {
            console.error('isAuthenticated error: ', err)
            return null
        }
    } else {
        return null
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const parm = searchParams.get('page');
    const page = Boolean(parm) ? Number(parm) : 1;
    const pageSize = 10;
    const offset = (page - 1) * pageSize;

    const posts: GetPost[] = await OwnPrismaClient.post.findMany({
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
    const id = await userId(req);

    const arr = posts.map(post => {
        if (id) {
            const liked = post.reactions.map(e => e.profile.userId)?.includes(Number(id));
            post.liked = liked;
        } else {
            post.liked = false;
        }
        return post;
    })
    return NextResponse.json(arr, { status: 200 });
}