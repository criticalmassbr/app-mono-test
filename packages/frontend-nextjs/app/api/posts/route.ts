import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import authenticate from '@/middlewares/auth';
import GetPost from '@/api_types/posts';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const cookiesStore = cookies();
    const authToken = cookiesStore.get("auth_token")?.value ?? null;
    if (!authToken) {
        return NextResponse.redirect(`http://localhost:3000/auth/login`)
    }
    req.headers.set("Authorization", "Bearer "+authToken);
    const authCheck =  await authenticate(req);
    if (!authCheck) {
    }
    const posts: GetPost[] = await prisma.post.findMany({
        include: { profile: true, reactions: true },
    });

    return NextResponse.json(posts, { status: 200 });
}