import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


interface SideberItemProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  onClick: () => void
}

export const SideberItem = ({icon:Icon, onClick, isActive, label}:SideberItemProps) => {
  return (
    <Button variant={'ghost'} onClick={onClick} className={cn('w-full h-full aspect-video p-3 py-4 flex flex-col', isActive&&'bg-muted text-primary')}>
      <Icon className={'size-5 stroke-2 shrink-0'}/>
      <span className={'mt-2 text-xs'}>
        {label}
      </span>
    </Button>
  )
}