"use client";

import Link from "next/link";
import { ModeToggle } from "../theme/mode-toggle";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { LogoutButton } from "../auth/LogoutButton";

const Navbar = () => {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <nav className="h-16" />;

  return (
    <nav className="flex flex-col md:flex-row justify-between gap-4 mx-6 md:mx-20 my-10 text-3xl font-bold">
      <div className="flex flex-row justify-center gap-6 md:gap-40">
        <Link href="/">Home</Link>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-20 items-center">
        {user ? (
          <div className="flex flex-row justify-center gap-6 md:gap-20">
            <Link href="/profile">Profile</Link>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex flex-row justify-center gap-6 md:gap-20">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
