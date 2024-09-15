'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import {Input} from '@/components/ui/input'
import React, { useState } from 'react'
import { Separator } from '@/components/ui/separator'



export const SIgnInCard = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  // 提交登录
  const onCredentialSignIn = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    signIn('credentials', {
      email:email,
      password:password,
      callbackUrl: '/'
    })
  }
  const onProvideSignIn = (provider:'github' | 'google') => {
    signIn(provider, {callbackUrl:'/'})
  }

  return (
    <Card className={'w-full h-full p-8'}>
      <CardHeader className={'px-0 pt-0'}>
        <CardTitle>
          Login to continue
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className={'space-y-5 px-0 pb-0'}>
       {/* 登录表单 */}
        <form onSubmit={onCredentialSignIn} className={'space-y-2.5'}>
          <Separator/>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder={'Email'} type={'email'} required/>
          <Input value={password} onChange={e => setPassword(e.target.value)} placeholder={'Password'} type={'password'} required/>
          <Button type={'submit'} className={'w-full'} size={'lg'}>
            Continue
          </Button>
        </form>
       <div className={'gap-y-2.5 flex flex-col'}>
         <Button variant={'outline'} size={'lg'} className={'w-full relative'} onClick={() => onProvideSignIn('google')}>
           <FcGoogle className={'mr-2 size-5 top-2.5 left-2.5 absolute'}/>
           Continue with Google
         </Button>
         <Button variant={'outline'} size={'lg'} className={'w-full relative'} onClick={() => onProvideSignIn('github')}>
           <FaGithub className={'mr-2 size-5 top-2.5 left-2.5 absolute'}/>
           Continue with Github
         </Button>
       </div>
        <p>
          Don&apos;t have an account?
          <Link href={'/sign-up'}>
            <span className={'text-sky-700 hover:underline'}>Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}