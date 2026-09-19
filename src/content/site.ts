/** Единственное место, где живут внешние ссылки и контакты */
export const site = {
  name: "Romchik",
  telegram: "https://t.me/REomapli",
  telegramHandle: "@REomapli",
  // Именно ||, а не ??: пустая строка из незаполненной переменной сборки
  // должна откатываться на localhost, иначе new URL("") роняет сборку
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;
