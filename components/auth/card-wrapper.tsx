'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react'
import Header from './header';
import Social from './social';
import { Button } from '../ui/button';
import { ArrowLeftCircleIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean
}

const CardWrapper = ({ children, headerLabel, backButtonHref, backButtonLabel, showSocial }: Props) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <Button variant={'link'} className='font-normal w-full flex gap-x-2' size={'sm'} asChild>
                    <Link href={backButtonHref}>
                        <ArrowLeftCircleIcon className='w-8 h-8' />{backButtonLabel}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CardWrapper;
