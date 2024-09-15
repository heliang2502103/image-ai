'use client'

import { ActiveTool, Editor, FILL_COLOR } from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import ColorPicker from './ColorPicker'
interface FillColorSidebarProps {
  editor:Editor | undefined
  activeTool:ActiveTool
  onChangeActiveTool:(tool:ActiveTool) => void

}
export const FillColorSidebar = ({activeTool, onChangeActiveTool, editor}:FillColorSidebarProps) => {


  const value = editor?.getActiveFillColor() || FILL_COLOR

  function onClose() {
    onChangeActiveTool('select')
  }

  function onChange(value:string) {
    editor?.changeFillColor(value)
  }

  return (
    <aside className={cn('bg-white relative border-r z-[40] w-[360px] h-full flex flex-col', activeTool === 'fill'? 'visible':'hidden')}>
      <ToolSidebarHeader title={'Fill color'} description={'Add fill color to your element'}/>
      <ScrollArea>
        <div className={'p-4 space-y-6'}>
          <ColorPicker value={value} onChange={onChange}/>
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose}/>
    </aside>
  )
}