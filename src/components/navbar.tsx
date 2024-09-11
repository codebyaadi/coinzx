"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const session = useSession();

  return (
    <nav className="w-full font-prompt">
        <div className="mx-auto max-w-7xl flex justify-between item-center py-2">
            <div id="logo">
                <h1 className="font-unbounded text-base font-semibold text-orange-400">CoinzX</h1>
            </div>
            {session.data?.user ? (
                <Button variant="destructive" className="rounded-full" onClick={() => signOut()}>Log out</Button>
            ) : (
                <div className="flex justify-center gap-2">
                    <Button variant="ghost" className="rounded-full" onClick={() => signIn()}>Log In</Button>
                    <Button className="rounded-full bg-orange-400 shadow-none hover:bg-orange-400" onClick={() => signIn()}>Sign Up</Button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar