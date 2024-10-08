"use client";

import { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  email: string;
}

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch("/api/userinfo");
      const data = await response.json();
      setUserInfo(data);
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userInfo ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
