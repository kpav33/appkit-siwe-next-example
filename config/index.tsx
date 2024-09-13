import {
  createSIWEConfig,
  SIWECreateMessageArgs,
  formatMessage,
  SIWESession,
  SIWEVerifyMessageArgs,
} from "@web3modal/siwe";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { getCsrfToken, getSession, signIn, signOut } from "next-auth/react";

import { cookieStorage, createStorage } from "wagmi";
import { arbitrum, mainnet, optimism, sepolia } from "wagmi/chains";

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

export const metadata = {
  name: "Appkit",
  description: "Appkit Siwe Example - Next.js",
  url: "https://appkit-siwe-next-example.netlify.app/", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mainnet, optimism, arbitrum, sepolia] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

// interface SIWEConfig {
//   // Required
// // The getNonce method functions as a safeguard against spoofing, akin to a CSRF token. The siwe package provides a generateNonce() helper, or you can utilize an existing CSRF token from your backend if available.
//   getNonce: () => Promise<string>
// // The official siwe package offers a straightforward method for generating an EIP-4361-compatible message, which can subsequently be authenticated using the same package. The nonce parameter is derived from your getNonce endpoint, while the address and chainId variables are sourced from the presently connected wallet.
//   createMessage: (args: SIWECreateMessageArgs) => string
//   verifyMessage: (args: SIWEVerifyMessageArgs) => Promise<boolean>
//   getSession: () => Promise<SIWESession | null>
//   signOut: () => Promise<boolean>

//   // Optional
//   onSignIn?: (session?: SIWESession) => void
//   onSignOut?: () => void
//   // Defaults to true
//   enabled?: boolean
//   // In milliseconds, defaults to 5 minutes
//   nonceRefetchIntervalMs?: number
//   // In milliseconds, defaults to 5 minutes
//   sessionRefetchIntervalMs?: number
//   // Defaults to true
//   signOutOnDisconnect?: boolean
//   // Defaults to true
//   signOutOnAccountChange?: boolean
//   // Defaults to true
//   signOutOnNetworkChange?: boolean
// }

// Beside the ususal wagmi config, we need to also setup the SIWE config
export const siweConfig = createSIWEConfig({
  getMessageParams: async () => ({
    domain: typeof window !== "undefined" ? window.location.host : "",
    uri: typeof window !== "undefined" ? window.location.origin : "",
    chains: [mainnet.id, sepolia.id, optimism.id, arbitrum.id],
    statement: "Please sign with your account",
  }),
  createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
    formatMessage(args, address),
  getNonce: async () => {
    const nonce = await getCsrfToken();
    if (!nonce) {
      throw new Error("Failed to get nonce!");
    }

    return nonce;
  },
  getSession: async () => {
    const session = await getSession();
    if (!session) {
      throw new Error("Failed to get session!");
    }

    const { address, chainId } = session as unknown as SIWESession;

    return { address, chainId };
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      const success = await signIn("credentials", {
        message,
        redirect: false,
        signature,
        callbackUrl: "/protected",
      });

      return Boolean(success?.ok);
    } catch (error) {
      return false;
    }
  },
  signOut: async () => {
    try {
      await signOut({
        redirect: false,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
});
