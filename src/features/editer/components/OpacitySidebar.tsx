import {
  ActiveTool,
  Editor
} from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Label } from '@radix-ui/react-menu'
import { Slider } from '@/components/ui/slider'
import { useEffect, useMemo, useState } from 'react'
interface OpacitySidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const OpacitySidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: OpacitySidebarProps) => {
  const initialValue = editor?.getActiveOpacity() || 1
  const [opacity, setOpacity] = useState(initialValue)

  const selectedObject = useMemo(() => editor?.selectedObjects[0], [editor?.selectedObjects])

  function onClose() {
    onChangeActiveTool('select')
  }

  function onChange(value: number) {
    editor?.changeOpacity(value)
    setOpacity(value)
  }

  // 创建新的形状对象复位滑动器
  useEffect(() => {
    if(selectedObject) {
      setOpacity(selectedObject.get('opacity') || 1)
    }
  }, [selectedObject])

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'opacity' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Opacity'}
        description={'Change the opacity of the selected object'}
      />
      <ScrollArea>
        <div className={'p-4 space-y-6'}>
          <Label className={'text-sm'}>Stroke width</Label>
          <Slider
            value={[opacity]}
            onValueChange={(values) => onChange(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
