import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from '../types'
import { Hint } from '@/components/ui/hint'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BsBorderWidth } from 'react-icons/bs'
import {TbColorFilter} from 'react-icons/tb'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  SquareSplitHorizontal,
  Trash
} from 'lucide-react'
import { RxTransparencyGrid } from 'react-icons/rx'
import { isTextType } from '../utils'
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from 'react-icons/fa'
import { useState } from 'react'
import { FontSizeInput } from '@/features/editer/components/FontSizeInput'

interface ToolbarProps {
  editor: Editor | undefined
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool
}: ToolbarProps) => {
  const initialFillColor = editor?.getActiveFillColor()
  const initialStrokeColor = editor?.getActiveStrokeColor()
  const initialFontFamily = editor?.getActiveFontFamily()
  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT
  const initialFontStyle = editor?.getActiveFontStyle() || 'normal'
  const initIalFontLinethrough = editor?.getActiveFontLinethrough() || false
  const initialFontUnderline = editor?.getActiveFontUnderline() || false
  const initialTextAlign = editor?.getActiveTextAlign() || 'left'
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    fontLineThrough: initIalFontLinethrough,
    fontUnderline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize
  })

  const selectedObjectType = editor?.selectedObjects[0]?.type
  const selectedObject = editor?.selectedObjects[0]

  const isText = isTextType(selectedObjectType)
  const isImage = selectedObjectType === 'image'

  // 改变文字大小
  const onChangeFontSize = (value: number) => {
    if (!selectedObject) {
      return
    }

    editor?.changeFontSize(value)
    setProperties((current) => ({
      ...current,
      fontSize: value
    }))
  }
  // 点击bold切换字体粗细
  const toggleBold = () => {
    if (!selectedObject) {
      return
    }
    const newValue = properties.fontWeight > 500 ? 500 : 700
    editor?.changeFontWeight(newValue)
    setProperties((current) => ({
      ...current,
      fontWeight: newValue
    }))
  }

  // 点击切换斜体
  const toggleItalic = () => {
    if (!selectedObject) {
      return
    }

    const isItalic = properties.fontStyle === 'italic'
    const newValue = isItalic ? 'normal' : 'italic'

    editor?.changeFontStyle(newValue)
    setProperties((current) => ({
      ...current,
      fontStyle: newValue
    }))
  }

  //切换文字对齐方式
  const onChangeTextAlign = (value: string) => {
    if (!selectedObject) {
      return
    }

    editor?.changeTextAlign(value)
    setProperties((current) => ({
      ...current,
      textAlign: value
    }))
  }

  // 点击切换删除线
  const toggleLinethrogh = () => {
    if (!selectedObject) {
      return
    }

    const newValue = !properties.fontLineThrough
    editor?.changeFontLinethrough(newValue)
    setProperties((current) => ({
      ...current,
      fontLineThrough: newValue
    }))
  }

  // 点击切换下划线
  const toggleUnderline = () => {
    if (!selectedObject) {
      return
    }

    const newValue = !properties.fontUnderline
    editor?.changeFontUnderline(newValue)
    setProperties((current) => ({
      ...current,
      fontUnderline: newValue
    }))
  }

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className=" shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2"></div>
    )
  }

  return (
    <div
      className={
        'shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2'
      }
    >
      {/* 图片不展示改变背景色按钮*/}
      {!isImage && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Color" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('fill')}
              size={'icon'}
              variant={'ghost'}
              className={cn(activeTool === 'fill' && 'bg-gray-100')}
            >
              <div
                className=" rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果时操作文本类型,就把stroke隐藏 */}
      {!isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Stroke width" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('stroke-color')}
              size={'icon'}
              variant={'ghost'}
              className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
            >
              <div
                className=" rounded-sm size-4  border-2 bg-white"
                style={{
                  borderColor: properties.strokeColor
                }}
              />
            </Button>
          </Hint>
        </div>
      )}

      {!isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Stroke width" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('stroke-width')}
              size={'icon'}
              variant={'ghost'}
              className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
            >
              <BsBorderWidth className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果时编辑文字，展示字体选择 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Font" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('font')}
              size={'icon'}
              variant={'ghost'}
              className={cn(
                'w-auto px-2',
                activeTool === 'font' && 'bg-gray-100'
              )}
            >
              <div className=" max-w-[100px] truncate text-sm">
                {properties.fontFamily}
              </div>
              <ChevronDown className=" size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {/* 如果是编辑文字，展示文字bold选择 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Bold" side="bottom" sideOffset={5}>
            <Button
              onClick={() => toggleBold()}
              size={'icon'}
              variant={'ghost'}
              className={cn(properties.fontWeight > 500 && 'bg-gray-100')}
            >
              <FaBold className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果是编辑文字，展示文字Style选择 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Italic" side="bottom" sideOffset={5}>
            <Button
              onClick={() => toggleItalic()}
              size={'icon'}
              variant={'ghost'}
              className={cn(properties.fontStyle === 'italic' && 'bg-gray-100')}
            >
              <FaItalic className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果是编辑文字，展示文字下划线选择 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Underline" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size={'icon'}
              variant={'ghost'}
              className={cn(properties.fontUnderline && 'bg-gray-100')}
            >
              <FaUnderline className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果是编辑文字，展示文字删除线 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Strike" side="bottom" sideOffset={5}>
            <Button
              onClick={toggleLinethrogh}
              size={'icon'}
              variant={'ghost'}
              className={cn(properties.fontLineThrough && 'bg-gray-100')}
            >
              <FaStrikethrough className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果是编辑文字，展示文字向左方式按钮 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Align left" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign('left')}
              size={'icon'}
              variant={'ghost'}
              className={cn(properties.textAlign === 'left' && 'bg-gray-100')}
            >
              <AlignLeft className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果是编辑文字，展示文字中间对齐方式按钮 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Align center" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign('center')}
              size={'icon'}
              variant={'ghost'}
              className={cn(properties.textAlign === 'center' && 'bg-gray-100')}
            >
              <AlignCenter className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果是编辑文字，展示文字向右方式按钮 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Align right" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeTextAlign('right')}
              size={'icon'}
              variant={'ghost'}
              className={cn(properties.textAlign === 'right' && 'bg-gray-100')}
            >
              <AlignRight className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}

      {/* 如果是编辑文字，展示输入框 */}
      {isText && (
        <div className=" flex items-center h-full justify-center">
          <FontSizeInput
            value={properties.fontSize}
            onChange={onChangeFontSize}
          />
        </div>
      )}
      {/* image filter */}
      {isImage && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Filters" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('filter')}
              size={'icon'}
              variant={'ghost'}
              className={cn(activeTool === 'filter' && 'bg-gray-100')}
            >
              <TbColorFilter className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}
      {/* ai去除背景 */}
      {isImage && (
        <div className=" flex items-center h-full justify-center">
          <Hint label="Remove background" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeActiveTool('remove-bg')}
              size={'icon'}
              variant={'ghost'}
              className={cn(activeTool === 'remove-bg' && 'bg-gray-100')}
            >
              <SquareSplitHorizontal className={'size-4'} />
            </Button>
          </Hint>
        </div>
      )}
      <div className=" flex items-center h-full justify-center">
        <Hint label="Bring forward" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size={'icon'}
            variant={'ghost'}
          >
            <ArrowUp className={'size-4'} />
          </Button>
        </Hint>
      </div>

      <div className=" flex items-center h-full justify-center">
        <Hint label="Bring backwards" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.sendBackwards()}
            size={'icon'}
            variant={'ghost'}
          >
            <ArrowDown className={'size-4'} />
          </Button>
        </Hint>
      </div>

      <div className=" flex items-center h-full justify-center">
        <Hint label="Opacity" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool('opacity')}
            size={'icon'}
            variant={'ghost'}
            className={cn(activeTool === 'opacity' && 'bg-gray-100')}
          >
            <RxTransparencyGrid className={'size-4'} />
          </Button>
        </Hint>
      </div>

      <div className=" flex items-center h-full justify-center">
        <Hint label="Delete" side="bottom" sideOffset={5}>
          <Button
            onClick={() => editor?.delete()}
            size={'icon'}
            variant={'ghost'}
          >
            <Trash className={'size-4'} />
          </Button>
        </Hint>
      </div>

      <div className=" flex items-center h-full justify-center">
        <Hint label="Duplicate" side="bottom" sideOffset={5}>
          <Button
            onClick={() => {
              editor?.onCopy()
              editor?.onPaste()
            }}
            size={'icon'}
            variant={'ghost'}
          >
            <Copy className={'size-4'} />
          </Button>
        </Hint>
      </div>
    </div>
  )
}
