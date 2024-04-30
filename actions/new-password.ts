'use server'
import { getPasswordResetTokenbyToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const newPassword = async(values : z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if(!token){
        return {error : 'Missing token'};
    }
    const validatedFields = NewPasswordSchema.safeParse(values);
    if(!validatedFields.success) {
        return {error : 'Invalid inputs!'}
    }
    const {password} = validatedFields.data;
    const existingToken = await getPasswordResetTokenbyToken(token);
    // console.log(token);
    if(!existingToken){
        return {error : 'Invalid token'};
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if(hasExpired){
        return {error : 'Token has expired'};
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return {error : 'Email does not exist'};
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.user.update({
        where : {
            id : existingUser.id
        },
        data : {password : hashed}
    });
    await db.passwordResetToken.delete({
        where : {id : existingToken.id}
    });
    return {success : 'Password was reset'};
}