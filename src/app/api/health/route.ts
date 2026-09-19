// force-static: в статической сборке превращается в обычный JSON-файл,
// в серверной по-прежнему отвечает healthcheck'у Docker
export const dynamic = "force-static";

export function GET() {
  return Response.json({ status: "ok", uptimeSeconds: Math.round(process.uptime()) });
}
