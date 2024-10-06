"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // 세션을 로딩 중일 때 처리
  }

  if (session) {
    return (
      <div>
        <p>Logged in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => signIn("naver")}>Sign in with Naver</button>
      <button onClick={() => signIn("kakao")}>Sign in with Kakao</button>
    </div>
  );
}
