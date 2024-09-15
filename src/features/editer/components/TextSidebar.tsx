import { ActiveTool, Editor } from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
interface TextSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: TextSidebarProps) => {
  function onClose() {
    onChangeActiveTool('select')
  }

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'text' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Text'}
        description={'Add text to your canvas'}
      />
      <ScrollArea>
        <div className={'p-4 space-y-6'}>
          <Button className="w-full" onClick={() => editor?.addText('Textbox')}>
            Add a textbox
          </Button>
          <Button
            className="w-full h-16"
            size={'lg'}
            variant={'secondary'}
            onClick={() =>
              editor?.addText('Heading', {
                fontSize: 80,
                fontWeight: 700
                // 可以继续配置
              })
            }
          >
            <span className=" text-2xl font-bold">Add a heading</span>
          </Button>
          <Button
            className="w-full h-16"
            size={'lg'}
            variant={'secondary'}
            onClick={() =>
              editor?.addText('Subheading', {
                fontSize: 44,
                fontWeight: 500
                // 可以继续配置
              })
            }
          >
            <span className=" text-xl font-medium">Add a subheading</span>
          </Button>
          <Button
            className="w-full h-16"
            size={'lg'}
            variant={'secondary'}
            onClick={() =>
              editor?.addText('Heading', {
                fontSize: 32
                // 可以继续配置
              })
            }
          >
            <span>Paragraph</span>
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
