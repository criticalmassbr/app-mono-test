import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserLogin from '@/api_types/login';
import OwnPrismaClient from "@/utils/OwnPrismaClient";

const secretKey = process.env.JWT_SECRET_KEY || 'dialog';
export type LoginResponse = NextResponse<{
    error: string;
} | {
    token: string;
    message: string;
}>

export async function POST(request: NextRequest): Promise<NextResponse> {
    let response = NextResponse.json({}, { status: 200 });
    try {
        const { email, password } = await request.json();

        const user: UserLogin | null = await OwnPrismaClient.user.findUnique({ where: { email }, select: { id: true, email: true, password: true } });
        if (user == null || !(await bcrypt.compare(password, user.password))) {
            response = NextResponse.json([], { status: 404, statusText: "Wrong e-mail or password" });
        } else {
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });
            response.cookies.set('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60,
                path: '/'
            });
        }
    } catch (error) {
        response = NextResponse.json({}, { status: 500, statusText: 'Failed to process request' });
    } finally {
        return response;
    }
}