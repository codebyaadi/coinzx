"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const Navbar = () => {
    const session = useSession();

  return (
    <nav className="w-full">
        <div className="mx-auto max-w-7xl flex justify-between item-center py-2">
            <div id="logo">
                <h1>CoinzX</h1>
            </div>
            {session.data?.user ? (
                <Button variant="destructive" className="rounded-full">Logout</Button>
            ) : (
                <div className="flex justify-center gap-2">
                    <Button variant="ghost" className="rounded-full">Log In</Button>
                    <Button className="rounded-full">Sign Up</Button>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar