"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/app/components/common/Navigation";
import PasswordInput from "./components/LoginPinCheck";

export default function PasswordPage() {
  const searchParams = useSearchParams();
  const nonMemberId = searchParams.get("nonMemberId");
  const [profileData, setProfileData] = useState<{
    profileLockSvg: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!nonMemberId) {
        alert("nonMemberId가 없습니다.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/${nonMemberId}`
        );
        if (response.ok) {
          const data = await response.json();
          setProfileData({ profileLockSvg: data.profileLockSvg });
        } else {
          alert("프로필 데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        alert(`API 호출 실패: ${error}`);
      }
    };

    fetchProfileData();
  }, [nonMemberId]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-00">
      <NavBar />
      <div className="flex flex-col items-center justify-start flex-grow p-8 mt-8">
        {profileData ? (
          <PasswordInput iconUrl={profileData.profileLockSvg} />
        ) : (
          <p className="text-center text-gray-500">로딩 중...</p>
        )}
      </div>
    </div>
  );
}
