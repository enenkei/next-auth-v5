'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2Icon, LogInIcon } from 'lucide-react';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { login } from '@/actions/login';
import Link from 'next/link';

const LoginForm = () => {
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: ""
        }
    });
    const onSubmit = (values : z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            login(values).then((data) => {
                setError(data?.error);
                setSuccess(data?.success);
            });
        });
        // console.log(values);
    }
    return (
        <CardWrapper headerLabel='Welcome Back'
            backButtonLabel='No Account?'
            backButtonHref='/auth/register'
            showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'>
                    <div className='space-y-4'>
                        <FormField control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder='name@mail.com'
                                            type='email' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} {...field} placeholder='Your Password...'
                                            type='password' />
                                    </FormControl>
                                    <Button size={'sm'} variant={'link'} asChild className='px-0 font-normal text-indigo-600'>
                                        <Link href={'/auth/reset'}>
                                            Forgot Password?
                                        </Link>
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type='submit' className='w-full'>
                        Login{isPending ? <Loader2Icon className='h-4 w-4 animate-spin ml-2' /> : <LogInIcon className='w-4 h-4 ml-2' />}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm;
