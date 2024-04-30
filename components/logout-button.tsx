import { signOut } from 'next-auth/react'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

const LogoutButton = ({ children }: Props) => {
    const onClick = async () => {
        await signOut();
    }
    return (
        <span className='cursor-pointer' onClick={onClick}>
            {children}
        </span>
    )
}

export default LogoutButton;
