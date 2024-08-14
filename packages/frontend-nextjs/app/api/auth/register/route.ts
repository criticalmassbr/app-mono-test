import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import UserRegister from '@/api_types/register';

const prisma = new PrismaClient();


export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user: UserRegister = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return NextResponse.redirect("/login");
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}