import type { EventHandler } from '@create-figma-plugin/utilities'

export type SelectionFrameNode = {
  id: string
  name: string
  width: number
  height: number
}

export type RawIcon = {
  nodeId: string
  name: string
  svg: string
  width: number
  height: number
}

export type ExportFramework = 'react' | 'react-native'

export type SelectionFramesPayload = {
  nodes: SelectionFrameNode[]
}

export interface SelectionFramesEvent extends EventHandler {
  name: 'SELECTION_FRAMES'
  handler: (payload: SelectionFramesPayload) => void
}

export interface UIReadyEvent extends EventHandler {
  name: 'UI_READY'
  handler: () => void
}

export interface ExportSvgsRequestEvent extends EventHandler {
  name: 'EXPORT_SVGS_REQUEST'
  handler: (payload: { frameworks: ExportFramework[] }) => void
}

export interface ExportSvgsResultEvent extends EventHandler {
  name: 'EXPORT_SVGS_RESULT'
  handler: (payload: {
    icons: RawIcon[]
    errors: Array<{ nodeId: string; message: string }>
    frameworks: ExportFramework[]
  }) => void
}
