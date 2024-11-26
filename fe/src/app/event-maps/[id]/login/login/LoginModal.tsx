"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Profile = {
  id: number;
  name: string;
  imageUrl: string;
};

export default function LoginModal({
  onProfileSelect,
}: {
  onProfileSelect: (profile: Profile) => void;
}) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const mockProfiles: Profile[] = [
          { id: 1, name: "John Doe", imageUrl: "/images/john.jpg" },
          { id: 2, name: "Jane Smith", imageUrl: "/images/jane.jpg" },
          { id: 3, name: "Alice Johnson", imageUrl: "/images/alice.jpg" },
        ];

        setProfiles(mockProfiles); 
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    const checkToken = async () => {
      const isTokenValid = false; 

      if (!isTokenValid) {
        setIsOpen(true);
        fetchProfiles(); 
      } else {
        setIsOpen(false);
      }
    };

    checkToken();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-[300px] rounded-lg p-4 shadow-lg">
        <h2 className="text-center text-lg font-bold">로그인할 프로필을 선택하세요.</h2>
        {loading ? (
          <p className="text-center mt-4">로딩 중...</p>
        ) : (
          <Swiper slidesPerView={2} spaceBetween={10} pagination={{ clickable: true }}>
            {profiles.map((profile) => (
              <SwiperSlide key={profile.id}>
                <div
                  className="text-center cursor-pointer"
                  onClick={() => {
                    setIsOpen(false); 
                    onProfileSelect(profile); 
                  }}
                >
                  <div className="w-16 h-16 bg-red-500 rounded-full flex justify-center items-center mx-auto">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <p className="mt-2 text-xs">{profile.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <p className="text-xs text-center text-gray-500 underline mt-4 cursor-pointer">
          아직 프로필 생성을 안했다면?
        </p>
      </div>
    </div>
  );
}
