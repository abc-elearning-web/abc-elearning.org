import type { Metadata, Viewport } from "next";
import Head from "./head";
import ReferralProgram from "./main";

export const metadata: Metadata = {
  title: "Referral Program – Terms &amp; Conditions",
  description: "Referral Program – Terms &amp; Conditions",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <ReferralProgram />
    </>
  );
}
