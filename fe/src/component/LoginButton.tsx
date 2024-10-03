"use client";  // 클라이언트 컴포넌트로 설정

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();  // 클라이언트 컴포넌트에서만 사용 가능

  if (session) {
    return (
      <div>
        <p>Logged in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn('naver')}>
      Sign in with Naver
    </button>
  );
}
