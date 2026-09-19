/** Единственное место, где живут внешние ссылки и контакты */
export const site = {
  name: "Romchik",
  telegram: "https://t.me/REomapli",
  telegramHandle: "@REomapli",
  // Боевой адрес зашит значением по умолчанию: если переменную сборки забыть
  // или передать пустой, ссылки всё равно останутся правильными.
  // Именно ||, а не ??: пустая строка тоже должна откатываться на домен.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://romapp.ru",
} as const;
