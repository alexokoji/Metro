/**
 * One-off admin seeding, replacing the old Express server's seed-on-every-boot
 * behavior (not appropriate for serverless functions). Run manually:
 *   npm run seed-admin
 */
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../src/models/User";

try {
  process.loadEnvFile(".env");
} catch {
  // .env is optional if the vars are already in the environment
}

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI is not set");
    process.exit(1);
  }
  if (!adminEmail || !adminPassword) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD not set");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);

  const existing = await User.findOne({ email: adminEmail }).lean();
  const hashed = await bcrypt.hash(adminPassword, 10);

  if (existing) {
    await User.updateOne({ email: adminEmail }, { password: hashed, isAdmin: true });
    console.log("Updated admin credentials for:", adminEmail);
  } else {
    const admin = new User({ email: adminEmail, password: hashed, isAdmin: true });
    await admin.save();
    console.log("Seeded new admin user:", adminEmail);
  }

  await mongoose.disconnect();
}

seedAdmin().catch((err) => {
  console.error("Failed to seed admin user:", err instanceof Error ? err.message : err);
  process.exit(1);
});
