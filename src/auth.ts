import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const AuthOptions: NextAuthOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (values) => {
                try {
                    const response = await fetch(`${process.env.BASE_URL}/auth/signin`, {
                        method: 'POST',
                        body: JSON.stringify({
                            email: values?.email,
                            password: values?.password
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const payload = await response.json();
                    if (payload.message === 'success') {
                        const decodedToken: { id: string } = jwtDecode(payload.token);
                        return {
                            id: decodedToken.id,
                            user: payload.user as { name: string; email: string; role: string },
                            token: payload.token
                        };
                    } else {
                        throw new Error(payload?.errors?.msg || 'Email Or Password Is Incorrect');
                    }
                } catch (error: any) {
                    console.log('Auth error:', error.message);
                    throw new Error(error.message || 'Authentication failed');
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user
                token.token = user.token
            }
            return token //object encrypted used in server only
        },
        async session({ session, token }) {
            session.user = token.user;
            return session  //object encrypted used in client only
        }

    }
}