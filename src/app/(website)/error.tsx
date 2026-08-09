"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <div className="mb-6 text-6xl">⚠️</div>
      <h2 className="mb-4 text-2xl font-bold text-white">Something went wrong</h2>
      <p className="mb-8 text-zinc-400">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-500"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
