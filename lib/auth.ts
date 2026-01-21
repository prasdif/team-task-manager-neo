import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function protect() {
    // Stateless Protect: Only validates the token signature.
    // DOES NOT connect to DB.

    const headersList = await headers();
    const authorization = headersList.get('authorization');

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');

            // In stateless mode, the token IS the user record.
            return decoded;
        } catch (error) {
            console.error(error);
            // Fallback to guest if token is invalid
        }
    }

    // Default Guest User if no token or invalid token
    return {
        _id: 'guest_user_123',
        id: 'guest_user_123',
        username: 'Guest User',
        email: 'guest@taskmanager.demo',
        role: 'member'
    };
}
