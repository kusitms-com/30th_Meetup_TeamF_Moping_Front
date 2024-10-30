import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocationStore } from "../stores/useLocationStore";
import { useMarkerStore } from "../load-mappin/stores/useMarkerStore";

interface NonMember {
  nonMemberId: number;
  name: string;
}

interface Ping {
  iconLevel: number;
  placeName: string;
  px: number;
  py: number;
  url: string;
}

interface BottomDrawerProps {
  nonMembers: NonMember[];
  eventName: string;
  id: string;
}

export default function BottomDrawer({
  nonMembers,
  eventName,
  id,
}: BottomDrawerProps) {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [memberProfiles, setMemberProfiles] = useState<{
    [key: number]: string;
  }>({});
  const [allPings, setAllPings] = useState<Ping[]>([]);
  const { setCustomMarkers } = useMarkerStore(); // useMarkerStore에서 setCustomMarkers 가져오기
  const moveToLocation = useLocationStore((state) => state.moveToLocation);
  const router = useRouter();
  const profileImagesRef = useRef([
    "/profile/profil1.svg",
    "/profile/profil2.svg",
    "/profile/profil3.svg",
    "/profile/profil4.svg",
  ]);

  useEffect(() => {
    // 프로필 이미지 랜덤 할당
    const profiles = nonMembers.reduce(
      (acc, member) => {
        const randomImage =
          profileImagesRef.current[
            Math.floor(Math.random() * profileImagesRef.current.length)
          ];
        acc[member.nonMemberId] = randomImage;
        return acc;
      },
      {} as { [key: number]: string }
    );
    setMemberProfiles(profiles);
  }, [nonMembers]);

  useEffect(() => {
    // 전체 pings 데이터를 처음 로드할 때 가져옴
    const fetchAllPings = async () => {
      try {
        const response = await fetch(
          `http://110.165.17.236:8081/api/v1/nonmembers/pings?uuid=${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setAllPings(data.pings || []);
          setCustomMarkers(data.pings || []); // 모든 핑을 setCustomMarkers에 설정
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchAllPings();
  }, [id, setCustomMarkers]);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          moveToLocation(latitude, longitude);
        },
        () => alert("현재 위치 정보를 가져올 수 없습니다.")
      );
    }
  };

  const handleButtonClick = async (nonMemberId: number) => {
    // 선택된 버튼 토글
    const isDeselect = selectedButton === nonMemberId;
    setSelectedButton(isDeselect ? null : nonMemberId);

    if (isDeselect) {
      // 선택 해제 시 전체 핑 표시
      setCustomMarkers(allPings);
    } else {
      // 특정 nonMemberId에 대한 핑 요청
      try {
        const response = await fetch(
          `http://110.165.17.236:8081/api/v1/nonmembers/pings/${nonMemberId}`,
          { method: "GET", headers: { "Content-Type": "application/json" } }
        );

        if (response.ok) {
          const data = await response.json();
          const filteredPings = data.pings.map((ping: Ping) => ({
            ...ping,
            iconLevel: 1, // 선택된 nonMember에 대한 핑을 level1로 설정
          }));
          console.log(filteredPings);
          setCustomMarkers(filteredPings); // 필터링된 핑을 setCustomMarkers에 설정
        } else {
          console.log("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const handleAddButtonClick = () => {
    router.push(`/event-maps/${id}/load-mappin`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ url: window.location.href }).then().catch();
    } else {
      alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
    }
  };

  return (
    <div className="w-full h-[218px] bg-grayscale-90 z-10 rounded-t-xlarge">
      <div className="absolute mr-[16px] right-0 -top-[120px] flex flex-col">
        <button
          type="button"
          className="w-[48px] h-[48px] mb-[12px] shadow-medium"
          onClick={handleShare}
        >
          <Image src="/svg/share.svg" alt="share" width={48} height={48} />
        </button>
        <button
          type="button"
          className="w-[48px] h-[48px] shadow-medium"
          onClick={handleLocationClick}
        >
          <Image
            src="/svg/my-location.svg"
            alt="location"
            width={48}
            height={48}
          />
        </button>
      </div>
      <div className="w-full h-[20px] flex justify-center">
        <Image
          src="/svg/Grabber.svg"
          alt="Grabber"
          width={36}
          height={4}
          className="mt-[12px]"
        />
      </div>
      <div className="h-[62px] w-full pt-[16px] pb-[14px] pl-[20px] pr-[16px] flex justify-between text-lg text-grayscale-0 font-300">
        <div className="truncate max-w-[210px]">{eventName}</div>
        <div>
          <button type="button" className="w-[32px] h-[32px]">
            <Image
              src={
                selectedButton !== null ? "/svg/edit.svg" : "/svg/refresh.svg"
              }
              alt={selectedButton !== null ? "edit" : "refresh"}
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
      <div className="h-[96px] w-full flex pt-[6px] px-[16px] text-caption font-200 text-grayscale-20 overflow-x-auto scrollbar-hide gap-[12px]">
        <div className="w-[68px] h-[90px] flex flex-col justify-between shrink-0">
          <button
            type="button"
            onClick={handleAddButtonClick}
            className="w-[68px] h-[68px] rounded-lg"
          >
            <Image src="/svg/add.svg" alt="add" width={68} height={68} />
          </button>
        </div>
        {nonMembers.map((member) => (
          <div
            key={member.nonMemberId}
            className="w-[68px] h-[90px] flex flex-col justify-between shrink-0"
          >
            <button
              type="button"
              onClick={() => handleButtonClick(member.nonMemberId)}
              className={`w-[68px] h-[68px] ${
                selectedButton === member.nonMemberId
                  ? "border-2 rounded-lg border-primary-50"
                  : ""
              }`}
            >
              <Image
                src={
                  memberProfiles[member.nonMemberId] || "/profile/default.svg"
                }
                alt="profile"
                width={68}
                height={68}
              />
            </button>
            <div className="text-center">{member.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
