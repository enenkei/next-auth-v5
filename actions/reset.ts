'use server';

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const reset = async(values : z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    if(!validatedFields.success) {
        return {error : 'Invalid Email!'};
    }
    const existingUser = await getUserByEmail(validatedFields.data.email);
    if(!existingUser){
        return {error : 'Email not found!'};
    }
    const passwordResetToken = await generatePasswordResetToken(validatedFields.data.email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
    return {success : 'Sent reset email'};
}