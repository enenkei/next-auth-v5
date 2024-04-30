'use client'
import { signOut } from "next-auth/react";
import { Button } from '@/components/ui/button';
import React from 'react'
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();
  return (
    <div className="p-10 rounded-lg">
      
    </div>
  )
}

export default SettingsPage;
