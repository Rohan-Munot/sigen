import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import type {
  ExportSvgsRequestEvent,
  SelectionFrameNode,
  SelectionFramesEvent,
  UIReadyEvent
} from '../types/events.js'

import { ActionsSection } from './sections/actions-section.js'
import { SelectionSection } from './sections/selection-section.js'
import { validateName } from '../utils/svg-name.js'

export function Root () {
  const [nodes, setNodes] = useState<SelectionFrameNode[]>([])
  const [nameErrors, setNameErrors] = useState<string[]>([])

  useEffect(() => {
    const unsubscribe = on<SelectionFramesEvent>('SELECTION_FRAMES', (payload) => {
      setNodes(payload.nodes)
      setNameErrors([])
    })
    emit<UIReadyEvent>('UI_READY')
    return unsubscribe
  }, [])

  function handlePublishClick() {
    const invalidNames = nodes
      .map((node) => node.name)
      .filter((name) => !validateName(name))

    if (invalidNames.length > 0) {
      setNameErrors(invalidNames)
      return
    }

    setNameErrors([])
    emit<ExportSvgsRequestEvent>('EXPORT_SVGS_REQUEST')
  }

  return (
    <div class="flex h-full flex-col min-h-0 gap-4 overflow-hidden bg-neutral-50 p-3 text-neutral-900">
      <SelectionSection nodes={nodes} />
      <ActionsSection nameErrors={nameErrors} onPublishClick={handlePublishClick} />
    </div>
  )
}
