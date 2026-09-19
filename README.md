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

Собрать можно двумя способами:

```bash
npm run build          # сервер для Docker
```

```bash
npm run build:static   # папка out/ для бесплатного хостинга
```

`npm run check` прогоняет `typecheck` → `lint` → `build`. Отдельно есть `npm run format`
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

## Выкладка: бесплатно на Cloudflare Pages

Сайт целиком статический — 2.3 МБ готовых файлов. Серверу нечего выполнять,
поэтому хостинг ничего не стоит: платишь только за домен.

### 1. Купить домен

Любой регистратор, ~250 ₽ за первый год в зоне `.ru`.

### 2. Подключить репозиторий

На [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** →
**Create** → **Pages** → **Connect to Git** → выбрать `romchikportfolio`.

Настройки сборки:

| Поле                   | Значение                                      |
| ---------------------- | --------------------------------------------- |
| Framework preset       | None                                          |
| Build command          | `npm run build:static`                        |
| Build output directory | `out`                                         |
| Переменная окружения   | `NEXT_PUBLIC_SITE_URL` = `https://твой-домен` |

Переменную задать **до первой сборки**: адрес запекается в canonical,
`og:url` и карту сайта. Забыл — просто пересобери (Deployments → Retry).

### 3. Привязать домен

В проекте → **Custom domains** → **Set up a domain** → ввести домен.
Cloudflare сам выпустит сертификат и включит HTTPS.

Корень `/` уводит на `/ru` файлом `public/_redirects`, а на хостингах без
его поддержки — страничкой `public/index.html`.

### 4. Дальше само

Каждый пуш в `main` пересобирает и выкатывает сайт. Pull request получает
свой адрес для предпросмотра.

## Выкладка: свой сервер

Нужен, если однажды понадобится настоящий сервер — форма заявок с записью
в базу, админка или бот на том же домене. До тех пор статики достаточно.

Пошагово, от пустого VPS до работающего сайта на своём домене.
Сборка образа идёт в GitHub Actions, поэтому серверу хватает 1 ГБ памяти:
`next build` съедает под 2 ГБ, и на дешёвом тарифе он бы не собрался.

### 1. Что купить

| Что         | Ориентир по цене  | Требования                          |
| ----------- | ----------------- | ----------------------------------- |
| Домен `.ru` | ~250 ₽ первый год | любой регистратор                   |
| VPS         | ~150–400 ₽/мес    | 1 ГБ RAM, 10 ГБ диска, Ubuntu 24.04 |

### 2. Направить домен на сервер

В панели регистратора добавить две A-записи на IP сервера:

```
@     A     123.45.67.89
www   A     123.45.67.89
```

Записи расходятся по интернету от нескольких минут до пары часов.
Проверить: `nslookup твой-домен`

### 3. Поставить Docker на сервер

```bash
ssh root@123.45.67.89
```

```bash
curl -fsSL https://get.docker.com | sh
```

### 4. Забрать проект

```bash
git clone https://github.com/romchill/romchikportfolio.git /opt/portfolio && cd /opt/portfolio
```

### 5. Прописать домен

```bash
cp .env.example .env && nano .env
```

Заполнить три строки:

```
NEXT_PUBLIC_SITE_URL=https://твой-домен
DOMAIN=твой-домен
CERTBOT_EMAIL=почта@для-уведомлений
```

Тот же адрес нужно положить в переменную репозитория на GitHub:
**Settings → Secrets and variables → Actions → Variables → New variable**,
имя `SITE_URL`, значение `https://твой-домен`. Адрес попадает в образ
на сборке, поэтому без него в карте сайта останется localhost.

### 6. Выпустить сертификат

Nginx не стартует без ключей, поэтому первый сертификат берём отдельно —
пока порт 80 свободен:

```bash
docker run --rm -p 80:80 -v portfolio_certbot-conf:/etc/letsencrypt -v portfolio_certbot-www:/var/www/certbot certbot/certbot certonly --standalone -d "$DOMAIN" -d "www.$DOMAIN" --email "$CERTBOT_EMAIL" --agree-tos --no-eff-email
```

Дальше сертификат продлевается сам — за это отвечает контейнер `certbot`.

### 7. Запустить

Образ уже собран в GitHub Actions и лежит в GHCR. Один раз сделай пакет
публичным, иначе сервер его не скачает: страница репозитория → **Packages**
→ `romchikportfolio` → **Package settings** → **Change visibility** → Public.

```bash
docker compose -f docker-compose.prod.yml pull web
```

```bash
docker compose -f docker-compose.prod.yml up -d
```

Готово — сайт открывается по HTTPS.

```bash
docker compose -f docker-compose.prod.yml logs -f
```

### 8. Включить автодеплой

Чтобы каждый пуш в `main` сам приезжал на сервер, заведи ключ:

```bash
ssh-keygen -t ed25519 -C github-deploy -f ~/.ssh/deploy -N ""
```

```bash
cat ~/.ssh/deploy.pub >> ~/.ssh/authorized_keys && cat ~/.ssh/deploy
```

И пропиши в репозитории, **Settings → Secrets and variables → Actions**:

| Тип      | Имя              | Значение                       |
| -------- | ---------------- | ------------------------------ |
| Secret   | `SSH_HOST`       | IP сервера                     |
| Secret   | `SSH_USER`       | `root` или твой пользователь   |
| Secret   | `SSH_KEY`        | всё содержимое `~/.ssh/deploy` |
| Variable | `DEPLOY_ENABLED` | `true`                         |
| Variable | `DEPLOY_PATH`    | `/opt/portfolio`               |

Пока `DEPLOY_ENABLED` не выставлена, шаг деплоя тихо пропускается — пуши
не будут падать из-за отсутствующего сервера.

### Что где лежит

| Сервис    | Роль                                                                     |
| --------- | ------------------------------------------------------------------------ |
| `web`     | Next standalone, не-root, файловая система только на чтение, healthcheck |
| `nginx`   | HTTP → HTTPS, TLS 1.2/1.3, HSTS с preload, gzip, кэш статики             |
| `certbot` | проверяет сертификат дважды в сутки и продлевает, когда подходит срок    |

Конфиг Nginx собирается из шаблона: `${DOMAIN}` подставляется при старте,
так что смена домена — это одна правка `.env` и перезапуск.

## CI и деплой

Статический хостинг собирает сайт сам, на GitHub Actions остаётся Docker-путь:

- `ci.yml` — на каждый push и pull request: типы, линт, формат, сборка.
  Образ дополнительно проверяется на pull request.
- `deploy.yml` — на push в `main`: собирает образ, кладёт в GHCR и, если
  включён `DEPLOY_ENABLED`, обновляет контейнеры на сервере по SSH.
  Можно запустить руками: **Actions → Deploy → Run workflow**.

## Структура

```
portfolio/
├── src/
│   ├── app/
│   │   ├── [locale]/          локаль в пути: layout, страница, 404, og-картинка
│   │   ├── api/health/        эндпоинт живости для Docker и Nginx
│   │   ├── global-not-found.tsx   404 для адресов вне локалей
│   │   ├── sitemap.ts, robots.ts, opengraph-image.png
│   │   └── globals.css        дизайн-система: токены и слои
│   ├── components/
│   │   ├── layout/            шапка, футер, прелоадер, фон
│   │   ├── sections/          первый экран, лента, услуги, кейсы, подход, контакты
│   │   ├── cases/             мокап телефона и экраны мини-аппов
│   │   └── ui/                кнопка, бейдж, заголовок секции, появление, магнит
│   ├── content/               ссылки, проекты, стек
│   ├── i18n/                  словари RU и EN
│   └── lib/                   утилиты и параметры анимации
├── public/                    _redirects и index.html: корень → /ru
├── infra/nginx/               http.conf и шаблон с TLS
├── Dockerfile                 deps → dev → builder → runner
├── docker-compose.yml         прод без HTTPS
├── docker-compose.dev.yml     разработка с горячей перезагрузкой
└── docker-compose.prod.yml    прод с HTTPS и автопродлением сертификата
```
