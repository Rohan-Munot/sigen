import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import type {
  ExportSvgsRequestEvent,
  ExportSvgsResultEvent,
  SelectionFrameNode,
  SelectionFramesEvent,
  UIReadyEvent
} from '../types/events.js'

import { ActionsSection } from './sections/actions-section.js'
import { SelectionSection } from './sections/selection-section.js'
import { optimizeSvg } from '../utils/optimize-svg.js'
import { validateName } from '../utils/svg-name.js'

export function Root () {
  const [nodes, setNodes] = useState<SelectionFrameNode[]>([])
  const [invalidNodeIds, setInvalidNodeIds] = useState<string[]>([])

  useEffect(() => {
    const unsubscribe = on<SelectionFramesEvent>('SELECTION_FRAMES', (payload) => {
      setNodes(payload.nodes)
      setInvalidNodeIds([])
    })
    emit<UIReadyEvent>('UI_READY')
    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = on<ExportSvgsResultEvent>('EXPORT_SVGS_RESULT', (payload) => {
      for (const icon of payload.icons) {
        console.log(`[SVGO][before] ${icon.name}`, icon.svg)
        const optimized = optimizeSvg(icon.svg)
        console.log(`[SVGO][after] ${icon.name}`, optimized)
      }
    })
    return unsubscribe
  }, [])

  function handlePublishClick() {
    const nextInvalidNodeIds = nodes
      .filter((node) => !validateName(node.name))
      .map((node) => node.id)

    if (nextInvalidNodeIds.length > 0) {
      setInvalidNodeIds(nextInvalidNodeIds)
      return
    }

    setInvalidNodeIds([])
    emit<ExportSvgsRequestEvent>('EXPORT_SVGS_REQUEST')
  }

  return (
    <div class="flex h-full flex-col min-h-0 gap-4 overflow-hidden bg-neutral-50 p-3 text-neutral-900">
      <SelectionSection nodes={nodes} invalidNodeIds={invalidNodeIds} />
      <ActionsSection onPublishClick={handlePublishClick} />
    </div>
  )
}
