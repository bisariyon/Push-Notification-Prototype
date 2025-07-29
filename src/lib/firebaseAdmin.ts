import admin from "firebase-admin";
import path from "path";
import fs from "fs";

// Singleton Firebase Admin setup
if (!admin.apps.length) {
  const serviceAccountPath = path.join(process.cwd(), "server", "fcm-service-account.json");
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
