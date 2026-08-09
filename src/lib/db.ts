import mongoose from "mongoose";
import { getEnv } from "@/lib/env";

type Cached = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // Persists the connection across HMR re-executions in dev mode
  var _mongoose: Cached | undefined;
}

// Reuse the existing connection object across module re-imports (connection pooling)
const cached: Cached = global._mongoose ?? { conn: null, promise: null };
global._mongoose = cached;

// Database name — matches the database specified in MONGO_URI
const DB_NAME = "cockpittravel-db";

export async function connectDB() {
  const { MONGO_URI, USE_DATABASE } = getEnv();

  // USE_DATABASE=false lets the app boot without a DB (e.g., for UI-only dev work)
  if (USE_DATABASE === "false") {
    return null;
  }

  // Return existing connection if it's still alive
  if (cached.conn) return cached.conn;

  // Initiate connection only once; subsequent callers await the same promise
  if (!cached.promise) {
    // If MONGO_URI doesn't contain a database name, append it
    let uri = MONGO_URI;
    if (!uri.includes("/cockpittravel-db")) {
      // Remove trailing slash and query params, add database name
      const base = uri.split("?")[0].replace(/\/+$/, "");
      const params = uri.includes("?") ? "?" + uri.split("?")[1] : "";
      uri = `${base}/${DB_NAME}${params}`;
    }

    cached.promise = mongoose.connect(uri, {
      bufferCommands: false, // Fail fast instead of queuing commands when not connected
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
