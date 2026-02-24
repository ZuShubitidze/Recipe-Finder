"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "../ui/field";
import { Input } from "../ui/input";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { syncSession } from "@/lib/auth-client";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setError(false);

    try {
      // Ensure the client-side SDK remembers the user across refreshes
      await setPersistence(auth, browserLocalPersistence);

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const success = await syncSession(userCredentials.user);

      if (success) {
        router.push("/");
        router.refresh();
        console.log("User logged in");
      }
    } catch (error: any) {
      console.log("Login Error:", error.message);
      setError(true);
    }
  }
  // In case of an error, show a message with a link to the login page
  if (error)
    return (
      <div className="text-red-500">
        Login failed. Please <Link href="/login">try again.</Link>
      </div>
    );

  return (
    // <form onSubmit={(e) => handleLogin(e, email, password)}>
    <form onSubmit={handleSubmit}>
      <Field>
        <FieldGroup className="mb-10 items-center">
          <FieldLegend>Login Form</FieldLegend>
          <FieldDescription>
            Enter your email and password to log in.
          </FieldDescription>
        </FieldGroup>
        <FieldGroup>
          {/* Email */}
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password */}
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
          />
          <Button type="submit">Login</Button>
        </FieldGroup>
      </Field>
    </form>
  );
};

export default LoginForm;
