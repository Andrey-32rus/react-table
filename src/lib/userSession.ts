import {Session} from "next-auth";

export interface User {
  name: string | null;
}

export const getUserSession = async (fn: () => Promise<Session | null>): Promise<User | null> => {
  // Получаем сессию
  const session = await fn()

  // Если сессии нет или email отсутствует, возвращаем null
  if (!session?.user?.name) {
    return null;
  }

  // Возвращаем email пользователя
  return {name: session.user.name};
}