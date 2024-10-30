"use client";

import Image from "next/image";
import PasswordInput from "./components/PincheckInput";
import NavBar from "@/app/components/common/Navigation";

export default function PasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-00">
      <NavBar />
      <div className="flex flex-col items-center justify-start flex-grow p-8 mt-8">
        <div className="mb-8">
          <Image
            src="/images/lock.svg"
            alt="Password Icon"
            width={84}
            height={84}
          />
        </div>

        <h2 className="text-xl font-bold mb-4">비밀번호 입력</h2>

        <PasswordInput />
      </div>
    </div>
  );
}
