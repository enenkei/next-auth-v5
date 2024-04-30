'use server';

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values : z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success) {
        return {error : 'Invalid Fields!'};
    }
    const {email,password} = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if(!existingUser || !existingUser.email || !existingUser.password){
        return {error : 'Email does not exist'}
    }
    if(!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {success : 'Confirmation Email Sent!'}
    }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo : DEFAULT_LOGIN_REDIRECT
        });
    }catch(err) {
        if(err instanceof AuthError){
            switch(err.type) {
                case 'CredentialsSignin':
                    return {error : 'Invalid Credentials'};
                default:
                    return {error : 'Something went wrong'};
            }
        }
        // console.error(err);
        throw err;
    }
}