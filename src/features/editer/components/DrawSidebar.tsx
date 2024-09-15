'use client'

import { ActiveTool, Editor, STROKE_COLOR, STROKE_WIDTH } from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import ColorPicker from './ColorPicker'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Slider } from '@/components/ui/slider'
interface DrawSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const DrawSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: DrawSidebarProps) => {
  const ColorValue = editor?.getActiveStrokeColor() || STROKE_COLOR
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH

  function onClose() {
    editor?.disableDrawingMode()
    onChangeActiveTool('select')
  }

  function onColorChange(value: string) {
    editor?.changeStrokeColor(value)
  }
  
  const onWidthChange = (value:number) => {
    editor?.changeStrokeWidth(value)
  }
  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'draw' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Drawing mode'}
        description={'Modify brush settings'}
      />
      <ScrollArea>
        <div className=' p-4 space-y-6 border-b'>
          <Label className='text-sm'>
            Brush width
          </Label>
          <Slider value={[widthValue]} onValueChange={values => onWidthChange(values[0])} />
        </div>
        <div className={'p-4 space-y-6'}>
          <ColorPicker value={ColorValue} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
