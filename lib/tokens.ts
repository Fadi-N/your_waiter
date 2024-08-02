import {v4 as uuidv4} from "uuid"
import {getVerificationTokenByEmail} from "@/data/verification-token";
import {db} from "@/lib/db";
import {getPasswordResetTokenByEmail} from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    // The token will expire in one hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getVerificationTokenByEmail(email);

    // Check if we have existingToken already sent to this email
    // If yes then remove it from our db
    
    if (existingToken) {
        await db.verificationToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    // Generate a new token
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken;
}

export const generatePasswordResetToken = async (email: string) =>{
    const token = uuidv4();
    // The token will expire in one hour
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where:{
                id: existingToken.id
            }
        })
    }

    // Generate a new token
    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken;
}