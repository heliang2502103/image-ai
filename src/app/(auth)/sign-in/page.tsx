import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SIgnInCard } from '@/features/auth/components/SIgnInCard'


const SignInPage = async() => {
  const session = await auth()

  if(session) {
    redirect('/')
  }
  return (
        <SIgnInCard/>
  )
}

export default SignInPage