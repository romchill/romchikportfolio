import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { locales } from "@/i18n/config";

export const alt = "Romchik — Telegram Mini Apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** Картинка превью для Telegram и соцсетей: только латиница, шрифт системный */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000000",
        padding: "72px",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>romchik</span>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#ffffff" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 128, fontWeight: 800, letterSpacing: -6, lineHeight: 1 }}>
          TELEGRAM
        </span>
        <span
          style={{
            fontSize: 128,
            fontWeight: 800,
            letterSpacing: -6,
            lineHeight: 1,
            color: "#4a4a4a",
          }}
        >
          MINI APPS
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 26, color: "#a8a8a8" }}>Mini apps, bots, backend, deploy</span>
        <span
          style={{
            fontSize: 26,
            color: "#ffffff",
            border: "1px solid #3a3a3a",
            borderRadius: 999,
            padding: "12px 28px",
          }}
        >
          {site.telegramHandle}
        </span>
      </div>
    </div>,
    size,
  );
}
