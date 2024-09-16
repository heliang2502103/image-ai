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
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useSignUp } from '@/features/auth/hook/use-sign-up'
import { toast } from 'sonner'
import { TriangleAlert } from 'lucide-react'



export const SignUpCard = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useSignUp()


  // 用户注册
  const onCredentialSignUp = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    mutation.mutate({
      name,
      email,
      password,

    }, {
      onSuccess:() => {
        signIn('credentials', {
          email,
          password,
          callbackUrl: '/'
        })
      }
    })
  }
  const onProvideSignIn = (provider:'github' | 'google') => {
    signIn(provider, {callbackUrl:'/'})
  }

  return (
    <Card className={'w-full h-full p-8'}>
      <CardHeader className={'px-0 pt-0'}>
        <CardTitle>
         Create an account
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {
        !!mutation.error && (
          <div className={'bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'}>
            <TriangleAlert className={'size-4'}/>
            <p>Something went wrong</p>
          </div>
        )
      }
      <CardContent className={'space-y-5 px-0 pb-0'}>
        {/* 登录表单 */}
        <form onSubmit={onCredentialSignUp} className={'space-y-2.5'}>
          <Separator/>
          <Input value={name} onChange={e => setName(e.target.value)} placeholder={'name'} type={'text'} required/>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder={'Email'} type={'email'} required/>
          <Input value={password} onChange={e => setPassword(e.target.value)} placeholder={'Password'} type={'password'} required minLength={3} maxLength={20}/>
          <Button type={'submit'} className={'w-full'} size={'lg'} disabled={mutation.isPending}>
            Continue
          </Button>
        </form>
        <Separator/>
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
          Already have an account?
          <Link href={'/sign-in'}>
            <span className={'text-sky-700 hover:underline'}>Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}