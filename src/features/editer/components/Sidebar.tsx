import { SideberItem } from '@/features/editer/components/SideberItem'
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Sparkles,
  Settings,
  Shapes,
  Sparkle,
  Type
} from 'lucide-react'
import { ActiveTool } from '@/features/editer/types'

;('use  client')

interface SidebarProps {
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside
      className={
        'bg-white flex flex-col w-[100px] h-full overflow-y-auto border-r'
      }
    >
      <ul className={'flex flex-col'}>
        <SideberItem
          icon={LayoutTemplate}
          label={'Design'}
          isActive={activeTool === 'templates'}
          onClick={() => {
            onChangeActiveTool('templates')
          }}
        />

        <SideberItem
          icon={ImageIcon}
          label={'Image'}
          isActive={activeTool === 'images'}
          onClick={() => {
            onChangeActiveTool('images')
          }}
        />

        <SideberItem
          icon={Type}
          label={'Text'}
          isActive={activeTool == 'text'}
          onClick={() => {
            onChangeActiveTool('text')
          }}
        />

        <SideberItem
          icon={Shapes}
          label={'Shapes'}
          isActive={activeTool === 'shapes'}
          onClick={() => {
            onChangeActiveTool('shapes')
          }}
        />

        <SideberItem
          icon={Sparkles}
          label={'Ai'}
          isActive={activeTool === 'ai'}
          onClick={() => {
            onChangeActiveTool('ai')
          }}
        />

        <SideberItem
          icon={Pencil}
          label={'Draw'}
          isActive={activeTool === 'draw'}
          onClick={() => {
            onChangeActiveTool('draw')
          }}
        />

        <SideberItem
          icon={Settings}
          label={'Settings'}
          isActive={activeTool === 'settings'}
          onClick={() => {
            onChangeActiveTool('settings')
          }}
        />
      </ul>
    </aside>
  )
}
