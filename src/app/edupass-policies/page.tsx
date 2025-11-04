import type { Metadata, Viewport } from "next";
import Head from "./head";
import EduPassPrivacyPolicy from "./main";

export const metadata: Metadata = {
  title: "Privacy Policy - EduPass",
  description: "Privacy Policy for EduPass learning platform",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <EduPassPrivacyPolicy />
    </>
  );
}
