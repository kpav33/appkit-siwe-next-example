import styles from "./page.module.css";
import Link from "next/link";

// About SIWE standard => https://docs.login.xyz/general-information/siwe-overview/eip-4361
// With SIWE users can use their ETH address to log on to websites without the websites knowing any other information about them (unlike with social logins for example...), there are also no passwords involved users just need acces to their eth account, possibilities for user engagement (accounts tied to on-chain activities, nft holdings, dao memebership...)
// EIP-4361, "Sign-In with Ethereum," outlines a standardized method for authenticating Ethereum accounts with off-chain services through message signing. The message includes session details, security elements like a nonce, and the scope of the interaction. This approach aims to replace centralized identity providers (IdPs) with a self-custodied alternative, granting users more control over their digital identity. It also promotes interoperability across different services and offers wallet vendors a standardized, machine-readable message format, enhancing the user experience and consent management. The specification seeks to streamline authentication workflows while providing a decentralized identity solution.
// With One-Click Auth users can connect with a wallet and sign a SIWE message with just one click

//  WalletConnect AppKit without SIWE => Connect wallet to app to enable interaction with dApps, users use their wallets to prove ownership of assets, execute transaction..., no formal authentication is involved. The wallet connection confirms user's ability to access and control the wallet, but doesn't establish a session with the application in a traditional web sense.
// WalletConnect AppKit with SIWE => With SIWE added we also authenticate users on our website by using their Ethereum wallet. This create a session, allowing users to access protected areas of the app (dashboard, profile) as if they had logged in using traditional credentials. With SIWE users sign a message with their wallet's private key, which is then verified by the backend (next-auth in our case, verifySignature function). This also enables off-chain interactions (like fetching data form backend) in a secure and authenticated manner.
// If you want to authenticate users securely and want them to have an account or maintain session with your website, you should use SIWE, if you just need for users to do basic contract interaction using AppKit without SIWE is enough.
// How SIWE works
// Based on cryptographic signatures tied to Ethereum wallet, insted of providing a password for authentication, user signs a message with their private key. This is then verified by application, which confirms that the user controls the wallet they claim to own.
// Step 1: Message Generation => A nonce is generated and a signing message, the nonce is unique per session attempt to prevent replay attacks (attack where signature is reused).
// Step 2: User Signs the Message => User is prompted to sign the message, they sign it with their private key.
// Step 3: Signature Verification => Server checks the signed message and verifies it.
// Step 4: Session Creation => After user is authenticated a session can be created for the authenticated user and can be stored using session tokens (like JWT).
// SIWE does not require database of usernames and passwords, because authentication is based on their cryptographic control of an Ethereum address. No storage of passwords is needed, but you might still need a database to store certain session-related data for user management (roles, permissions, preferences...). No need to store username and password, because address itself is user's identity.
// With SIWE we mainly store session tokens, you can use stateless tokens (JWTs) or something like Redis store.
// If you want to store additional information about the user (like preferences...) you would need an additional database, where you can associate the data with the user's Ethereum address.
// With SIWE used for authentication, there's no risk of password theft or reuse, its decentralized so users aren't tied to centralized credentials managers and since it's based on Ethereum wallets, the same login process can be used across multiple dApps that support it.

export default function Home() {
  return (
    // <main className="p-5">
    //   <section>Hello World!</section>
    // </main>

    <main className={styles.main}>
      <w3m-button />
      <div className={styles.description}>
        <Link href="/dashboard">Dashboard page</Link>
      </div>
    </main>
  );
}
