import JsonWebToken from '@/utils/jwt';

const authenticate = async (req: Request) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }
    const token = authHeader.split(' ')[1];
    const decoded = JsonWebToken.verifyToken(token);
    return decoded;
}

export default authenticate;