"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function PasswordInput() {
  const [password, setPassword] = useState(["", "", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const correctPassword = useMemo(() => ["1", "2", "3", "4"], []);

  const checkPassword = useCallback(
    (inputPassword: string[]) => {
      if (inputPassword.every((char) => char !== "")) {
        if (JSON.stringify(inputPassword) === JSON.stringify(correctPassword)) {
          setError(false);
          router.push("/editmappin-page");
        } else {
          setError(true);
        }
      }
    },
    [correctPassword, router]
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;

    // 숫자만 허용
    if (/^\d$/.test(inputValue)) {
      const newPass = [...password];
      newPass[index] = inputValue;
      setPassword(newPass);

      if (index < password.length - 1) {
        setCurrentIndex(index + 1);
      }

      checkPassword(newPass);
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
      setError(false);
    }
  };

  // 현재 인덱스의 입력 칸에 포커스 설정
  useEffect(() => {
    inputRefs.current[currentIndex]?.focus();
  }, [currentIndex]);

  const inputKeys = useMemo(() => password.map(() => uuidv4()), [password]);

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex items-center justify-start gap-4 mb-4">
        {password.map((char, index) => (
          <div
            key={inputKeys[index]}
            className={`w-14 h-14 p-4 bg-[#f7f7f7] rounded-lg justify-start items-center gap-3 inline-flex
            ${error ? "border-2 border-primary-50" : ""}
            ${currentIndex === index ? "border-2 border-gray-950" : ""}`}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className="grow shrink basis-0 text-center w-full h-full bg-transparent outline-none text-2xl text-text-default"
              maxLength={1}
              value={char}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="text-primary-50 text-left w-full max-w-sm">
          비밀번호가 일치하지 않아요
        </p>
      )}
    </div>
  );
}
