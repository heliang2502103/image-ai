import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SIgnInCard } from '@/features/auth/components/SIgnInCard'
import { SignUpCard } from '@/features/auth/components/SignUpCard'


const SignUpPage = async () => {
  const session = await auth()

  if (session) {
    redirect('/')
  }
  return (
    <SignUpCard />
  )
}

export default SignUpPage