import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Google from 'next-auth/providers/google'
import { db } from '@/db/drizzle'
import Credentials from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'


// 扩展或定义第三方库的类型的语法
declare module 'next-auth/jwt' {
  interface JWT {
    id: string | undefined
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string | undefined
  }
}

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string()
})


export default {
  adapter: DrizzleAdapter(db),
  providers: [Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      console.log({ credentials })

      const validateFields = CredentialsSchema.safeParse(credentials)

      if (!validateFields.success) {
        return null
      }

      const { email, password } = validateFields.data

      const query = await db.select().from(users).where(eq(users.email, email))

      const user = query[0]

      if (!user || !user.password) {
        return null
      }

      const passwordsMatch = await bcrypt.compare(
        password,
        user.password
      )

      if (!passwordsMatch) {
        return null
      }

      return user
    }
  }), GitHub, Google],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    }
  }
} satisfies NextAuthConfig