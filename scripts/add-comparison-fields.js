/**
 * Migration: Add v2.0 comparison fields to existing articles.
 * Safe, idempotent — only adds fields with defaults, never removes existing data.
 *
 * Usage: npx tsx scripts/add-comparison-fields.js
 */
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_URI?.split("/").pop()?.split("?")[0] || "montelo_agency";

async function migrate() {
  if (!MONGO_URI) {
    console.error("MONGO_URI not set. Aborting.");
    process.exit(1);
  }

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const articles = db.collection("articles");

    const count = await articles.countDocuments({});
    console.log(`Found ${count} articles. Applying v2.0 field migration...`);

    // Add defaults for all new fields — $setOnInsert won't work for existing docs,
    // so we use updateMany with $set only where the field is missing.
    const updates = [
      { $set: { content_type: { $ifNull: ["$content_type", "article"] } } },
      { $set: { "entity_A.name": { $ifNull: ["$entity_A.name", ""] } } },
      { $set: { "entity_A.image": { $ifNull: ["$entity_A.image", ""] } } },
      { $set: { "entity_A.priceRange": { $ifNull: ["$entity_A.priceRange", ""] } } },
      { $set: { "entity_A.offerId": { $ifNull: ["$entity_A.offerId", ""] } } },
      { $set: { "entity_B.name": { $ifNull: ["$entity_B.name", ""] } } },
      { $set: { "entity_B.image": { $ifNull: ["$entity_B.image", ""] } } },
      { $set: { "entity_B.priceRange": { $ifNull: ["$entity_B.priceRange", ""] } } },
      { $set: { "entity_B.offerId": { $ifNull: ["$entity_B.offerId", ""] } } },
      { $set: { verdict_winner: { $ifNull: ["$verdict_winner", ""] } } },
      { $set: { spec_comparison_matrix: { $ifNull: ["$spec_comparison_matrix", []] } } },
      { $set: { pros_cons_A: { $ifNull: ["$pros_cons_A", []] } } },
      { $set: { pros_cons_B: { $ifNull: ["$pros_cons_B", []] } } },
      { $set: { when_loser_wins: { $ifNull: ["$when_loser_wins", []] } } },
      { $set: { page_class: { $ifNull: ["$page_class", "support"] } } },
      { $set: { structural_blocks: { $ifNull: ["$structural_blocks", { question_answered: "", context: "", comparison: "", action: "" }] } } },
      { $set: { reviewer: { $ifNull: ["$reviewer", ""] } } },
      { $set: { methodology_ref: { $ifNull: ["$methodology_ref", ""] } } },
      { $set: { affiliate_offer_ids: { $ifNull: ["$affiliate_offer_ids", []] } } },
      { $set: { locale: { $ifNull: ["$locale", "en"] } } },
      { $set: { hreflang_group_id: { $ifNull: ["$hreflang_group_id", ""] } } },
    ];

    // Run all updates in a single bulk operation for efficiency
    const bulkOps = updates.map((update) => ({
      updateMany: {
        filter: {},
        update,
        upsert: false,
      },
    }));

    const result = await articles.bulkWrite(bulkOps, { ordered: false });
    console.log(`Migration complete. Modified: ${result.modifiedCount} documents.`);

    // Create new indexes
    await articles.createIndex({ content_type: 1 });
    await articles.createIndex({ page_class: 1 });
    await articles.createIndex({ refresh_due_date: 1 });
    console.log("Indexes created.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrate();
