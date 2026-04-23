import { emit, on, showUI } from '@create-figma-plugin/utilities'
import { pushSelectionFrames } from './utils/push-selection.js'
import { exportSvgs } from './utils/export-svg.js'
import type {
  UIReadyEvent,
  ExportSvgsRequestEvent,
  ExportSvgsResultEvent
} from './types/events.js'

export default function () {
  showUI({ width: 380, height: 420 })

  figma.on('selectionchange', pushSelectionFrames)
  on<UIReadyEvent>('UI_READY', pushSelectionFrames)

  on<ExportSvgsRequestEvent>('EXPORT_SVGS_REQUEST', async () => {
    const result = await exportSvgs()
    emit<ExportSvgsResultEvent>('EXPORT_SVGS_RESULT', result)
  })
}
