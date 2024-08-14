import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import JsonWebToken from '@/utils/jwt';
import UserLogin from '@/api_types/login';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export type LoginResponse = NextResponse<{
    error: string;
} | {
    token: string;
    message: string;
}>

export async function POST(request: NextRequest): Promise<any> {
    try {
        const { email, password } = await request.json();

        const user: UserLogin | null = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json([], { status: 404 });
        }

        const token = JsonWebToken.signToken({ userId: user.id });
        const cookieStore = cookies();
        cookieStore.set('auth_token', token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 60 * 60, // 1 hour in seconds
            path: '/', // The cookie is valid for the entire site
        });
        const response = NextResponse.json({ message: 'Login successful' });

        // Set the JWT as a cookie in the response
        response.cookies.set('auth_token', token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 60 * 60, // 1 hour in seconds
            path: '/', // The cookie is valid for the entire site
        });
        return response;
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}