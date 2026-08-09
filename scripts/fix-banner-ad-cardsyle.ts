#!/usr/bin/env tsx
/**
 * Migration: Remove nativeContent from banner ads (html_banner templateType)
 * and fix any nativeContent.cardStyle values not in the valid enum.
 *
 * Usage:
 *   npx tsx scripts/fix-banner-ad-cardsyle.ts
 */
import "dotenv/config";
import mongoose from "mongoose";

const DB_NAME = "cockpittravel-db";

const VALID_CARD_STYLES = new Set([
  "news-grid", "sidebar-list", "sidebar-featured", "latest-articles",
  "hero-side", "review-list", "carousel", "most-viewed", "social-card",
  "popular-articles", "travel-intel", "top-destinations", "sidebar-tabs",
  "top-flights", "article-inline", "related-articles", "sidebar-ad",
]);

const adSnippetSchema = new mongoose.Schema({}, { strict: false, collection: "adsnippets", timestamps: true });
const AdSnippet = mongoose.model("AdSnippet", adSnippetSchema);

async function connectToDB() {
  const MONGO_URI = process.env.MONGO_URI || "";
  let uri = MONGO_URI;
  if (!uri.includes(`/${DB_NAME}`)) {
    const base = uri.split("?")[0].replace(/\/+$/, "");
    const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
    uri = `${base}/${DB_NAME}${params}`;
  }
  console.log(`[fix] connecting to: ${DB_NAME}`);
  await mongoose.connect(uri, { bufferCommands: false });
}

async function main() {
  await connectToDB();

  // 1. Remove nativeContent from all html_banner ads
  const bannerResult = await AdSnippet.updateMany(
    { templateType: "html_banner", "nativeContent.cardStyle": { $exists: true } },
    { $unset: { nativeContent: "" } }
  );
  console.log(`[fix] removed nativeContent from ${bannerResult.modifiedCount} banner ads`);

  // 2. Fix native_feed ads with invalid cardStyle
  const allNative = await AdSnippet.find({ templateType: "native_feed" }).lean();
  let fixed = 0;
  for (const ad of allNative) {
    const nc = (ad as any).nativeContent;
    if (nc?.cardStyle && !VALID_CARD_STYLES.has(nc.cardStyle)) {
      console.log(`[fix] "${(ad as any).name}": cardStyle "${nc.cardStyle}" → "news-grid"`);
      await AdSnippet.updateOne(
        { _id: ad._id },
        { $set: { "nativeContent.cardStyle": "news-grid" } }
      );
      fixed++;
    }
  }
  console.log(`[fix] corrected ${fixed} native ads with invalid cardStyle`);

  await mongoose.disconnect();
  console.log("[fix] done");
}

main().catch((err) => {
  console.error("[fix] fatal error:", err);
  process.exit(1);
});
