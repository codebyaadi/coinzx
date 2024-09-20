import NextAuth from "next-auth";
import { eq } from "drizzle-orm";
import GoogleProvider from "next-auth/providers/google";
import { Keypair } from "@solana/web3.js";
import { db } from "@/db";
import { inrWallets, solWallets, users } from "@/db/schema";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET_KEY ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }

        const userdb = await db.query.users.findFirst({
          where: eq(users.username, email),
        });

        if (userdb) {
          return true;
        }

        const keypair = Keypair.generate();
        const pubKey = keypair.publicKey.toBase58();
        const pvtKey = keypair.secretKey.toString();

        const newUser = await db
          .insert(users)
          .values({
            name: profile?.name!,
            profileImg: profile?.image,
            username: user.email!,
            oauth_provider: account.provider,
          })
          .returning({ id: users.id });

        await db.insert(solWallets).values({
          publicKey: pubKey,
          privateKey: pvtKey,
          userId: newUser[0].id,
        });

        await db.insert(inrWallets).values({
          balance: "0",
          userId: newUser[0].id,
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
