// pages/api/auth/[...nextauth].ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
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
    signIn: "/auth/signin", // Кастомная страница входа
  },
  session: {
    strategy: "jwt", // Используем JWT для управления сессией
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret",
};

export default NextAuth(authOptions);