"use client";

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';  // 새로운 App Router 방식의 라우팅

export default function Dashboard() {
  const { data: session, status } = useSession();

  // 로그인되지 않은 경우, 메인 페이지로 리다이렉트
  if (status === 'unauthenticated') {
    redirect('/');  // 로그인이 안된 경우, 메인 페이지로 리다이렉트
  }

  if (status === 'loading') {
    return <div>Loading...</div>;  // 세션 정보를 불러오는 중일 때 로딩 메시지 표시
  }

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user?.email}!</h1>
        <p>You are logged in.</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return null;  // 세션이 없는 경우
}
