'use client'

import { Button } from '@/components/ui/button'
import { CreditCard, Crown, Home, MessageCircleQuestion } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { SidebarItem } from '@/app/(dashboard)/SidebarItem'
import { usePathname } from 'next/navigation'


export  const SidebarRoutes = () => {
  const pathName = usePathname()

  return (
    <div className={'flex flex-col gap-y-4 flex-1'}>
      <div className={'px-4'}>
        <Button onClick={() => {
        }} className={'w-full rounded-xl border-none hover:bg-white hover:opacity-75 transition'} variant={'outline'}
                size={'lg'}>
          <Crown className={'mr-2 size-4 fill-yellow-500 text-yellow-500'} />
          Upgrade to Image AI Pro
        </Button>
      </div>
      <div className={'px-3'}>
        <Separator />
      </div>
      <ul className={'flex flex-col gap-y-1 px-3'}>
        <SidebarItem icon={Home} label={'Home'} href={'/'} isActive={pathName === '/'} />
      </ul>
      <div className={'px-3'}>
        <Separator />
      </div>
      <ul className={'flex flex-col gap-y-1 px-3'}>
        <SidebarItem icon={CreditCard} label={'Billing'} href={pathName} onclick={() => {}}/>
        <SidebarItem icon={MessageCircleQuestion} label={'Get Help'} href={'mailto:support@codewithantonio.com'} onclick={() => {}}/>
      </ul>
    </div>
  )
}