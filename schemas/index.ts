import { z } from "zod";

export const LoginSchema = z.object({
    email : z.string().email({
        message : 'Email is required'
    }),
    password : z.string().min(8, {
        message : 'Password is required'
    })
});

export const RegisterSchema = z.object({
    email : z.string().email({
        message : 'Email is required'
    }),
    password : z.string().min(8, {
        message : 'Password length is at least 8 characters'
    }),
    name : z.string().min(1, {
        message : 'Name is required'
    })
});

export const ResetSchema = z.object({
    email : z.string().email({
        message : 'Email is required'
    })
});

export const NewPasswordSchema = z.object({
    password : z.string().min(8, {
        message : 'Password length is at least 8 characters'
    }),
});