import type { Metadata, Viewport } from "next";
import Head from "./head";
import Mentora from "./main";

export const metadata: Metadata = {
  title: "Mentora AI",
  description: "Mentora AI",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <Mentora />
    </>
  );
}
