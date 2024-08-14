import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import UserRegister from '@/api_types/register';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: UserRegister = await prisma.user.create({
        data: { email, password: hashedPassword },
    });

    return NextResponse.json(user);
}
