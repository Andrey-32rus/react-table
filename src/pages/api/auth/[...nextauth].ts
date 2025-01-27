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
    signIn: "/auth/signin", // Кастомизированная страница входа
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret",
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Логирование для отслеживания callback
      if (typeof window === "undefined") {
        // Серверная часть, обрабатываем запрос
        const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
        const host = baseUrl.split("//")[1]; // host (с удалением протокола)
        const port = host.split(":")[1] || "80"; // Если порт есть, возьмем его

        console.log("Server-side redirect callback:");
        console.log("protocol:", protocol);
        console.log("host:", host);
        console.log("port:", port);

        const callbackUrl = `${protocol}://${host}:${port}`;

        console.log("callbackUrl:", callbackUrl);

        return callbackUrl; // Возвращаем правильный callbackUrl
      }


      // На клиенте продолжаем с обычным редиректом
      console.log("Client-side redirect callback:");
      console.log("url:", url);
      console.log("baseUrl:", baseUrl);
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
});