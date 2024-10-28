import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // 요청 바디를 JSON 형식으로 파싱
    const { uuid, name, password, bookmarkUrls, storeUrls } =
      await request.json();

    // 유효성 검사
    if (
      !uuid ||
      !name ||
      !password ||
      !Array.isArray(bookmarkUrls) ||
      !Array.isArray(storeUrls)
    ) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었거나 형식이 잘못되었습니다." },
        { status: 400 }
      );
    }

    // 비밀번호 길이 검사
    if (password.length !== 4 || !/^\d+$/.test(password)) {
      return NextResponse.json(
        { error: "비밀번호는 4자리 숫자여야 합니다." },
        { status: 400 }
      );
    }

    // 요청이 성공적으로 처리된 경우
    const responseData = {
      message: "성공적으로 처리되었습니다.",
      data: {
        uuid,
        name,
        bookmarkUrls,
        storeUrls,
      },
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    // 오류 처리
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
