// src/types/kakao.d.ts
interface Kakao {
  isInitialized(): boolean;
  init(key: string): void;
  Auth: {
    authorize(params: { redirectUri: string }): void;
  };
}

interface Window {
  Kakao: Kakao;
}
