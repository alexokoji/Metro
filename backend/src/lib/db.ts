import mongoose from "mongoose";

declare global {
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

function connect(uri: string) {
  return mongoose.connect(uri);
}

async function connectWithDevFallback(): Promise<typeof mongoose> {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/primesolutions";

  try {
    return await connect(mongoUri);
  } catch (err) {
    if (process.env.NODE_ENV === "production") throw err;

    console.error("Failed to connect to MongoDB at", mongoUri);
    console.error(err instanceof Error ? err.message : err);
    console.log("Starting in-memory MongoDB for development...");

    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    return connect(mongod.getUri());
  }
}

// Cached across invocations (and across Next dev hot-reloads via `global`) so
// serverless function calls reuse one connection instead of exhausting the pool.
export default function dbConnect(): Promise<typeof mongoose> {
  if (!global._mongooseConn) {
    global._mongooseConn = connectWithDevFallback();
  }
  return global._mongooseConn;
}
