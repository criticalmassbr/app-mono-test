import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import JsonWebToken, { DecodedToken } from "@/utils/jwt";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest, { params }: any) {
    const user = await JsonWebToken.authenticate(req);
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

export async function GET(req: NextRequest, { params }: any) {
    const { userId } = await JsonWebToken.decodeJWT(req) as DecodedToken;
    const { id } = params;

    if (String(userId) != String(id)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const userData = await JsonWebToken.userFromToken(req);

    if (!userData) {
        return NextResponse.json({ error: 'User not found' }, { status: 403 });
    }
    return NextResponse.json({ userData }, { status: 200 });
}