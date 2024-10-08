
import { ActiveTool, Editor, STROKE_COLOR } from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import ColorPicker from './ColorPicker'
interface StrokeColorSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const StrokeColorSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: StrokeColorSidebarProps) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR

  function onClose() {
    onChangeActiveTool('select')
  }

  function onChange(value: string) {
    editor?.changeStrokeColor(value)
  }

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'stroke-color' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Stroke color'}
        description={'Add stroke color to your element'}
      />
      <ScrollArea>
        <div className={'p-4 space-y-6'}>
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
