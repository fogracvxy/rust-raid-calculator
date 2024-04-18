import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "./_components/topnav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rust raid calculator by MSpudicDesign",
  description: "Calculate the number of explosives required for a raid in Rust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopNav />
        {children}{" "}
        <footer>
          <div
            style={{ position: "absolute", bottom: 0, width: "100%" }}
            className="bg-black"
          >
            <div className="bg-black max-w-6xl container mx-auto px-6 pt-10 pb-6">
              © MSpudicDesign. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
