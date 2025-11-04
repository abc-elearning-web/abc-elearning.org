import type { Metadata, Viewport } from "next";
import Head from "./head";
import PrivacyPolicy from "./main";

export const metadata: Metadata = {
  title: "Easy Prep Privacy Policy",
  description: "Easy Prep Privacy Policy",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <PrivacyPolicy />
    </>
  );
}
