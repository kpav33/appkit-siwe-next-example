"use client";

import React, { ReactNode } from "react";
import { config, projectId, siweConfig, metadata } from "../config";

import { createWeb3Modal } from "@web3modal/wagmi/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { State, WagmiProvider } from "wagmi";

// https://docs.login.xyz/integrations/nextauth.js?ref=blog.spruceid.com
// Setup next-auth => Wrapping the provider is just basic so the next-auth hooks work, so if there are any questions about how SIWE works, probably best to check there
// Keep in mind that the example in the docs above is without AppKit added and web3modal specific libraries, so there are differences, but the logic or the process is similar
import { SessionProvider } from "next-auth/react";

// Setup queryClient
const queryClient = new QueryClient();

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  metadata: metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  // Pass the siwe config to the modal here
  siweConfig,
});

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}
