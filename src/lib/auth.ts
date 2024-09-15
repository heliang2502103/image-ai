import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import {db} from '@/db/drizzle'
import Credentials from 'next-auth/providers/credentials'
import {JWT} from 'next-auth/jwt'

// 扩展或定义第三方库的类型的语法
declare module 'next-auth/jwt' {
  interface JWT {
    id:string | undefined
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter:DrizzleAdapter(db),
  providers: [Credentials({
    credentials:{
      email:{label:'Email', type:'email'},
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      console.log({credentials})

      return null
    }
  }),GitHub, Google],
  pages:{
    signIn: '/sign-in',
    error:'/sign-in'
  },
  session:{
    strategy: 'jwt',
  },
  callbacks:{
    session({session, token}) {
      if(token.id) {
        session.user.id = token.id
      }
      return session
    },
    jwt({token, user}) {
      if(user) {
        token.id = user.id
      }

      return token
    }
  }
})