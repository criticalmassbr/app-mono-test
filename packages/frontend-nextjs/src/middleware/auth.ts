import { NextResponse } from 'next/server';
import JsonWebToken from '@/utils/jwt';

const authenticate = async (req: Request) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = JsonWebToken.verifyToken(token);
        return decoded;
    } catch (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
}

export default authenticate;