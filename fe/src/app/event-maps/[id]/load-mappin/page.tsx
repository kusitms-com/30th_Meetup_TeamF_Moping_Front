"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Form from "./components/Form";

export default function Page() {
  const { id } = useParams();
  const uuid = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[360px] w-full h-screen overflow-y-auto hide-scrollbar">
        <div className="w-full h-[56px] p-[16px]">
          <button
            type="button"
            className="w-[24px] h-[24px]"
            onClick={() => router.back()} // 뒤로 가기 기능
          >
            <Image
              src="/images/ArrowBack.svg"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="mt-[24px] mb-[44px] ml-[16px] text-darkGray text-title-md">
          저장해둔 맵핀을 불러올게요
        </div>
        <Form uuid={uuid} />
        <div className="h-[20px]" />
      </div>
    </div>
  );
}
