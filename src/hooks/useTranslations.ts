"use client";

import { useLocale } from "./useLocale";

type Messages = Record<string, any>;

let cachedMessages: Record<string, Messages> = {};

function getMessages(locale: string): Messages {
  if (cachedMessages[locale]) return cachedMessages[locale];

  try {
    const mod = require(`@/messages/${locale}.json`);
    cachedMessages[locale] = mod.default || mod;
  } catch {
    cachedMessages[locale] = {};
  }

  return cachedMessages[locale];
}

function resolveKey(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) as
    | string
    | undefined;
}

export function useTranslations(namespace?: string) {
  const locale = useLocale();
  const messages = getMessages(locale);

  return (key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return resolveKey(messages, fullKey) || resolveKey(messages, key) || key;
  };
}
