import { cookies } from "next/headers";
import * as jose from 'jose'
import OwnPrismaClient from "@/utils/OwnPrismaClient"

const secretKey = process.env.JWT_SECRET_KEY || 'dialog';

const jwtConfig = {
    secret: new TextEncoder().encode(secretKey),
}

export type AuthUser = {
    id: number;
    email: string;
    profile: {
        id: number
        name: string;
        bio: string | null;
        birthDate: Date | null;
    } | null;
}
export const authenticatedUser = async (): Promise<AuthUser | false> => {
    let token = cookies().get("auth_token")?.value;
    if (token != undefined) {
        try {
            const decoded = await jose.jwtVerify(token, jwtConfig.secret)
            if (decoded.payload?.userId) {
                const userId = decoded.payload?.userId as string;
                const user = await OwnPrismaClient.user.findUnique({
                    where: {
                        id: Number(userId)
                    },
                    select: {
                        id: true, email: true,
                        profile: {
                            select: {
                                id: true,
                                name: true,
                                bio: true,
                                birthDate: true
                            }
                        }
                    }
                });
                return user === null ? false : user;
            } else {
                return false
            }
        } catch (err) {
            console.error('isAuthenticated error: ', err)
            return false
        }
    } else {
        return false
    }
}