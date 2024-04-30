'use client'
import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2Icon, SendHorizonalIcon } from 'lucide-react';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { ResetSchema } from '@/schemas';
import { reset } from '@/actions/reset';

const ResetForm = () => {
    const [isPending,startTransition] = useTransition();
    const [error,setError] = useState<string | undefined>("");
    const [success,setSuccess] = useState<string | undefined>("");
    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: '',
        }
    });
    const onSubmit = (values : z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            reset(values).then((data) => {
                setError(data?.error!);
                setSuccess(data?.success!);
            });
        });
        console.log(values);
    }
    return (
        <CardWrapper headerLabel='Forgot your password?'
            backButtonLabel='Back to Login'
            backButtonHref='/auth/login'
            showSocial={false}>
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
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type='submit' className='w-full'>
                        Send Reset Email{isPending ? <Loader2Icon className='h-4 w-4 animate-spin ml-2' /> : <SendHorizonalIcon className='w-4 h-4 ml-2' />}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default ResetForm
