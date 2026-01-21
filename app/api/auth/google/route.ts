import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const generateToken = (user: any) => {
    return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        // 1. Verify Google Token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        let ticket;
        try {
            ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
        } catch (verifyError: any) {
            throw new Error(`Token verification failed: ${verifyError.message}`);
        }

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return NextResponse.json({ message: 'Invalid token or missing email' }, { status: 400 });
        }

        const { name, email, picture, sub } = payload;

        // 2. Create Stateless User Object
        // We use the Google 'sub' (unique ID) or email as our stable ID.
        // No database lookup required.
        const user = {
            _id: sub || email,
            id: sub || email, // accessibilty for both conventions
            username: name || email.split('@')[0],
            email: email,
            image: picture,
            role: 'member', // Default role
        };

        // 3. Generate Session Token (Stateless)
        // Store the user profile IN the token
        const serverToken = generateToken(user);

        return NextResponse.json({
            ...user,
            token: serverToken,
        });

    } catch (error: any) {
        console.error('Stateless Auth Error:', error);
        return NextResponse.json({ message: `Authentication failed: ${error.message}` }, { status: 400 });
    }
}
