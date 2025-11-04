import type { Metadata, Viewport } from "next";
import Head from "./head";
import TermsOfUse from "./main";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <TermsOfUse />
    </>
  );
}
