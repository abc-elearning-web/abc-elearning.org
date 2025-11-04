import type { Metadata, Viewport } from "next";
import Head from "./head";
import BrainmatePage from "./main";

export const metadata: Metadata = {
  title: "Brainmate - Your Smart Exam Helper",
  description:
    "Brainmate is your built-in AI assistant designed to help you understand the questions inside the app and make learning smoother.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return (
    <>
      <Head />
      <BrainmatePage />
    </>
  );
}
