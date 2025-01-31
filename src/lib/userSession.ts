import {Session} from "next-auth";

export const getUserSession = async (fn: () => Promise<Session | null>): Promise<Session | null> => {
  // Получаем сессию
  const session = await fn()

  if (!session) return null
  if (!session.user) return null
  if (session.user.name === undefined)
    session.user.name = null
  if (session.user.email === undefined)
    session.user.email = null
  if (session.user.image === undefined)
    session.user.image = null

  return session
}