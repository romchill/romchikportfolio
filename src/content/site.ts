/** Единственное место, где живут внешние ссылки и контакты */
export const site = {
  name: "Romchik",
  telegram: "https://t.me/REomapli",
  telegramHandle: "@REomapli",
  github: "https://github.com/romchill",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;
