import LoginButton from "@/component/NaverLoginButton";

export default function Home() {
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!redirectUri) {
    throw new Error(
      "Redirect URI is not defined in the environment variables.",
    );
  }

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <p>Please login using Naver:</p>
      <LoginButton redirectUri={redirectUri} />
    </div>
  );
}
