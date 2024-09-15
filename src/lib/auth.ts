import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import {db} from '@/db/drizzle'


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:DrizzleAdapter(db),
  providers: [GitHub, Google],
  pages:{
    signIn: '/sign-in',
    error:'/sign-in'
  }
})