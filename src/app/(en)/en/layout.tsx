import type { ReactNode } from "react";
import "../../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { buildMetadata, siteViewport } from "@/lib/metadata";

export const metadata = buildMetadata("en");
export const viewport = siteViewport;

export default function EnLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
