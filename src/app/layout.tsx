import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QBX.app",
  description: "Browser-based business list quality tools."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
