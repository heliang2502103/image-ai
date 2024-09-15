import { ActiveTool, Editor, filters } from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
interface FilterSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: FilterSidebarProps) => {

  function onClose() {
    onChangeActiveTool('select')
  }

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'filter' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Filter'}
        description={'Apply a filter to selected image'}
      />
      <ScrollArea>
        <div className={'p-4 space-y-1'}>
          {filters.map((filter) => {
            return (
              <Button
                key={filter}
                className={cn(
                  'w-full h-16 justify-start text-left',
                )}
                variant={'secondary'}
                size={'lg'}
                onClick={() => editor?.changeImageFilter(filter)}
              >
                {filter}
              </Button>
            )
          })}
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
