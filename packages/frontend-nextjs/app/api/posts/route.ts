import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import authenticate from '@/middlewares/auth';
import GetPost from '@/api_types/posts';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const posts: GetPost[] = await prisma.post.findMany({
        include: { profile: true, reactions: true },
    });

    return NextResponse.json(posts);
}