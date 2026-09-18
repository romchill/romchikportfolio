# Romchik — портфолио

Сайт-портфолио разработчика **Telegram Mini Apps** и Telegram-ботов.
Одна страница на двух языках, тёмная монохромная тема, анимация на скролл и касания.

## Стек

| Слой       | Решение                                          |
| ---------- | ------------------------------------------------ |
| Фреймворк  | Next.js 16, App Router, TypeScript strict        |
| Стили      | Tailwind CSS v4, токены через `@theme`           |
| Анимации   | Motion (бывш. Framer Motion)                     |
| Иконки     | Lucide                                           |
| Шрифты     | Unbounded и Inter, self-hosted через `next/font` |
| Языки      | RU и EN, свой словарь без библиотек              |
| Контейнеры | Docker multi-stage, Nginx, Let's Encrypt         |

Обе локали собираются статически: `/ru` и `/en`, корень редиректит на `/ru`.

## Локальная разработка

```bash
npm install
```

```bash
npm run dev
```

Откроется на http://localhost:3000

## Проверки

```bash
npm run check
```

Прогоняет `typecheck` → `lint` → `build`. Отдельно есть `npm run format`
и `npm run format:check` — последний гоняется в CI, так что перед коммитом
стоит прогнать `npm run format`.

## Разработка в Docker

```bash
npm run docker:dev
```

Исходники монтируются внутрь контейнера, `node_modules` и `.next` остаются
контейнерными. Под Windows события файловой системы через bind-mount не проходят,
поэтому Next следит за файлами опросом (`WATCHPACK_POLLING`).

## Продакшен без HTTPS

Годится, чтобы проверить прод-сборку локально или поднять за чужим прокси.

```bash
cp .env.example .env
```

```bash
npm run docker:prod
```

Поднимутся `web` (Next standalone, не-root пользователь, healthcheck) и `nginx`
(gzip, вечный кэш хэшированных бандлов, security-заголовки). Сайт — на
http://localhost, проверка живости — http://localhost/api/health

## Продакшен с HTTPS

### 1. Подготовка

В `.env` заполнить:

```
NEXT_PUBLIC_SITE_URL=https://твой-домен
DOMAIN=твой-домен
CERTBOT_EMAIL=почта@для-уведомлений
```

`NEXT_PUBLIC_SITE_URL` попадает в canonical, `og:url`, `sitemap.xml` и
`robots.txt` — без него ссылки уедут на localhost. Важно: адрес **запекается
на этапе сборки**, а не читается при запуске, поэтому compose передаёт его
build-аргументом. После смены домена контейнер нужно пересобрать
(`up -d --build`), простого перезапуска мало.

A-запись домена (и `www`) должна указывать на IP сервера **до** выпуска
сертификата, иначе проверка Let's Encrypt не пройдёт.

### 2. Разовый выпуск сертификата

Nginx не стартует без сертификата, поэтому сначала поднимаем только его
временный HTTP-блок и получаем ключи:

```bash
docker compose -f docker-compose.prod.yml run --rm --service-ports --entrypoint "certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email $CERTBOT_EMAIL --agree-tos --no-eff-email" certbot
```

### 3. Запуск

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Что внутри:

| Сервис    | Роль                                                                     |
| --------- | ------------------------------------------------------------------------ |
| `web`     | Next standalone, файловая система только на чтение, не-root, healthcheck |
| `nginx`   | HTTP → HTTPS, TLS 1.2/1.3, HSTS с preload, gzip, кэш статики             |
| `certbot` | проверяет сертификат дважды в сутки и продлевает, когда подходит срок    |

Конфиг Nginx собирается из шаблона: `${DOMAIN}` подставляется при старте
контейнера, поэтому домен меняется одной правкой `.env`.

```bash
docker compose -f docker-compose.prod.yml logs -f
```

## CI и деплой

- `.github/workflows/ci.yml` — на каждый push и pull request: типы, линт,
  формат, сборка и сборка Docker-образа.
- `.github/workflows/deploy.yml` — запускается вручную, заходит по SSH на
  сервер, подтягивает изменения и пересобирает контейнеры. Нужны секреты
  репозитория `SSH_HOST`, `SSH_USER`, `SSH_KEY`.

## Структура

```
portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/          локаль в пути: layout, страница, 404, og-картинка
│   │   ├── api/health/        эндпоинт живости для Docker и Nginx
│   │   ├── global-not-found.tsx   404 для адресов вне локалей
│   │   ├── sitemap.ts, robots.ts
│   │   └── globals.css        дизайн-система: токены и слои
│   ├── components/
│   │   ├── layout/            шапка, футер, прелоадер, фон
│   │   ├── sections/          первый экран, лента, услуги, кейсы, подход, контакты
│   │   ├── cases/             мокап телефона и экраны мини-аппов
│   │   └── ui/                кнопка, бейдж, заголовок секции, появление, магнит
│   ├── content/               ссылки, проекты, стек
│   ├── i18n/                  словари RU и EN
│   └── lib/                   утилиты и параметры анимации
├── infra/nginx/               http.conf и шаблон с TLS
├── Dockerfile                 deps → dev → builder → runner
├── docker-compose.yml         прод без HTTPS
├── docker-compose.dev.yml     разработка с горячей перезагрузкой
└── docker-compose.prod.yml    прод с HTTPS и автопродлением сертификата
```
