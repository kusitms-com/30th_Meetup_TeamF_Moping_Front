"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function PasswordInput() {
  const [password, setPassword] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false); // 변수명 변경
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { id, nonMemberId } = useParams();

  const submitPassword = async () => {
    const fullPassword = password.join("");
    console.log(password);
    console.log("Password submitted:", fullPassword);

    try {
      const response = await fetch(
        "http://110.165.17.236:8081/api/v1/nonmembers/login",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            nonMemberId,
            password: fullPassword,
          }),
        }
      );

      if (response.ok) {
        router.push(`/event-maps/${id}/${nonMemberId}/load-mappin-edit`);
      } else {
        setHasError(true); // hasError로 변경
        setPassword(["", "", "", ""]);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("서버 오류:", error);
      setHasError(true); // hasError로 변경
    }
  };

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
      setHasError(false); // hasError로 변경
    }
  };

  useEffect(() => {
    inputRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex items-center justify-start gap-4 mb-4">
        <div
          className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg inline-flex items-center ${
            hasError ? "border-2 border-primary-50" : ""
          } ${currentIndex === 0 ? "border-2 border-gray-950" : ""}`}
        >
          <input
            ref={(el) => {
              inputRefs.current[0] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="grow text-center w-full h-full bg-transparent outline-none text-2xl"
            maxLength={1}
            value={password[0]}
            onChange={(e) => handleInputChange(e, 0)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
          />
        </div>
        <div
          className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg inline-flex items-center ${
            hasError ? "border-2 border-primary-50" : ""
          } ${currentIndex === 1 ? "border-2 border-gray-950" : ""}`}
        >
          <input
            ref={(el) => {
              inputRefs.current[1] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="grow text-center w-full h-full bg-transparent outline-none text-2xl"
            maxLength={1}
            value={password[1]}
            onChange={(e) => handleInputChange(e, 1)}
            onKeyDown={(e) => handleKeyDown(e, 1)}
          />
        </div>
        <div
          className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg inline-flex items-center ${
            hasError ? "border-2 border-primary-50" : ""
          } ${currentIndex === 2 ? "border-2 border-gray-950" : ""}`}
        >
          <input
            ref={(el) => {
              inputRefs.current[2] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="grow text-center w-full h-full bg-transparent outline-none text-2xl"
            maxLength={1}
            value={password[2]}
            onChange={(e) => handleInputChange(e, 2)}
            onKeyDown={(e) => handleKeyDown(e, 2)}
          />
        </div>
        <div
          className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg inline-flex items-center ${
            hasError ? "border-2 border-primary-50" : ""
          } ${currentIndex === 3 ? "border-2 border-gray-950" : ""}`}
        >
          <input
            ref={(el) => {
              inputRefs.current[3] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="grow text-center w-full h-full bg-transparent outline-none text-2xl"
            maxLength={1}
            value={password[3]}
            onChange={(e) => handleInputChange(e, 3)}
            onKeyDown={(e) => handleKeyDown(e, 3)}
          />
        </div>
      </div>

      {hasError && (
        <p className="text-primary-50 text-left w-full max-w-sm">
          비밀번호가 일치하지 않아요
        </p>
      )}

      <button
        type="button"
        onClick={submitPassword}
        className="mt-4 px-6 py-2 bg-primary-50 text-white rounded-lg"
      >
        제출
      </button>
    </div>
  );
}
