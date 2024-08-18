import { NextRequest, NextResponse } from 'next/server';
import OwnPrismaClient from "@/src/lib/OwnPrismaClient";
import bcrypt from 'bcrypt';
import UserRegister from '@/api_types/register';

export async function POST(request: NextRequest): Promise<NextResponse> {
    let response = NextResponse.json(undefined, { status: 200 });
    try {
        const { email, password, name } = await request.json();

        if (!email || !password || !name) {
            response = NextResponse.json(undefined, { status: 400, statusText: 'Missing email, name or password' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: UserRegister = await OwnPrismaClient.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    profile: {
                        create: {
                            name,
                        }
                    }
                },
                include: {
                    profile: true
                }
            });
            if (!user) response = NextResponse.json(undefined, { status: 500, statusText: "User couldn't be created: Prisma problem" });
        }
    } catch (error) {
        response = NextResponse.json(undefined, { status: 500, statusText: error instanceof Error ? error.message : ""  });
    } finally {
        return response;
    }
}