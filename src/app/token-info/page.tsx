import type { Metadata, Viewport } from "next";
import Head from "./head";
import TokenInfo from "./main";

export const metadata: Metadata = {
  title: "Tokens — Your Reward Points",
  description: "Tokens — Your Reward Points",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <TokenInfo />
    </>
  );
}
