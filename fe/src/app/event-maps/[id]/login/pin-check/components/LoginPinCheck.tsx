"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // UUID를 생성하기 위해 추가

export interface PasswordInputProps {
  iconUrl: string | null;
}

export default function PasswordInput({ iconUrl }: PasswordInputProps) {
  const [password, setPassword] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const { id } = useParams();
  const nonMemberId = searchParams.get("nonMemberId");

  const submitPassword = useCallback(async () => {
    const fullPassword = password.join("");

    if (fullPassword.length !== 4) {
      setHasError(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/login-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nonMemberId: Number(nonMemberId),
            password: fullPassword,
          }),
        }
      );

      if (response.ok) {
        const { accessToken } = await response.json();
        console.log(accessToken);
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("authToken", accessToken);

        // 일단 임시로 성공 메시지 넣어놨어
        alert("로그인이 완료되었습니다!");

        // 페이지 이동(호야 이거 너가 설정해)
        window.location.href = `/event-maps/${id}`;
      } else {
        setHasError(true);
        setPassword(["", "", "", ""]);
        setCurrentIndex(0);
      }
    } catch (error) {
      setHasError(true);
      alert("로그인 API 호출에 실패했습니다. 다시 시도해주세요.");
    }
  }, [nonMemberId, password, searchParams]);

  useEffect(() => {
    if (password.every((digit) => digit !== "")) {
      submitPassword();
    }
  }, [password, submitPassword]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    if (/^\d$/.test(inputValue)) {
      const newPass = [...password];
      newPass[index] = inputValue;
      setPassword(newPass);

      if (index < password.length - 1) {
        setCurrentIndex(index + 1);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      const newPass = [...password];
      newPass[index] = "";

      if (index > 0) {
        setCurrentIndex(index - 1);
      }

      setPassword(newPass);
      setHasError(false);
    }
  };

  useEffect(() => {
    inputRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center">
      {/* 잠금 아이콘 */}
      <div className="mt-[48px] w-[84px] h-[84px] mb-[36px]">
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt="Lock Icon"
            width={84}
            height={84}
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-md" />
        )}
      </div>

      <p className="text-xl font-medium mb-[20px] text-center">
        암호를 입력하세요
      </p>
      <div className="inline-flex items-center justify-center gap-[16px]">
        {password.map((_, i) => (
          <div
            key={uuidv4()} // UUID로 고유 key 생성
            className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg inline-flex items-center justify-center ${
              hasError ? "border-2 border-[#f73a2c]" : ""
            } ${
              currentIndex === i && !hasError ? "border-2 border-[#2c2c2c]" : ""
            }`}
          >
            <input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="grow text-center w-full h-full bg-transparent outline-none text-2xl"
              maxLength={1}
              value={password[i]}
              onChange={(e) => handleInputChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          </div>
        ))}
      </div>

      {hasError && (
        <p className="text-[#f73a2c] mt-4 text-left text-sm font-medium font-['Pretendard'] leading-tight w-full max-w-xs">
          암호가 일치하지 않아요
        </p>
      )}
    </div>
  );
}
