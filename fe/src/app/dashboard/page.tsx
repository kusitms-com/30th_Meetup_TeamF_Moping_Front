import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
    return null;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.email}!</h1>
      <p>You are logged in.</p>
      <form method="post" action="/api/auth/signout">
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
