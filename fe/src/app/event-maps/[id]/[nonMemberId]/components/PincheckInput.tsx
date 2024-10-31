"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function PasswordInput() {
  const [password, setPassword] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const { id, nonMemberId } = useParams();

  // Define submitPassword before useEffect
  const submitPassword = useCallback(async () => {
    const fullPassword = password.join("");

    if (fullPassword.length !== 4) {
      setHasError(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/nonmembers/login`,
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
        setHasError(true);
        setPassword(["", "", "", ""]);
        setCurrentIndex(0);
      }
    } catch (error) {
      setHasError(true);
    }
  }, [id, nonMemberId, password, router]);

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
      <div className="inline-flex items-center justify-start gap-4 mb-4">
        {password.map((_, i) => (
          <div
            key={uuidv4()} // Unique key for each render
            className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg inline-flex items-center ${
              hasError ? "border-2 border-primary-50" : ""
            } ${currentIndex === i ? "border-2 border-gray-950" : ""}`}
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
        <p className="text-primary-50 text-left w-full max-w-sm">
          비밀번호가 일치하지 않아요
        </p>
      )}
    </div>
  );
}
