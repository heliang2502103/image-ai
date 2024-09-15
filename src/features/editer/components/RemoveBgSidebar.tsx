'use client'

import { ActiveTool, Editor } from '@/features/editer/types'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { ToolSidebarHeader } from '@/features/editer/components/ToolSidebarHeader'
import { ToolSidebarClose } from '@/features/editer/components/ToolSidebarClose'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useGenerateImage } from '@/features/ai/api/use-generate-image'
import React, { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useRemoveBg } from '@/features/ai/api/use-remove-bg'

interface RemoveBgSidebarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}
export const RemoveBgSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor
}: RemoveBgSidebarProps) => {
  const selectedObject = editor?.selectedObjects[0]
  //@ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc

  const mutation = useRemoveBg()

  function onClose() {
    onChangeActiveTool('select')
  }

  const onClick = () => {
    console.log('removing')

    mutation.mutate({
      image: imageSrc,
    }, {
      onSuccess:({data}) => {
        editor?.addImage(data)
      }
    })
  }

  return (
    <aside
      className={cn(
        'bg-white relative border-r z-[40] w-[360px] h-full flex flex-col',
        activeTool === 'remove-bg' ? 'visible' : 'hidden'
      )}
    >
      <ToolSidebarHeader
        title={'Background remove'}
        description={'Remove background from image using AI'}
      />
      {!imageSrc && (
        <div className=" flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className=" size-4 text-muted-foreground" />
          <p className=" text-muted-foreground text-xs">
            Feature not available for this object
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div
              className={cn(
                'relative aspect-square rounded-md overflow-hidden transition bg-muted',
                false && 'opacity-50'
              )}
            >
              <Image
                src={imageSrc}
                fill
                alt="Image"
                className=" object-cover"
              />
            </div>
            <Button className="w-full" onClick={onClick}>
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose click={onClose} />
    </aside>
  )
}
