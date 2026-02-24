"use client";

import React from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
} from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { auth } from "@/lib/firebase";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { syncSession } from "@/lib/auth-client";

const RegisterForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await setPersistence(auth, browserLocalPersistence);

      // Create user
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const success = await syncSession(userCredentials.user);
      if (success) {
        router.push("/");
        router.refresh();
      }
      console.log("User registered:", userCredentials.user);
    } catch (error: any) {
      console.log("Register Error:", error.message);
    }
  };

  return (
    <form onSubmit={(e) => handleRegister(e)}>
      <Field>
        <FieldGroup className="mb-10 items-center">
          <FieldLegend>Register Form</FieldLegend>
          <FieldDescription>
            Enter your email and password to register.
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
          />
          <Button type="submit">Register</Button>
        </FieldGroup>
      </Field>
    </form>
  );
};

export default RegisterForm;
