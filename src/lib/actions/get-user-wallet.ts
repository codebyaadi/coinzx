"use server";

import { db } from "@/db";
import { solWallets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth";

export const getUserWallet = async () => {
  const session = await getServerSession(authConfig);
  console.log("session", session);

  const userWallet = await db
    .select({
      publicKey: solWallets.publicKey,
    })
    .from(solWallets)
    .where(eq(solWallets.userId, session?.user.uid ?? ""));

  if (!userWallet) {
    return {
      success: false,
      error: "No solana wallet found",
      data: null,
    };
  }

  return {
    success: true,
    error: null,
    data: userWallet[0].publicKey,
  };
};
