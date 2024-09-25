import { eq } from "drizzle-orm";
import GoogleProvider from "next-auth/providers/google";
import { Keypair } from "@solana/web3.js";
import { db } from "@/db";
import { inrWallets, solWallets, users } from "@/db/schema";
import { AuthOptions, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's unique ID from the database */
      uid: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    /** The user's unique ID from the database */
    uid: string;
  }
}

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET_KEY ?? "",
    }),
  ],
  callbacks: {
    // Attach the user ID (uid) to the session object
    async session({ session, token }) {
      if (session.user && token.uid) {
        session.user.uid = typeof token.uid === "string" ? token.uid : ""; // Assign the user ID from token to session
      }
      return session;
    },

    // Attach the user ID to the JWT token
    async jwt({ token, account }) {
      // If the account object exists, this means it's the first time sign-in
      if (account) {
        const user = await db.query.users.findFirst({
          where: eq(users.oauth_id, account.providerAccountId),
        });

        if (user) {
          token.uid = user.id.toString(); // Set the user's ID in the token
        }
      }
      console.log("token", token);
      return token; // Always return the token
    },

    // Handle the sign-in process
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false; // Fail if email is not present
        }

        // Check if the user already exists in the database
        const userdb = await db.query.users.findFirst({
          where: eq(users.username, email),
        });

        if (userdb) {
          return true; // User already exists, proceed with sign-in
        }

        // Generate new Solana wallet keys for the new user
        const keypair = Keypair.generate();
        const pubKey = keypair.publicKey.toBase58();
        const pvtKey = keypair.secretKey.toString();

        // Insert the new user into the users table
        const newUser = await db
          .insert(users)
          .values({
            name: profile?.name!,
            profileImg: profile?.image,
            username: user.email!,
            oauth_provider: account.provider,
            oauth_id: account.providerAccountId,
          })
          .returning({ id: users.id });

        // Insert a new Solana wallet for the user
        await db.insert(solWallets).values({
          publicKey: pubKey,
          privateKey: pvtKey,
          userId: newUser[0].id,
        });

        // Insert a new INR wallet for the user
        await db.insert(inrWallets).values({
          balance: "0",
          userId: newUser[0].id,
        });
      }

      return true; // Allow the sign-in
    },
  },
};
