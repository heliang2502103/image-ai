import { fabric } from 'fabric'
import { useCallback, useMemo, useState } from 'react'
import { useAutoResize } from './use-auto-resize'
import {
  BuildEditorProps,
  CIRCLE_OPTIONS,
  DIAMOND_OPTINOS,
  Editor,
  EditorHookProps,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  JSON_KEYS,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTINOS
} from '@/features/editer/types'
import { useCanvasEvents } from './use-canvas-events'
import { createFilter, downloadFile, isTextType, transformText } from '../utils'
import { ITextboxOptions } from 'fabric/fabric-impl'
import { useClipboard } from './use-clipboard'
import { useHistory } from './use-history'
import { useHotkeys } from './use-hotkeys'
import { useWindowEvents } from './use-window-enents'

const buildEditor = ({
  undo,
  redo,
  canRedo,
  canUndo,
  save,
  autoZoom,
  copy,
  paste,
  fontFamily,
  setFontFamily,
  canvas,
  fillColor,
  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  selectedObjects,
  strokeColor,
  strokeWidth,
  strokeDashArray,
  setStrokeDashArray
}: BuildEditorProps): Editor => {
  // 保存项
  const generateSaveOptions = () => {
    const { width, height, left, top } = getWorkspace() as fabric.Rect

    return {
      name: 'Image',
      format: 'png',
      quality: 1,
      width,
      height,
      left,
      top
    }
  }
  // 生成png
  const savePng = () => {
    const options = generateSaveOptions()

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
    const dataUrl = canvas.toDataURL(options)

    downloadFile(dataUrl, 'png')
    autoZoom()
  }
  // 生成svg
  const saveSvg = () => {
    const options = generateSaveOptions()

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
    const dataUrl = canvas.toDataURL(options)

    downloadFile(dataUrl, 'svg')
    autoZoom()
  }
  // 生成Jpg
  const saveJpg = () => {
    const options = generateSaveOptions()

    canvas.setViewportTransform([1, 0, 0, 1, 0, 0])
    const dataUrl = canvas.toDataURL(options)

    downloadFile(dataUrl, 'jpg')
    autoZoom()
  }
  // 生成Json
  const saveJson = async () => {
    const dataUrl = canvas.toJSON(JSON_KEYS)

    await transformText(dataUrl.objects)
    const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataUrl, null, '\t')
    )}`
    downloadFile(fileString, 'json')
  }
  const loadJson = (json:string) => {
    const data = JSON.parse(json)

    canvas.loadFromJSON(data, () => {
      autoZoom()
    })
  }
  // 获取工作区
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === 'clip')
  }

  // 创建默认居中的方法
  const center = (object: fabric.Object) => {
    const workspace = getWorkspace()
    const center = workspace?.getCenterPoint()

    if (!center) return

    //@ts-ignore
    canvas._centerObject(object, center)
  }

  const addToCanvas = (object: fabric.Object) => {
    center(object)
    canvas.add(object)
    canvas.setActiveObject(object)
  }

  return {
    savePng,
    saveJpg,
    saveSvg,
    saveJson,
    loadJson,
    canRedo,
    canUndo,
    autoZoom,
    getWorkspace,
    // 放大
    zoomIn: () => {
      let zoomRatio = canvas.getZoom()
      zoomRatio += 0.05
      const center = canvas.getCenter()
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio > 1 ? 1 : zoomRatio
      )
    },
    // 缩小
    zoomOut: () => {
      let zoomRatio = canvas.getZoom()
      zoomRatio -= 0.05
      const center = canvas.getCenter()
      canvas.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoomRatio < 0.2 ? 0.2 : zoomRatio
      )
    },
    // 改变工作区大小
    changeSize: (value: { width: number; height: number }) => {
      const workspace = getWorkspace()
      workspace?.set(value)
      autoZoom()
      save()
    },
    // 改变背景
    changeBackground: (value: string) => {
      const workspace = getWorkspace()
      workspace?.set({ fill: value })
      canvas.renderAll()
      save()
    },
    // 开始绘图模式
    enableDrawingMode: () => {
      canvas.discardActiveObject() // 丢弃活动对象
      canvas.renderAll()
      canvas.isDrawingMode = true //开启绘图模式
      canvas.freeDrawingBrush.width = strokeWidth
      canvas.freeDrawingBrush.color = strokeColor
    },
    // 禁用绘图模式
    disableDrawingMode: () => {
      canvas.isDrawingMode = false
    },
    onCopy: () => copy(),
    onPaste: () => paste(),
    onUndo: () => undo(),
    onRedo: () => redo(),
    // 设置图片效果
    changeImageFilter: (value: string) => {
      const objects = canvas.getActiveObjects()
      objects.forEach((object) => {
        if (object.type === 'image') {
          const imageObject = object as fabric.Image

          console.log(1)
          const effect = createFilter(value)

          imageObject.filters = effect ? [effect] : []
          imageObject.applyFilters()
          canvas.renderAll()
        }
      })
    },
    // 添加图片
    addImage: (value: string) => {
      fabric.Image.fromURL(
        value,
        (image) => {
          const workspace = getWorkspace()

          image.scaleToWidth(workspace?.width || 0)
          image.scaleToHeight(workspace?.height || 0)

          addToCanvas(image)
        },
        {
          crossOrigin: 'anonymous'
        }
      )
    },
    // 删除
    delete: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options
      })
      addToCanvas(object)
    },
    // 获取画布对象的不透明度
    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) return 1

      return selectedObject.get('opacity') || 1
    },
    // 改变字体样式
    changeFontStyle: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontStyle: value })
        }
      })
      canvas.renderAll()
    },
    // 改变删除线
    changeFontLinethrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ linethrough: value })
        }
      })
      canvas.renderAll()
    },
    // 获取当前文字是否有删除线
    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return false
      }

      // @ts-ignore
      return selectedObject.get('linethrough') || false
    },
    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ underline: value })
        }
      })
      canvas.renderAll()
    },
    // 获取文字当前是否有下划线
    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return false
      }

      // @ts-ignore
      return selectedObject.get('underline') || false
    },
    // 改变文字对齐
    changeTextAlign: (value: ITextboxOptions['textAlign']) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ textAlign: value })
        }
      })
      canvas.renderAll()
    },
    // 获取文字对齐方式
    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return 'left'
      }

      // @ts-ignore
      return selectedObject.get('textAlign') || 'left'
    },
    // 改变文字大小
    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontSize: value })
        }
      })
      canvas.renderAll()
    },
    // 获取文字大小
    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return FONT_SIZE
      }

      // @ts-ignore
      return selectedObject.get('fontSize') || FONT_SIZE
    },
    // 获取选中对象字体
    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return 'normal'
      }

      // @ts-ignore
      return selectedObject.get('fontStyle') || 'normal'
    },
    // 改变字体bold
    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontWeight: value })
        }
      })
      canvas.renderAll()
    },
    // 改变不透明度
    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value })
      })
      canvas.renderAll()
    },
    // 向上移
    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringForward(object)
      })
      canvas.renderAll()
      const workspace = getWorkspace()
      workspace?.sendToBack()
    },
    // 向下移
    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendBackwards(object)
      })
      canvas.renderAll()
      const workspace = getWorkspace()
      workspace?.sendToBack()
    },
    // 改变字体
    changeFontFamily: (value: string) => {
      setFontFamily(value)
      canvas.getActiveObjects().forEach((object) => {
        if (isTextType(object.type)) {
          // @ts-ignore
          object.set({ fontFamily: value })
        }
      })
      canvas.renderAll()
    },
    changeFillColor: (value: string) => {
      setFillColor(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value })
      })
      canvas.renderAll()
    },
    changeStrokeColor: (value: string) => {
      setStrokeColor(value)
      canvas.getActiveObjects().forEach((object) => {
        //  Text types don't have stroke
        if (isTextType(object.type)) {
          object.set({ fill: value })
          return
        }
        object.set({ stroke: value })
      })
      canvas.freeDrawingBrush.color = value
      canvas.renderAll()
    },
    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value })
      })
      canvas.freeDrawingBrush.width = value
      canvas.renderAll()
    },
    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value)
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value })
      })
      canvas.renderAll()
    },
    // 圆
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      })
      addToCanvas(object)
    },
    // 圆角矩形
    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 10,
        ry: 10,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      })
      addToCanvas(object)
    },
    // 矩形
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      })
      addToCanvas(object)
    },
    // 三角形
    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTINOS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray
      })
      addToCanvas(object)
    },
    //  倒三角
    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTINOS.height
      const WIDTH = TRIANGLE_OPTINOS.width

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT }
        ],
        {
          ...TRIANGLE_OPTINOS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray
        }
      )
      addToCanvas(object)
    },
    //   菱形
    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTINOS.height
      const WIDTH = DIAMOND_OPTINOS.width

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 }
        ],
        {
          ...TRIANGLE_OPTINOS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray
        }
      )
      addToCanvas(object)
    },
    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return FONT_WEIGHT
      }
      //@ts-ignore
      const value = selectedObject.get('fontWeight') || FONT_WEIGHT
      return value
    },
    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return fontFamily
      }
      //@ts-ignore
      const value = selectedObject.get('fontFamily') || fontFamily
      return value
    },
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return fillColor
      }

      const value = selectedObject.get('fill') || fillColor

      return value as string
    },
    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return strokeColor
      }

      return selectedObject.get('stroke') || strokeColor
    },
    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return strokeWidth
      }

      return selectedObject.get('strokeWidth') || strokeWidth
    },
    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0]
      if (!selectedObject) {
        return strokeDashArray
      }

      return selectedObject.get('strokeDashArray') || strokeDashArray
    },
    canvas,
    selectedObjects
  }
}

export const useEditor = ({ clearSelectionCallback }: EditorHookProps) => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  // 工作区形状对象
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])

  // 颜色填充
  const [fillColor, setFillColor] = useState(FILL_COLOR)
  // 画笔颜色
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
  // 画笔宽度
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)
  // 画笔样式
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY)
  // 操作字体
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY)

  //历史记录管理
  const { save, canRedo, canUndo, undo, redo, canvasHistory, setHistoryIndex } =
    useHistory({ canvas })

  // 使用画布事件的hook
  useCanvasEvents({ save, canvas, setSelectedObjects, clearSelectionCallback })

  // 调整工作区域的大小和缩放
  const { autoZoom } = useAutoResize({ canvas, container })

  // 剪切板
  const { copy, paste } = useClipboard({ canvas })

  // 设置热键
  useHotkeys({ undo, redo, copy, paste, save, canvas })

  useWindowEvents()

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        save,
        canRedo,
        canUndo,
        undo,
        redo,
        autoZoom,
        copy,
        paste,
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        selectedObjects,
        strokeDashArray,
        setStrokeDashArray,
        fontFamily,
        setFontFamily
      })
    }
    return undefined
  }, [
    canRedo,
    canUndo,
    redo,
    save,
    undo,
    autoZoom,
    copy,
    paste,
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    selectedObjects,
    strokeDashArray,
    fontFamily
  ])

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer
    }: {
      initialCanvas: fabric.Canvas
      initialContainer: HTMLDivElement
    }) => {
      fabric.Object.prototype.set({
        cornerColor: '#fff',
        cornerStyle: 'circle',
        borderColor: '#3b82f6',
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: '#3b82f6'
      })

      // 创建一个矩形对象，真个矩形对象被用作一个初始工作区
      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: 'clip',
        fill: 'white',
        selectable: false, // 不可选择
        hasControls: false, // 不显示控制点
        shadow: new fabric.Shadow({
          color: 'rgba(0, 0, 0, 0.8)',
          blur: 5
        })
      })

      initialCanvas.setWidth(initialContainer.offsetWidth)
      initialCanvas.setHeight(initialContainer.offsetHeight)

      // 添加工作区
      initialCanvas.add(initialWorkspace)
      initialCanvas.centerObject(initialWorkspace)
      initialCanvas.clipPath = initialWorkspace

      setCanvas(initialCanvas)
      setContainer(initialContainer)

      const currentState = JSON.stringify(initialCanvas.toJSON(JSON_KEYS))
      canvasHistory.current = [currentState]
      setHistoryIndex(0)
    },
    [canvasHistory, setHistoryIndex]
  )

  return { init, editor }
}
