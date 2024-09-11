"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  return (
    <main className="w-full font-prompt">
      <div className="mx-auto my-16 w-full max-w-4xl">
        <h2 className="py-4 text-center text-2xl font-bold">
          Experience the future of cryptocurrency, today
        </h2>
        <p className="text-center text-base">
          Embrace the future of digital finance with a cryptocurrency built on cutting-edge
          technology, offering unparalleled security, transparency, and speed.
        </p>
        <div className="mt-4 flex w-full justify-center">
          {session.data?.user ? (
            <Button
              onClick={() => router.push("/dashboard")}
              className="rounded-full bg-orange-400 shadow-none hover:bg-orange-400"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => signIn("google")}
              className="rounded-full bg-orange-400 shadow-none hover:bg-orange-400"
            >
              Sign in to Google
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
