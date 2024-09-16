import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'


interface SidebarItemProps {
  icon: LucideIcon,
  label:string
  href:string
  isActive?:boolean
  onclick?:() => void
}

export const SidebarItem = ({icon:Icon,label,href,isActive,onclick}:SidebarItemProps) => {
  return (
    <Link href={href} onClick={onclick}>
      <div className={cn('flex items-center px-3 py-3 rounded-xl bg-transparent hover:bg-white transition', isActive && 'bg-white')}>
        <Icon className={'size-4 mr-2 stroke-2'}/>
        <span className={'text-sm font-medium'}>
          {label}
        </span>
      </div>
    </Link>
  )
}