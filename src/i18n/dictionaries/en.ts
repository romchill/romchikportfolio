import type { Dictionary } from "./ru";

export const en: Dictionary = {
  meta: {
    title: "Romchik — Telegram Mini Apps development",
    description:
      "End-to-end Telegram Mini Apps and bots: interface, backend, Telegram Stars payments, deployment.",
  },
  nav: {
    services: "Services",
    cases: "Work",
    process: "Approach",
    contact: "Contact",
  },
  cta: {
    write: "Message me",
    order: "Start a project",
    cases: "See the work",
  },
  preloader: {
    label: "Loading",
  },
  a11y: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Switch language",
    toTop: "Back to top",
    skip: "Skip to content",
  },
  hero: {
    badge: "Available for work",
    line1: "TELEGRAM",
    line2: "MINI APPS",
    tagline: "built end to end",
    lead: "I'm Roma. I build apps that live inside Telegram: someone taps a button in a bot and lands straight in the interface — no install, no sign-up, no passwords.",
    lead2:
      "I take the whole project: screens, server, database, Stars payments, deployment to a VPS and support after launch. No need to hire a frontend dev, a backend dev and someone who knows Docker separately. I build with a model alongside me, so timelines are shorter than usual and the price is lower.",
    stats: [
      { value: "2", label: "live projects in Telegram" },
      { value: "Fullstack", label: "interface, server, database, bot" },
      { value: "Docker", label: "deployment and upkeep on me" },
    ],
    scroll: "Scroll down",
  },
  services: {
    eyebrow: "services",
    title: "What I do",
    description:
      "Four areas that usually come as a set. You can take one, but most projects arrive whole — from the first screen to the server that serves it.",
    items: [
      {
        icon: "app",
        title: "Telegram Mini Apps",
        text: "A real app inside the messenger. It opens from a button, inherits the user's theme and feels like part of Telegram rather than a website in a frame.",
        bullets: [
          "initData auth — no passwords, no sign-up",
          "Light and dark themes out of the box",
          "Telegram Stars payments",
          "Haptics, gestures, swipes",
        ],
      },
      {
        icon: "bot",
        title: "Telegram bots",
        text: "A bot as the entry point to a mini app and as a product of its own: flows, broadcasts, payments, an admin panel and scheduled notifications.",
        bullets: [
          "aiogram on Python, grammY on TypeScript",
          "Webhooks on a secret path, not polling",
          "Payments, subscriptions and renewals",
          "Reminders and deferred jobs",
        ],
      },
      {
        icon: "server",
        title: "Backend and data",
        text: "A server that survives a rush of users and never loses an order. Typed API, honest migrations, validation of everything arriving from outside.",
        bullets: [
          "Fastify and FastAPI",
          "PostgreSQL with migrations, not manual edits",
          "Input validation at the boundary",
          "Tests on the money paths",
        ],
      },
      {
        icon: "deploy",
        title: "Deployment and support",
        text: "A project doesn't end at the code. I package it in Docker, put it on a server, close it behind HTTPS and leave instructions anyone can follow.",
        bullets: [
          "Docker and compose: dev and prod kept apart",
          "Nginx or Caddy, Let's Encrypt certificate",
          "Nightly database backups",
          "Logs, healthchecks, restart on failure",
        ],
      },
    ],
  },
  cases: {
    eyebrow: "work",
    title: "Already running",
    description:
      "Two projects live in Telegram right now. Both built entirely by me: interface, server, database, bot, payments and deployment.",
    openInTelegram: "Open in Telegram",
    stackLabel: "Stack",
    items: [
      {
        slug: "promt-shop",
        title: "Prompt store",
        tagline: "Mini App · paid in Stars",
        text: "A storefront of ready-made prompts for Claude, ChatGPT, DeepSeek and Alice. You open the shop from the bot, pick a prompt, pay in Stars — and the text opens right away, with no waiting and no messaging a seller.",
        features: [
          "Catalogue with search, categories and a filter by model",
          "Telegram Stars checkout: two taps, no cards involved",
          "Purchased prompts stay in «My purchases» forever",
          "Admin panel: items, prices, sales stats",
          "Production build: read-only containers, strict CSP, HSTS",
          "Nightly database backups delivered to Telegram",
        ],
      },
      {
        slug: "podsekay",
        title: "Podsekay",
        tagline: "Mini App · for Russian Fishing 4",
        text: "A companion for Russian Fishing 4 players. It measures how profitable a session is while it happens: how much silver per hour a spot brings, how much went on bait, and whether the spot is worth staying on. The phone sits next to the keyboard and finally earns its place.",
        features: [
          "Live tracker for RF4: silver per hour, weight and bait spend",
          "Add a catch from a screenshot — a vision model reads it",
          "Bait and PVA timers with notifications straight to Telegram",
          "History of sessions and spot-to-spot comparison",
          "A result card ready to share in a chat",
          "Session planner and a PRO subscription via Telegram Stars",
        ],
      },
    ],
  },
  mockups: {
    promtShop: {
      screens: {
        catalog: "Catalogue",
        product: "Prompt",
        hub: "Account",
        generate: "Build a prompt",
      },
      search: "Search prompts",
      chips: ["All", "Vibecoding", "Writing", "Work"],
      tiles: [
        {
          emoji: "💻",
          title: "Code review like a senior engineer",
          price: "149",
          models: "Claude · ChatGPT",
          rating: "4.9",
        },
        {
          emoji: "✍️",
          title: "A post from a raw thought",
          price: "89",
          models: "Claude",
          rating: "4.8",
        },
        {
          emoji: "💼",
          title: "Meeting notes into minutes",
          price: "89",
          models: "ChatGPT · DeepSeek",
          rating: "4.7",
        },
        {
          emoji: "📚",
          title: "A topic explained until it clicks",
          price: "79",
          models: "Claude · Alice",
          rating: "5.0",
        },
      ],
      mainCatalog: "Open prompt",
      product: {
        summary: "Finds real mistakes instead of nitpicking formatting",
        tags: ["Claude", "ChatGPT", "Vibecoding"],
        rating: "★ 4.9 · 37",
        previewLabel: "Start of the prompt",
        preview:
          "You are a senior engineer reviewing a change. Read all of it, find what will break production, and separate that from taste…",
        note: "The full text opens the moment you pay",
        main: "Buy for 149 ⭐",
      },
      hub: {
        rows: [
          { title: "Cart", subtitle: "2 prompts · 238 ⭐" },
          { title: "Build a prompt", subtitle: "A model writes the text for your task" },
          { title: "My purchases", subtitle: "Bought prompts and their texts" },
        ],
        docsLabel: "Documents",
        docs: { title: "Purchase terms", subtitle: "What you buy, how refunds work" },
        main: "Open catalogue",
      },
      generate: {
        hint: "Describe the task in your own words — the model builds a prompt for it",
        placeholder: "I need a prompt that reviews my landing page and says where the copy fails…",
        categoryLabel: "Category",
        chips: ["Marketing", "Writing", "Vibecoding"],
        note: "Don't like it — nothing to pay for",
        main: "Build a prompt",
      },
    },
    podsekay: {
      screens: {
        home: "Fishing companion",
        tracker: "Session",
        add: "Add a catch",
        timers: "Timers",
      },
      home: {
        levelLabel: "level",
        level: "27",
        silverLabel: "silver",
        silver: "412 900",
        gameTimeLabel: "in-game time",
        gameTime: "04:20",
        realTimeLabel: "real",
        realTime: "21:15",
        planTitle: "Plan for today",
        planNote: "Where to go and what pays off",
        planBadge: "PRO",
        recentLabel: "Recent sessions",
        recent: [
          { place: "Lake Ladoga", rate: "12 840", time: "2 h 10 m" },
          { place: "Volkhov river", rate: "9 410", time: "1 h 35 m" },
        ],
        main: "Start fishing",
      },
      tracker: {
        rateLabel: "silver per hour",
        rate: "12 840",
        stats: [
          { label: "session", value: "01:47" },
          { label: "weight", value: "24.6" },
          { label: "bait", value: "340" },
        ],
        catchLabel: "Caught",
        catches: [
          { name: "Zander", weight: "4.2 kg", price: "820", tag: "trophy" },
          { name: "Bream", weight: "2.8 kg", price: "410", tag: "counted" },
          { name: "Perch", weight: "0.9 kg", price: "150", tag: "" },
        ],
        secondary: "Finish",
        main: "+ Catch",
      },
      add: {
        tabs: ["By hand", "From a screenshot"],
        dropTitle: "Screenshot from the game",
        dropNote: "The model reads the fish, weight and price itself",
        recognizedLabel: "Recognised",
        fish: "Zander",
        weight: "4.2 kg",
        price: "820",
        tagLabel: "Tag",
        tags: ["counted", "trophy", "rare"],
        main: "Add catch",
      },
      timers: {
        items: [
          { name: "Groundbait", left: "12:40", progress: "62%" },
          { name: "PVA", left: "03:15", progress: "18%" },
          { name: "Water ticket", left: "41:02", progress: "84%" },
        ],
        hint: "The alert reaches the bot even with the app closed",
        main: "Add timer",
      },
    },
  },
  notFound: {
    title: "This page is missing",
    text: "There is no such page — the link may be outdated or the address has a typo. Everything is in place on the home page: services, work and contact.",
    cta: "Go home",
  },
  contact: {
    eyebrow: "contact",
    badge: "Available for work",
    line1: "YOUR IDEA?",
    line2: "TEXT ME",
    text: "Describe in a couple of sentences what you want to build — I'll tell you whether it works inside Telegram, how long it takes and what it costs. If it isn't my kind of task, I'll say so instead of wasting your time.",
    text2:
      "I reply within a day. If it's urgent, say so and we'll move faster. Talking costs nothing: you can simply ask whether a mini app makes sense for your case at all.",
    cta: "Message me on Telegram",
    handleLabel: "direct messages",
    copy: "Copy",
    copied: "Copied",
  },
  footer: {
    built: "Built with Next.js, Tailwind and Docker",
    toTop: "Back to top",
  },
  approach: {
    eyebrow: "approach",
    title: "How it works",
    paragraphs: [
      "A mini app is not a website opened inside Telegram. It's a separate kind of product with its own rules: no address bar, no tabs, no patience for loading. If the first screen stalls, there is no second screen — the person closes the window and goes back to the chat.",
      "So I don't start with design. I start by asking which single action the person opens the app for. Everything else is built around it, and extra screens get cut before anyone writes them. The project ends up smaller, cheaper and shipping sooner.",
      "A model speeds the build up. The routine — standard screens, plumbing, migrations, tests — it writes faster than I do, and that saves the project weeks. The decisions stay mine: what we build, how it works inside, where the security boundaries are and what actually ships. Code I did not understand does not go into the project.",
      "After that it's ordinary engineering with no magic: typed code, validation of everything from outside, database migrations instead of manual edits, tests on the money paths, and a compose file that brings the whole thing up with one command on any machine.",
    ],
    points: [
      {
        title: "One language for API and bot",
        text: "TypeScript or Python across the whole project. Logic doesn't drift between services, and nothing has to be written twice.",
      },
      {
        title: "I build with AI",
        text: "No secret and nothing to be shy about: the model writes the routine, I keep the architecture, the security and the review. That is why a mini app costs less and ships sooner than one assembled by hand from scratch.",
      },
      {
        title: "Secrets stay out of the code",
        text: "Environment variables, initData verified by HMAC with the bot token, rate limiting and a strict CSP. The token never reaches the repository.",
      },
      {
        title: "Handed over documented",
        text: "README, deployment guide and a list of commands. The project can be passed to another developer without a half-day walkthrough.",
      },
      {
        title: "I stay reachable",
        text: "After launch I stay on the project: fixing what real users surface and adding features as it grows.",
      },
    ],
  },
};
