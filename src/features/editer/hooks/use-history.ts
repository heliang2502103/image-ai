import { useCallback, useRef, useState } from 'react'
import { fabric } from 'fabric'
import { JSON_KEYS } from '../types'

interface UseHistoryProps {
  canvas: fabric.Canvas | null
}
export const useHistory = ({ canvas }: UseHistoryProps) => {
  
  // 当前历史的索引
  const [historyIndex, setHistoryIndex] = useState(0)

  // 储存画布的历史状态，一个字符串数组，每个canvas状态通过JSON.stringify转换得到的画布状态
  const canvasHistory = useRef<string[]>([])

  // 用于判定特定情况下跳过保存到历史纪律中，避免重复保存相同的状态
  const skipSave = useRef(false)

  // 判断是否可以撤销
  const canUndo = useCallback(() => {
    return historyIndex > 0
  }, [historyIndex])

  // 判断是否可以重做
  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1
  }, [historyIndex])

  // 保存画布状态到历史记录中
  const save = useCallback(
    (skip = false) => {
      if(!canvas) return

      // 获取当前的画布状态的JSON对象
      const currentState = canvas.toJSON(JSON_KEYS)

      // 将currentState对象转换为JSON字符串，以便储存
      const json = JSON.stringify(currentState)

      if(!skip && !skipSave.current) {
        // 满足条件把canvas状态保存到canvasHistory.current数组
        canvasHistory.current.push(json)

        // 更新historyIndex状态，以便跟踪当前最新的历史记录索引  
        setHistoryIndex(canvasHistory.current.length - 1)
      }
      // save callback
      console.log({todo:'save to database'})
    },
    [canvas]
  )

  // 撤销
  const undo = useCallback(() => {
    if(canUndo()) {
      skipSave.current = true
      canvas?.clear().renderAll()

      const previousIndex = historyIndex - 1
      const previousState = JSON.parse(canvasHistory.current[previousIndex])
      
      canvas?.loadFromJSON(previousState, () => {
        canvas.renderAll()
        setHistoryIndex(previousIndex)
        skipSave.current = false
      })
    }
  }, [historyIndex, canvas, canUndo])

  // 重做
  const redo = useCallback(() => {
    if(canRedo()) {
      skipSave.current = true
      canvas?.clear().renderAll()

      const nextIndex = historyIndex + 1
      const nextState = JSON.parse(canvasHistory.current[nextIndex])

      canvas?.loadFromJSON(nextState, () => {
        canvas.renderAll()
        setHistoryIndex(nextIndex)
        skipSave.current = false
      })
    }
  }, [canRedo, canvas, historyIndex])
  return { save, canUndo, canRedo, undo, redo, setHistoryIndex, canvasHistory }
}
