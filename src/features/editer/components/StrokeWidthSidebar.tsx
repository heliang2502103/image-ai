import {
  ActiveTool,
  Editor,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH
} from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@radix-ui/react-menu'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
interface StrokeWidthSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const StrokeWidthSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: StrokeWidthSidebarProps) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH
  const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY

  function onClose() {
    onChangeActiveTool('select')
  }

  function onChangeStrokeWidth(value: number) {
    editor?.changeStrokeWidth(value)
  }

  function onChangeStrokeType(value: number[]) {
    editor?.changeStrokeDashArray(value)
  }
  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'stroke-width' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Stroke width'}
        description={'Modify the stroke of your element'}
      />
      <ScrollArea>
        <div className={'p-4 space-y-6'}>
          <Label className={'text-sm'}>Stroke width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className={'p-4 space-y-6'}>
          <Label className={'text-sm'}>Stroke type</Label>
          <Button
            onClick={() => onChangeStrokeType([])}
            variant={'secondary'}
            size={'lg'}
            className={cn(
              'w-full h-16 justify-items-start text-left',
              JSON.stringify(typeValue) === '[]' && 'border border-blue-500'
            )}
            style={{ padding: '8px 16px' }}
          >
            <div className={'w-full border-black rounded-full border-4'} />
          </Button>
          <Button
            onClick={() => onChangeStrokeType([5, 5])}
            variant={'secondary'}
            size={'lg'}
            className={cn(
              'w-full h-16 justify-items-start text-left',
              JSON.stringify(typeValue) === '[5,5]' && 'border-2'
            )}
            style={{ padding: '8px 16px' }}
          >
            <div
              className={
                'w-full border-black rounded-full border-4 border-dashed'
              }
            />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
