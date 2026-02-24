import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export default async function ProfilePage() {
  const sessionCookie = (await cookies()).get("AuthToken")?.value;

  // Server side check for session cookie
  try {
    // Verify session cookie with Admin SDK
    const decodedToken = await adminAuth.verifySessionCookie(
      sessionCookie || "",
    );
    const user = await adminAuth.getUser(decodedToken.uid);
    console.log("Authenticated user:", user);

    return <h1>Welcome, {user.displayName || user.email}!</h1>;
  } catch (error: any) {
    return <p>Please log in to view your profile.</p>;
  }
}
