import type { Metadata, Viewport } from "next";
import Head from "./head";
import RefundAssurancePolicy from "./main";

export const metadata: Metadata = {
  title: "Refund Assurance Policy - ABC E-Learning",
  description:
    "Our money-back guarantee ensures you can study with confidence. If you don't pass your official exam, we'll refund your PRO subscription.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <RefundAssurancePolicy />
    </>
  );
}
