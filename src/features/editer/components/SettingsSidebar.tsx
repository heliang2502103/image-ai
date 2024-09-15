'use client'

import { ActiveTool, Editor } from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import ColorPicker from './ColorPicker'
interface SettingsSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const SettingsSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: SettingsSidebarProps) => {
  const workspace = editor?.getWorkspace()

  const initialWidth = useMemo(() => `${workspace?.width ?? 0}`, [workspace])
  const initialHeight = useMemo(() => `${workspace?.height ?? 0}`, [workspace])
  const initialBackground = useMemo(
    () => workspace?.fill ?? '#ffffff',
    [workspace]
  )

  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)
  const [background, setBackground] = useState(initialBackground)

  useEffect(() => {
    setWidth(initialWidth)
    setHeight(initialHeight)
    setBackground(initialBackground)
  }, [initialBackground, initialHeight, initialWidth])

  const changeWidth = (value: string) => setWidth(value)
  const changeHeight = (value: string) => setHeight(value)
  const changeBackground = (value: string) => {
    setBackground(value)
    editor?.changeBackground(value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    editor?.changeSize({
      width: parseInt(width, 10),
      height: parseInt(height, 10)
    })
  }

  function onClose() {
    onChangeActiveTool('select')
  }

  function onChange(value: string) {
    editor?.changeFillColor(value)
  }

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'settings' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Settings'}
        description={'Change the look of your workspace'}
      />
      <ScrollArea>
        <form onSubmit={onSubmit} className="space-y-4 p-4">
          <div className={'space-y-2'}>
            <Label>Height</Label>
            <Input
              placeholder="Height"
              value={height}
              type="number"
              onChange={(e) => changeHeight(e.target.value)}
            />
          </div>
          <div className={'space-y-2'}>
            <Label>Width</Label>
            <Input
              placeholder="Width"
              value={width}
              type="number"
              onChange={(e) => changeWidth(e.target.value)}
            />
          </div>
          <Button type='submit' className='w-full'>
            Resize
          </Button>
        </form>
        <div className='p-4'>
          <ColorPicker value={background as string} onChange={changeBackground}/>
        </div>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
