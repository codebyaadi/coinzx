"use client";

import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = () => {
  const session = useSession();

  return (
    <nav className="w-full font-prompt">
      <div className="item-center mx-auto flex max-w-full justify-between border-b px-4 py-3 md:max-w-4xl lg:max-w-7xl">
        <div id="logo" className="flex items-center justify-start">
          <Link href="/">
            <h1 className="font-unbounded text-base font-semibold text-orange-400">CoinzX</h1>
          </Link>
        </div>
        {session.data?.user ? (
          <UserButton />
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

const UserButton = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage
            src={user?.image || "/default-avatar.png"}
            alt={user?.name || "User Avatar"}
          />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-44 font-prompt">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
