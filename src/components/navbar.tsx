"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const session = useSession();

  return (
    <nav className="w-full font-prompt">
      <div className="item-center mx-auto flex max-w-full md:max-w-4xl lg:max-w-7xl justify-between py-2 px-4">
        <div id="logo">
          <Link href="/">
            <h1 className="font-unbounded text-base font-semibold text-orange-400">CoinzX</h1>
          </Link>
        </div>
        {session.data?.user ? (
          <Button variant="destructive" className="rounded-full" onClick={() => signOut()}>
            Log out
          </Button>
        ) : (
          <div className="flex justify-center gap-2">
            <Button variant="ghost" className="rounded-full" onClick={() => signIn()}>
              Log In
            </Button>
            <Button
              className="rounded-full bg-orange-400 shadow-none hover:bg-orange-400"
              onClick={() => signIn()}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
