import admin from "firebase-admin";
// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
    console.log("Firebase Admin Initialized ✅");
  } catch (error) {
    console.error("Firebase Admin Error ❌:", error);
  }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
