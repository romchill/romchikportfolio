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
  },
  hero: {
    badge: "Available for work",
    line1: "TELEGRAM",
    line2: "MINI APPS",
    tagline: "built end to end",
    lead: "I'm Roma. I build apps that live inside Telegram: someone taps a button in a bot and lands straight in the interface — no install, no sign-up, no passwords.",
    lead2:
      "I take the whole project: screens, server, database, Stars payments, deployment to a VPS and support after launch. No need to hire a frontend dev, a backend dev and someone who knows Docker separately.",
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
  approach: {
    eyebrow: "approach",
    title: "How it works",
    paragraphs: [
      "A mini app is not a website opened inside Telegram. It's a separate kind of product with its own rules: no address bar, no tabs, no patience for loading. If the first screen stalls, there is no second screen — the person closes the window and goes back to the chat.",
      "So I don't start with design. I start by asking which single action the person opens the app for. Everything else is built around it, and extra screens get cut before anyone writes them. The project ends up smaller, cheaper and shipping sooner.",
      "After that it's ordinary engineering with no magic: typed code, validation of everything from outside, database migrations instead of manual edits, tests on the money paths, and a compose file that brings the whole thing up with one command on any machine.",
    ],
    points: [
      {
        title: "One language for API and bot",
        text: "TypeScript or Python across the whole project. Logic doesn't drift between services, and nothing has to be written twice.",
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
