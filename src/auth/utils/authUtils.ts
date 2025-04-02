import jwt from 'jsonwebtoken'


export const generateTokenOtb = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function generateJWT(userId:string,sessionId:string) {

    const payload = { userId: userId, sessionId: sessionId};
    const secret = process.env.KEY || 'secret_key';
    const token = jwt.sign(payload, secret, { expiresIn: '24h' });
    return token
}
export async function verifyJwtToken(token:string)
{
    const secret = process.env.KEY || 'secret_key';
    return jwt.verify(token, secret);
}
