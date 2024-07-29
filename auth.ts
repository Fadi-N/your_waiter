import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {getUserById} from "@/data/user";
import authConfig from "./auth.config"
import {db} from "@/lib/db";
import {UserRole} from "@prisma/client";

export const {auth, handlers, signIn, signOut} = NextAuth({
    /*To pass something to our session start with token callback */
    /*Get the data from our db*/
    /*In session callback extend what you want to get in*/
    callbacks: {
        async session({token, session}) {
            console.log({SESSIONTOKEN: token})

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig,
})