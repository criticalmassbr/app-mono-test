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
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    public verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}

export default JsonWebToken.getInstance(); 