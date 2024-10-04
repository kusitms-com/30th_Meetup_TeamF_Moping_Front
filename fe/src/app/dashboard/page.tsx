"use client";

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';  

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/');  
  }

  if (status === 'loading') {
    return <div>Loading...</div>; 
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

  return null;  
}
