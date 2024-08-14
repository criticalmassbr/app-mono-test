import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import GetPost from '@/api_types/posts';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const posts: GetPost[] = await prisma.post.findMany({
        include: { profile: true, reactions: true },
    });

    return NextResponse.json(posts, { status: 200 });
}