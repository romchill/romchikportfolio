import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Собирает минимальный самодостаточный сервер — основа лёгкого Docker-образа
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Корень отдаём русской версии; язык живёт в пути
      { source: "/", destination: "/ru", permanent: false },
    ];
  },
};

export default nextConfig;
