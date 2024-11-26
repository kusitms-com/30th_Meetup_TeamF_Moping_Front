"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";

type Profile = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function LoginPin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const profileId = searchParams.get("profileId");

  const [profile, setProfile] = useState<Profile | null>(null);
  const [password, setPassword] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const mockProfile: Profile = {
          id: Number(profileId),
          name: "John Doe",
          imageUrl: "/images/john.jpg",
        };

        setProfile(mockProfile); 
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  const handlePasswordSubmit = async () => {
    const fullPassword = password.join("");

    if (fullPassword.length !== 4) {
      setHasError(true);
      return;
    }

    try {
      const isPasswordCorrect = fullPassword === "1234"; 

      if (isPasswordCorrect) {
        router.push(`/event-maps/${id}`);
      } else {
        setHasError(true);
        setPassword(["", "", "", ""]);
        setCurrentIndex(0);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">{profile.name}님의 비밀번호를 입력하세요</h1>
      <div className="inline-flex items-center justify-center gap-[16px] mt-4">
        {password.map((_, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={password[i]}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d$/.test(value)) {
                const newPassword = [...password];
                newPassword[i] = value;
                setPassword(newPassword);

                if (i < 3) setCurrentIndex(i + 1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && i > 0) {
                const newPassword = [...password];
                newPassword[i] = "";
                setPassword(newPassword);
                setCurrentIndex(i - 1);
              }
            }}
            className={`w-10 h-10 text-center ${
              hasError ? "border-red-500" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {hasError && <p className="text-red-500 mt-4">비밀번호가 잘못되었습니다.</p>}

      <button
        onClick={handlePasswordSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        로그인
      </button>
    </div>
  );
}
