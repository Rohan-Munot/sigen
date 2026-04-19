import type { EventHandler } from '@create-figma-plugin/utilities'

export type SelectionFrameNode = {
  id: string
  name: string
  width: number
  height: number
}

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
