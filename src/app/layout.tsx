import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "./_components/topnav";
import { Footer } from "./_components/footer";

const inter = Inter({ subsets: ["latin"] });
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Rust raid calculator by MSpudicDesign",
  description: "Calculate the number of explosives required for a raid in Rust",
  icons: {
    icon: ["/icon.ico"],
    apple: ["/icon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen font-mono`}
      >
        <TopNav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
