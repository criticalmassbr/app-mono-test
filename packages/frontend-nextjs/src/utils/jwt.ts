import jwt from 'jsonwebtoken';

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
        return jwt.sign(payload, this.secretKey,);
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Error in verify");
        }
    }

    
}

export default JsonWebToken.getInstance(); 