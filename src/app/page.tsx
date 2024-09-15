
import {auth} from "@/lib/auth"
import { protectServer } from '@/features/auth/utils'

export default async function Home() {
  await protectServer()
  return (
    <div>
      YOU are logged in
    </div>
  )
}
