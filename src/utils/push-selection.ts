import { emit } from '@create-figma-plugin/utilities'

import type { SelectionFramesEvent, SelectionFramesPayload } from '../types/events.js'

export function getSelectionFrames (): SelectionFramesPayload {
  const nodes = figma.currentPage.selection.map((node) => ({
    id: node.id,
    name: node.name,
    width: node.width,
    height: node.height
  }))
  return { nodes }
}

export function pushSelectionFrames (): void {
  emit<SelectionFramesEvent>('SELECTION_FRAMES', getSelectionFrames())
}
