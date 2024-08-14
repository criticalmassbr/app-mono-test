import { PrismaClient } from '@prisma/client';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import UserDataFromToken from '../@types/jwt';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export type DecodedToken = JwtPayload & {
    userId: string
}

class JsonWebToken {
    private static instance: JsonWebToken;
    private readonly secretKey: string;

    private constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || 'dialog';
    }

    public static getInstance(): JsonWebToken {
        if (!JsonWebToken.instance) {
            JsonWebToken.instance = new JsonWebToken();
        }
        return JsonWebToken.instance;
    }

    public signToken(payload: object, expiresIn: string = '1h'): string {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    public getToken(req?: NextRequest): string {
        const header = (!req) ? headers() : req.headers;
        const authHeader = header.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            redirect(process.env.NEXT_PUBLIC_LOGIN ?? "");
        }

        return authHeader.split(' ')[1];
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    public async authenticate(req?: NextRequest) {
        const token = this.getToken(req) as string;

        try {
            const decoded = this.verifyToken(token);
            return decoded;
        } catch (error) {
            return NextResponse.redirect("/login")
        }
    }

    public decodeJWT(req?: NextRequest): DecodedToken | null {
        try {
            const token = this.getToken(req) as string;
            const decoded = jwt.decode(token) as DecodedToken;
            return decoded;
        } catch (error) {
            console.error('Failed to decode JWT', error);
            return null;
        }
    };

    public async userFromToken(req?: NextRequest): Promise<UserDataFromToken> {
        try {
            const cookieDecoded = this.decodeJWT(req) as DecodedToken | null;
            if (!!cookieDecoded) {
                const user: UserDataFromToken = await prisma.user.findFirstOrThrow({
                    where: { id: Number(cookieDecoded.userId) },
                    select: {
                        email: true,
                        profile: {
                            select: { id: true, bio: true, birthDate: true, posts: true, reactions: true, name: true }
                        },
                        id: true,
                    },
                });
                if (!!user) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            console.error('Failed to find User', error);
            return null;
        }
    };
}

export default JsonWebToken.getInstance(); 