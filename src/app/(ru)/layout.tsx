import type { ReactNode } from "react";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { buildMetadata, siteViewport } from "@/lib/metadata";

export const metadata = buildMetadata("ru");
export const viewport = siteViewport;

export default function RuLayout({ children }: { children: ReactNode }) {
  return <RootShell locale="ru">{children}</RootShell>;
}
