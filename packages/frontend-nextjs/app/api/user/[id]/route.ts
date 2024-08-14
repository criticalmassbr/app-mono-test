import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import authenticate from '@/middlewares/auth';

const prisma = new PrismaClient();

export async function PATCH(req: Request, { params }: any) {
    const user = await authenticate(req);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = params;
    if (user.userId !== parseInt(id)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();
    const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data,
    });

    return NextResponse.json(updatedUser);
}