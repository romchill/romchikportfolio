import type { NextConfig } from "next";

/**
 * Две цели сборки из одного кода:
 *   npm run build         — сервер в Docker (output: standalone)
 *   npm run build:static  — папка out/ для бесплатного хостинга
 */
const staticExport = process.env.BUILD_TARGET === "static";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : "standalone",
  // Адреса со слешем на конце: экспорт кладёт страницы как ru/index.html,
  // и их отдаёт любой хостинг без своих правил переписывания
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  experimental: {
    // Корневой layout лежит в [locale], поэтому 404 для чужих путей — отдельным файлом
    globalNotFound: true,
  },
  images: {
    // В статике оптимизировать некому: картинки отдаются как есть
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
