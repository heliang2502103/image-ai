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



export const SignUpCard = () => {
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
      <CardContent className={'space-y-5 px-0 pb-0'}>
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