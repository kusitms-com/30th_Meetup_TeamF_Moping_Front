"use client";

import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface NonMember {
  nonMemberId: number;
  name: string;
  profileSvg: string;
}

interface LoginModalProps {
  eventId: string;
}

export default function LoginModal({ eventId }: LoginModalProps) {
  const [profiles, setProfiles] = useState<NonMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const profilesPerPage = 4;

  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();

  const handleNextPage = () => {
    if (currentPage < Math.ceil(profiles.length / profilesPerPage) - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${apiUrl}/pings?uuid=${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profiles: ${response.status}`);
        }

        const data = await response.json();
        setProfiles(data.nonMembers || []);
      } catch (err: unknown) {
        setError("프로필 데이터를 불러올 수 없습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [eventId, apiUrl]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigateToPasswordPage = (nonMemberId: number) => {
    router.push(
      `/event-maps/${eventId}/login/pin-check?nonMemberId=${nonMemberId}`
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextPage,
    onSwipedRight: handlePrevPage,
    preventScrollOnSwipe: true,
  });

  const currentProfiles = profiles.slice(
    currentPage * profilesPerPage,
    (currentPage + 1) * profilesPerPage
  );

  const navigateToProfileCreation = () => {
    router.push(`/event-maps/${eventId}/load-mappin/forms/name-pin`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[272px] h-[380px] relative">
            <div className="w-[272px] h-[380px] left-0 top-0 absolute bg-white rounded-lg" />

            <div className="left-[64px] top-[22px] absolute text-center text-[#1d1d1d] text-xl font-semibold font-['Pretendard'] leading-7">
              로그인할 프로필을
              <br />
              선택하세요.
            </div>

            <div
              {...swipeHandlers}
              className="h-[214px] left-0 right-0 top-[96px] absolute flex flex-col justify-center items-center gap-4"
            >
              {loading && (
                <p className="text-center text-gray-500">로딩 중...</p>
              )}
              {!loading && error && (
                <p className="text-center text-red-500">{error}</p>
              )}
              {!loading && !error && profiles.length === 0 && (
                <p className="text-center text-gray-500">
                  저장된 프로필이 없습니다.
                </p>
              )}
              {!loading && !error && profiles.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {currentProfiles.map((profile) => (
                    <div
                      key={profile.nonMemberId}
                      onClick={() =>
                        navigateToPasswordPage(profile.nonMemberId)
                      }
                      role="button"
                      tabIndex={0}
                      className="w-[68px] flex flex-col items-center cursor-pointer"
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        navigateToPasswordPage(profile.nonMemberId)
                      }
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex justify-center items-center">
                        <Image
                          src={profile.profileSvg}
                          alt={profile.name}
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      </div>
                      <p className="text-[#717171] text-xs font-medium mt-1">
                        {profile.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="absolute bottom-[70px] left-0 right-0 flex justify-center space-x-2">
              {Array.from(
                { length: Math.ceil(profiles.length / profilesPerPage) },
                (_, index) => (
                  <button
                    key={`profile-nav-${index}`}
                    type="button"
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full cursor-pointer ${
                      index === currentPage ? "bg-black" : "bg-[#d9d9d9]"
                    }`}
                  />
                )
              )}
            </div>

            <div
              onClick={navigateToProfileCreation}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && navigateToProfileCreation()
              }
              className="left-[66px] top-[348px] absolute text-center text-[#8e8e8e] text-xs font-medium font-['Pretendard'] underline leading-none cursor-pointer"
            >
              아직 프로필 생성을 안했다면?
            </div>

            <button
              onClick={closeModal}
              type="button"
              className="absolute top-2 right-2 w-6 h-6"
            >
              <Image
                src="/svg/ModalDelete.svg"
                alt="닫기"
                width={18}
                height={18}
                className="object-cover"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
