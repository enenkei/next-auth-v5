'use server';
import { db } from "@/lib/db";

export const getPasswordResetTokenbyToken = async(token : string) => {
    try {
        // console.log(token);
        const passwordToken = await db.passwordResetToken.findUnique({
            where : {token}
        });
        return passwordToken;
    }catch(err) {
        // console.error(err);
        return null;
    }
}

export const getPasswordResetTokenbyEmail = async(email : string) => {
    try {
        const passwordToken = await db.passwordResetToken.findFirst({
            where : {email}
        });
        return passwordToken;
    }catch(err) {
        return null;
    }
}