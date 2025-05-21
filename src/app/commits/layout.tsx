import { Metadata } from "next";
import { toolsMetadata } from "../metadata.config";

export const metadata: Metadata = toolsMetadata.commits;

export default function CommitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 