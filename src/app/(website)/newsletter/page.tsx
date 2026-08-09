"use client";

import { useState } from "react";
import { useTranslations } from "@/hooks/useTranslations";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [priceDrops, setPriceDrops] = useState(false);
  const [verdictChanges, setVerdictChanges] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const tNewsletter = useTranslations("newsletter");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          alertPreferences: { priceDrops, verdictChanges },
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || tNewsletter("youSubscribed"));
      } else {
        setStatus("error");
        setMessage(data.error || tNewsletter("failedToSubscribe"));
      }
    } catch {
      setStatus("error");
      setMessage(tNewsletter("unexpectedError"));
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-bold text-white">{tNewsletter("stayInTheLoop")}</h1>
      <p className="mb-8 text-zinc-400">
        {tNewsletter("newsletterDescription")}
      </p>

      {status === "success" ? (
        <div className="rounded-xl border border-emerald-800/50 bg-emerald-900/20 p-8 text-center">
          <div className="mb-4 text-4xl">✉️</div>
          <h2 className="mb-2 text-xl font-bold text-emerald-400">{tNewsletter("youSubscribed")}</h2>
          <p className="text-sm text-zinc-400">
            Please check your email to confirm your subscription (double opt-in required).
            You will receive price-drop and verdict-change alerts based on your preferences.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <fieldset className="rounded-lg border border-zinc-700 p-4">
            <legend className="px-2 text-sm font-medium text-zinc-300">Alert Preferences</legend>
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={priceDrops}
                  onChange={(e) => setPriceDrops(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 text-indigo-500"
                />
                Price-Drop Alerts
              </label>
              <label className="flex items-center gap-3 text-sm text-zinc-400">
                <input
                  type="checkbox"
                  checked={verdictChanges}
                  onChange={(e) => setVerdictChanges(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-700 text-indigo-500"
                />
                Verdict-Change Alerts
              </label>
            </div>
          </fieldset>

          {status === "error" && (
            <p className="text-sm text-red-400">{message}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-500 disabled:opacity-50"
          >
            {status === "loading" ? tNewsletter("subscribing") : tNewsletter("subscribeNow")}
          </button>

          <p className="text-xs text-zinc-500">
            Double opt-in required. You can unsubscribe at any time. We only store your email,
            locale, and alert preferences. See our Privacy Policy for details.
          </p>
        </form>
      )}
    </main>
  );
}
