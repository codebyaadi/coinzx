import { Connection } from "@solana/web3.js";

let LAST_UPDATED: number | null = null;
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;
let prices: {
  [key: string]: {
    price: string;
  };
} = {};

export const SUPPORTED_TOKENS = [
  {
    name: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
  },
  {
    name: "USDT",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
  },
  {
    name: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    native: false,
  },
];

export const connection = new Connection("https://api.mainnet-beta.solana.com");

export async function getSupportedTokens() {
  const now = new Date().getTime();

  if (!LAST_UPDATED || now - LAST_UPDATED >= TOKEN_PRICE_REFRESH_INTERVAL) {
    const response = await fetch("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");

    if (response.ok) {
      prices = await response.json(); // await the response to fully resolve
      LAST_UPDATED = now; // Update the timestamp after successful fetch
    } else {
      console.error("Failed to fetch prices:", response.status);
    }
    SUPPORTED_TOKENS.map((s) => ({
      ...s,
      price: prices[s.name],
    }));
  }
}

getSupportedTokens().then(() => {
  console.log(prices); // Make sure to access prices after the fetch is complete
});
