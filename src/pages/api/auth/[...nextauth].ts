import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const hardcodedUser = {
          id: "1",
          name: "admin",
          username: "admin",
          password: "admin123admin123admin123",
        };


        if (
          credentials?.username === hardcodedUser.username &&
          credentials?.password === hardcodedUser.password
        ) {
          return { id: hardcodedUser.id, name: hardcodedUser.name };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Можно кастомизировать страницу входа
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret",
});