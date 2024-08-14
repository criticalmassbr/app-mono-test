import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import JsonWebToken from '@/utils/jwt';
import UserLogin from '@/api_types/login';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user: UserLogin | null = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = JsonWebToken.signToken({ userId: user.id });

    return NextResponse.json({ token, message: 'Login successful' });
}
