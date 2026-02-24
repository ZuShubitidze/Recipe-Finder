"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Sign out from Firebase Client SDK
      await signOut(auth);

      // Clear the server-side cookie via your API
      await fetch("/api/logout", { method: "POST" });

      // Wipe the router cache and redirect
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Log Out
    </Button>
  );
};
