/**
 * Backfill locale field on existing articles and categories.
 * Run once: npx tsx scripts/backfill-locale.ts
 */
import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

async function run() {
  if (!MONGO_URI) {
    console.error("MONGO_URI not set. Run with: MONGO_URI=... npx tsx scripts/backfill-locale.ts");
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db!;

  // Backfill articles
  const articles = await db.collection("articles").updateMany(
    { locale: { $exists: false } },
    { $set: { locale: "en" } }
  );
  console.log(`Articles updated: ${articles.modifiedCount} (matched: ${articles.matchedCount})`);

  // Backfill categories
  const categories = await db.collection("simplecategories").updateMany(
    { locale: { $exists: false } },
    { $set: { locale: "en" } }
  );
  console.log(`Categories updated: ${categories.modifiedCount} (matched: ${categories.matchedCount})`);

  // Backfill comparisons
  const comparisons = await db.collection("comparisons").updateMany(
    { locale: { $exists: false } },
    { $set: { locale: "en" } }
  );
  console.log(`Comparisons updated: ${comparisons.modifiedCount} (matched: ${comparisons.matchedCount})`);

  await mongoose.disconnect();
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
