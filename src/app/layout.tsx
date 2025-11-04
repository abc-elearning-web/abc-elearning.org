import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ABC Elearning | Simplify your learning",
  description: "Simplify your learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
