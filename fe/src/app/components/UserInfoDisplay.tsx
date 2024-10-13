interface UserInfoProps {
  name?: string;
  email?: string;
}

export default function UserInfoDisplay({ name, email }: UserInfoProps) {
  return (
    <div>
      <h1>Welcome, {name}</h1>
      <p>Email: {email}</p>
    </div>
  );
}
