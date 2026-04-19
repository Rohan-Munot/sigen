import { on, showUI } from '@create-figma-plugin/utilities'

import { pushSelectionFrames } from './main/push-selection.js'
import type { UIReadyEvent } from './types/events.js'

export default function () {
  const options = { width: 380, height: 420 }
  showUI(options)

  figma.on('selectionchange', pushSelectionFrames)
  on<UIReadyEvent>('UI_READY', pushSelectionFrames)
}
