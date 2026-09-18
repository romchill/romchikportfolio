/** Языконезависимые данные кейсов: ссылки и теги стека */
export const projects = [
  {
    slug: "promt-shop",
    handle: "@promtrusbot",
    url: "https://t.me/promtrusbot",
    year: "2026",
    stack: [
      "TypeScript",
      "React 19",
      "Vite",
      "Fastify",
      "grammY",
      "PostgreSQL",
      "Drizzle ORM",
      "Docker",
      "Caddy",
      "Telegram Stars",
    ],
  },
  {
    slug: "podsekay",
    handle: "@podsekay_bot",
    url: "https://t.me/podsekay_bot",
    year: "2026",
    stack: [
      "React",
      "TypeScript",
      "Tailwind",
      "@telegram-apps/sdk",
      "Python",
      "FastAPI",
      "aiogram",
      "PostgreSQL",
      "Vision AI",
      "Telegram Stars",
    ],
  },
] as const;

export type Project = (typeof projects)[number];
