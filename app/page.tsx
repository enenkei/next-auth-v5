'use client';
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LockIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const font = Poppins({
  subsets: ['latin'],
  weight: '600'
});

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="space-y-6">
        <h1 className={cn(
          "text-6xl font-semibold text-zinc-700 drop-shadow-md flex items-center",
          font.className
        )}>
          Auth<LockIcon className="h-12 w-12 ml-4" />
        </h1>
        <p className="text-white text-xl">
          Simple NextAuth Service
        </p>
      </div>
      <div>
        <LoginButton>
          <Button size={'lg'} variant={'secondary'} onClick={() => router.push('/auth/login')}>Sign-In</Button>
        </LoginButton>
      </div>
    </main>
  );
}
