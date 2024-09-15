import { StrokeWidthSidebar } from '@/features/editer/components/StrokeWidthSidebar'
;('usr client')

import { Navbar } from '@/features/editer/components/Navbar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor } from '../hooks/use-editor'
import { fabric } from 'fabric'
import { Sidebar } from '@/features/editer/components/Sidebar'
import { Toolbar } from '@/features/editer/components/Toolbar'
import { Footer } from '@/features/editer/components/Footer'
import { ActiveTool, selectionDependentTools } from '@/features/editer/types'
import { ShapeSidebar } from '@/features/editer/components/ShapeSidebar'
import { FillColorSidebar } from './FillColorSidebar'
import { StrokeColorSidebar } from './StrokeColorSideber'
import { OpacitySidebar } from './OpacitySidebar'
import { TextSidebar } from './TextSidebar'
import { FontSidebar } from './FontSidebar'
import { ImageSidebar } from '@/features/editer/components/ImageSidebar'
import { FilterSidebar } from './FilterSidebar'
import { AiSidebar } from './AiSidebar'
import { RemoveBgSidebar } from './RemoveBgSidebar'
import { DrawSidebar } from './DrawSidebar';
import { SettingsSidebar } from './SettingsSidebar';

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>('select')

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool('select')
    }
  }, [activeTool])

  // 获取初始化画图工具方法
  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection
  })

  const canvasRef = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 画布的初始化
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true
    })

    init({ initialCanvas: canvas, initialContainer: containerRef.current! })

    return () => {
      canvas.dispose()
    }
  }, [init])

  // 活动类变化函数
  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
  
      if (tool === 'draw') {
        editor?.enableDrawingMode()
      }
      if (activeTool === 'draw') {
        editor?.disableDrawingMode()
      }
      //如果再次点击同一个图标，取消点击的样式
      if (tool === activeTool) {
        return setActiveTool('select')
      }
      setActiveTool(tool)
    },
    [activeTool, editor]
  )

  // @ts-ignore
  return (
    <div className="h-full flex flex-col">
      <Navbar  editor={editor}  onChangeActiveTool={onChangeActiveTool} activeTool={activeTool} />

      <div className={' absolute h-[calc(100%-68px)] w-full top-[68px] flex'}>
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <ShapeSidebar
          activeTool={activeTool}
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
        />

        <FillColorSidebar
          activeTool={activeTool}
          editor={editor}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AiSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <RemoveBgSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <DrawSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main
          className={' bg-muted flex-1 overflow-auto relative flex flex-col'}
        >
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            ref={containerRef}
            className=" flex-1 h-[calc(100%-124px)] bg-muted"
          >
            <canvas ref={canvasRef}></canvas>
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  )
}

export default Editor
