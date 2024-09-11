"use client"

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  return (
    <main className="w-full font-prompt">
      <div className="w-full mx-auto max-w-4xl my-16">
        <h2 className="text-center text-2xl font-bold py-4">
          Experience the future of cryptocurrency, today
        </h2>
        <p className="text-center text-base">
        Embrace the future of digital finance with a cryptocurrency built on cutting-edge technology, offering unparalleled security, transparency, and speed.
        </p>
        <div className="w-full flex justify-center mt-4">
          {session.data?.user ? (
            <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
          ) : <Button onClick={() => signIn("google")} className="rounded-full bg-orange-400 hover:bg-orange-400 shadow-none">
            Sign in to Google
          </Button>}
        </div>
      </div>
    </main>
  );
}
