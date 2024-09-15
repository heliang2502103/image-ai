import { fabric } from 'fabric'
import { ITextboxOptions } from 'fabric/fabric-impl'
import * as material from 'material-colors'

export const JSON_KEYS = [
  'name',
  'gradientAngle',
  'selectable',
  'hasControls',
  'linkData',
  'editable',
  'extensionType',
  'extension'
]

export const filters = [
  'none',
  'polaroid',
  'sepia',
  'kodachrome',
  'contrast',
  'brightness',
  'greyscale',
  'brownie',
  'vintage',
  'technicolor',
  'pixelate',
  'invert',
  'blur',
  'sharpen',
  'emboss',
  'removecolor',
  'blacknwhite',
  'vibrance',
  'blendcolor',
  'huerotate',
  'resize',
  'saturation',
  'gamma'
]

export const fonts = [
  'Arial',
  'Arial Black',
  'Verdana',
  'Helvetica',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Georgia',
  'Garamond',
  'Courier New',
  'Brush Script MT',
  'Palatino',
  'Bookman',
  'Comic Sans MS',
  'Impact',
  'Lucida Sans Unicode',
  'Geneva',
  'Lucida Console'
]

export const colors = [
  material.red['500'],
  material.pink['500'],
  material.purple['500'],
  material.deepPurple['500'],
  material.indigo['500'],
  material.blue['500'],
  material.lightBlue['500'],
  material.cyan['500'],
  material.teal['500'],
  material.green['500'],
  material.lightGreen['500'],
  material.lime['500'],
  material.yellow['500'],
  material.amber['500'],
  material.orange['500'],
  material.deepOrange['500'],
  material.brown['500'],
  material.blueGrey['500'],
  'transparent'
]

export const selectionDependentTools = [
  'fill',
  'font',
  'filter',
  'opacity',
  'remove-bg',
  'stroke-color',
  'stroke-width'
]

export type ActiveTool =
  | 'select'
  | 'shapes'
  | 'text'
  | 'images'
  | 'draw'
  | 'fill'
  | 'stroke-color'
  | 'stroke-width'
  | 'font'
  | 'opacity'
  | 'filter'
  | 'settings'
  | 'ai'
  | 'remove-bg'
  | 'templates'

export const FILL_COLOR = 'rgba(0,0,0,1)'
export const STROKE_COLOR = 'rgba(0, 0, 0, 1)'
export const STROKE_WIDTH = 2
export const STROKE_DASH_ARRAY = []
export const FONT_FAMILY = 'Arial'
export const FONT_SIZE = 32
export const FONT_WEIGHT = 400

export const CIRCLE_OPTIONS = {
  radius: 225,
  left: 100,
  top: 100,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH
}

export const RECTANGLE_OPTIONS = {
  left: 100,
  top: 100,
  full: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0
}

export const TEXT_OPTIONS = {
  type: 'textbox',
  left: 100,
  top: 100,
  full: FILL_COLOR,
  fontSize: FONT_SIZE,
  fontFamily: FONT_FAMILY
}

export const TRIANGLE_OPTINOS = {
  left: 100,
  top: 100,
  full: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 400,
  height: 400,
  angle: 0
}
export const DIAMOND_OPTINOS = {
  left: 100,
  top: 100,
  full: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  width: 600,
  height: 600,
  angle: 0
}

export type EditorHookProps = {
  clearSelectionCallback?: () => void
}

export type BuildEditorProps = {
  undo: () => void
  redo: () => void
  save: (skip?: boolean) => void
  canUndo: () => void
  canRedo: () => void
  autoZoom: () => void
  copy: () => void
  paste: () => void
  canvas: fabric.Canvas
  fillColor: string
  strokeColor: string
  strokeWidth: number
  strokeDashArray: number[]
  selectedObjects: fabric.Object[]
  fontFamily: string
  setFillColor: (value: string) => void
  setStrokeColor: (value: string) => void
  setStrokeWidth: (value: number) => void
  setStrokeDashArray: (value: number[]) => void
  setFontFamily: (value: string) => void
}

export interface Editor {
  savePng: () => void
  saveJpg: () => void
  saveSvg: () => void
  saveJson: () => void
  loadJson: (json:string) => void
  onUndo: () => void
  onRedo: () => void
  canUndo: () => void
  canRedo: () => void
  autoZoom: () => void
  zoomIn: () => void
  zoomOut: () => void
  getWorkspace: () => fabric.Object | undefined
  changeBackground: (value: string) => void
  changeSize: (value: { width: number; height: number }) => void
  enableDrawingMode: () => void
  disableDrawingMode: () => void
  onCopy: () => void
  onPaste: () => void
  changeImageFilter: (value: string) => void
  addImage: (value: string) => void
  delete: () => void
  changeFontSize: (value: number) => void
  getActiveFontSize: () => void
  changeTextAlign: (value: string) => void
  getActiveTextAlign: () => void
  changeFontLinethrough: (value: boolean) => void
  getActiveFontLinethrough: () => void
  changeFontUnderline: (value: boolean) => void
  getActiveFontUnderline: () => void
  changeFontStyle: (value: string) => void
  getActiveFontStyle: () => void
  changeFontWeight: (value: number) => void
  getActiveFontWeight: () => void
  getActiveFontFamily: () => string
  changeFontFamily: (value: string) => void
  addText: (value: string, options?: ITextboxOptions) => void
  getActiveOpacity: () => number
  changeOpacity: (value: number) => void
  bringForward: () => void
  sendBackwards: () => void
  addCircle: () => void
  addSoftRectangle: () => void
  addRectangle: () => void
  addTriangle: () => void
  addInverseTriangle: () => void
  addDiamond: () => void
  changeFillColor: (value: string) => void
  changeStrokeWidth: (value: number) => void
  changeStrokeColor: (value: string) => void
  changeStrokeDashArray: (value: number[]) => void
  getActiveStrokeWidth: () => number
  getActiveFillColor: () => string
  getActiveStrokeColor: () => string
  getActiveStrokeDashArray: () => number[]
  canvas: fabric.Canvas
  selectedObjects: fabric.Object[]
}
