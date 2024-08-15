import { JwtPayload } from "jsonwebtoken"

type UserDataFromToken = {
    userId: string
} | null

export type OwnJwtPayload = JwtPayload & {
    userId: string
} | null

export default UserDataFromToken;