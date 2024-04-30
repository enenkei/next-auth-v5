'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CardWrapper from './auth/card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import FormSuccess from './form-success';
import FormError from './form-error';

const NewVerificationForm = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError('Missing token');
            return;
        }
        newVerification(token).then((data) => {
            setSuccess(data?.success!),
            setError(data?.error!)
        }).catch((err) => {
            setError(`Something went wrong: ${err}`);
        });
    }, [token, success, error]);
    useEffect(() => {
        onSubmit();
    }, []);
    return (
        <CardWrapper headerLabel='Confirming your label'
            backButtonHref='/auth/login'
            backButtonLabel='Back to Login'>
            <div className='flex items-center w-full justify-center gap-3'>
                {!success && !error && (
                    <BeatLoader />
                )}
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </CardWrapper>

    )
}

export default NewVerificationForm;
