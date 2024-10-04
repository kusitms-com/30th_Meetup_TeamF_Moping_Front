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
      return baseUrl + '/dashboard';  
    },
  },
  pages: {
    signIn: '/',  
    error: '/auth/error',  // 오류 페이지 (선택 사항)
  },
  debug: true,  
});
