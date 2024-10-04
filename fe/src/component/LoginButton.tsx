import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { authOptions } from "@/app/api/auth/authOptions";

export default async function LoginButton() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div>
        <p>Logged in as {session.user?.name}</p>
        <form method="post" action="/api/auth/signout">
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => signIn("naver")}>
      Sign in with Naver
    </button>
  );
}
