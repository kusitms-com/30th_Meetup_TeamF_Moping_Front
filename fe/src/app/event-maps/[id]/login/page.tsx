// 로그인 모달창을 구현하기 위한 임시 페이지입니다.
// 로그인 컴포넌트를 아래와 같은 식으로 사용하고 싶은 곳에 붙여 넣으면 됩니다.

import LoginModal from "./components/LoginModal";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <LoginModal eventId={id} />{" "}
      {/* LoginModal 컴포넌트에 id를 eventId로 전달 */}
    </div>
  );
}
