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

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (/^\d$/.test(key)) {
        const newPass = [...password];
        newPass[currentIndex] = key;
        setPassword(newPass);

        if (currentIndex < password.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }

        checkPassword(newPass);
      }

      if (key === "Backspace") {
        const newPass = [...password];
        newPass[currentIndex] = "";
        setPassword(newPass);

        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }

        setError(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, password, checkPassword]);

  // Generate unique IDs for each input field (useMemo to keep them stable)
  const inputKeys = useMemo(() => password.map(() => uuidv4()), [password]);

  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex items-center justify-start gap-4 mb-4">
        {password.map((char, index) => (
          <div
            key={inputKeys[index]} // Use generated UUID as the key
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
              readOnly
              style={{
                caretColor: "transparent",
              }}
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
