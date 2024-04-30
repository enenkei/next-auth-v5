'use client'
import React from 'react';

type Props = {
    children: React.ReactNode,
    mode?: 'modal' | 'redirect',
    asChild?: boolean
}

const LoginButton = ({ children, mode, asChild }: Props) => {
    const onClick = () => {

    }
    if(mode === 'modal'){
        //todo
    }
    return (
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    )
}

export default LoginButton;
