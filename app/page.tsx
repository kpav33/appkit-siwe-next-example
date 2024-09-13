import styles from "./page.module.css";
import Link from "next/link";

// About SIWE standard => https://docs.login.xyz/general-information/siwe-overview/eip-4361
// With SIWE users can use their ETH address to log on to websites without the websites knowing any other information about them (unlike with social logins for example...), there are also no passwords involved users just need acces to their eth account, possibilities for user engagement (accounts tied to on-chain activities, nft holdings, dao memebership...)
// EIP-4361, "Sign-In with Ethereum," outlines a standardized method for authenticating Ethereum accounts with off-chain services through message signing. The message includes session details, security elements like a nonce, and the scope of the interaction. This approach aims to replace centralized identity providers (IdPs) with a self-custodied alternative, granting users more control over their digital identity. It also promotes interoperability across different services and offers wallet vendors a standardized, machine-readable message format, enhancing the user experience and consent management. The specification seeks to streamline authentication workflows while providing a decentralized identity solution.
// With One-Click Auth users can connect with a wallet and sign a SIWE message with just one click

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
