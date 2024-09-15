import {redirect} from 'next/navigation'
import { auth } from '@/lib/auth'

// 判断是否登录，没有登录重定向到登录
export const protectServer = async () => {
  const session = await auth()

  if(!session) {
    redirect('/api/auth/signin')
  }
}