# Romchik — портфолио

Сайт-портфолио разработчика **Telegram Mini Apps** и Telegram-ботов.

## Стек

| Слой       | Решение                                   |
| ---------- | ----------------------------------------- |
| Фреймворк  | Next.js 16, App Router, TypeScript strict |
| Стили      | Tailwind CSS v4 (токены через `@theme`)   |
| Анимации   | Framer Motion _(Шаг 4)_                   |
| Иконки     | Lucide _(Шаг 3)_                          |
| Языки      | RU + EN _(Шаг 3)_                         |
| Контейнеры | Docker multi-stage + Nginx                |

## Локальная разработка

```bash
npm install
```

```bash
npm run dev
```

Откроется на http://localhost:3000

## Разработка в Docker

```bash
npm run docker:dev
```

Горячая перезагрузка работает: исходники монтируются внутрь контейнера, `node_modules`
и `.next` остаются контейнерными. Под Windows события файловой системы через bind-mount
не проходят, поэтому Next следит за файлами опросом (`WATCHPACK_POLLING`).

## Продакшен

```bash
cp .env.example .env
```

```bash
npm run docker:prod
```

Поднимутся два контейнера: `web` (Next в режиме standalone, не-root пользователь,
healthcheck) и `nginx` (gzip, вечный кэш хэшированных бандлов, security-заголовки).
Сайт — на http://localhost, проверка живости — http://localhost/api/health

```bash
npm run docker:down
```

## Проверки

```bash
npm run check
```

Прогоняет `typecheck` → `lint` → `build`. Отдельно доступны `npm run format`
и `npm run format:check`.

## Структура

```
portfolio/
├── src/app/              роуты App Router, layout, глобальные стили
│   └── api/health/       эндпоинт живости для Docker и Nginx
├── infra/nginx/          конфиг reverse proxy
├── Dockerfile            multi-stage: deps → dev → builder → runner
├── docker-compose.yml        продакшен: web + nginx
└── docker-compose.dev.yml    разработка с горячей перезагрузкой
```
