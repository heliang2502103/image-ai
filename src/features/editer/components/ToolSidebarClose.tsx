import { ChevronsLeft } from 'lucide-react'

interface ToolSidebarCloseProps {
  click:() => void
}
export const ToolSidebarClose = ({click}:ToolSidebarCloseProps) => {
  return (
    <button onClick={click} className={'absolute -right-[1.80rem] h-[70px] bg-white top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-r group'}>
      <ChevronsLeft className={'size-4 text-black group-hover:opacity-75 transition'} />
    </button>
  )
}