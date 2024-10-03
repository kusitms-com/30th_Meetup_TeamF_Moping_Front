import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

export default NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + '/dashboard';  // 로그인 후 대시보드로 리다이렉트
    },
  },
  pages: {
    signIn: '/',  // 메인 페이지에서 로그인
    error: '/auth/error',  // 오류 페이지 (선택 사항)
  },
  debug: true,  // 디버그 모드 활성화
});
