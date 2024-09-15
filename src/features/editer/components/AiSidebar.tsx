'use client'

import { ActiveTool, Editor } from '@/features/editer/types'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useGenerateImage } from '@/features/ai/api/use-generate-image'
import React, { useState } from 'react'
interface AiSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const AiSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: AiSidebarProps) => {
  const [value, setValue] = useState('')
  const mutation = useGenerateImage()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(
      { prompt: value },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data)
        }
      }
    )
  }

  function onClose() {
    onChangeActiveTool('select')
  }

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'ai' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'AI'}
        description={'Generate an image using AI'}
      />
      <ScrollArea>
        <form onSubmit={onSubmit} className={'p-4 space-y-6'}>
          <Textarea
            disabled={mutation.isPending}
            value={value}
            placeholder="an astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button disabled={mutation.isPending} type="submit" className="w-full">
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
