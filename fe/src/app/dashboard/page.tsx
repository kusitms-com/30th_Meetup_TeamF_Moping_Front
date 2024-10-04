// src/app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";

interface UserSession {
  user: {
    name: string;
    email: string;
  };
}

export default function Dashboard() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const data = await response.json();
        setSession(data.session);
      } catch (err) {
        const errorMessage = (err as Error).message; // err를 사용
        setError(errorMessage);
      }
    };

    fetchSession();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!session) {
    return <div>Loading session...</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
