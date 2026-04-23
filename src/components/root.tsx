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
import { toComponentName, toFileName } from '../core/utils/naming.js'
import { generateReactIcons } from '../core/generators/react/index.js'
import { generateReactNativeIcons } from '../core/generators/react-native/index.js'
import type { GeneratedFile } from '../core/generators/react/index.js'
import { createZip, downloadZip } from '../core/packaging/zip.js'

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
      // Optimize SVGs and derive component/file names
      const optimized = payload.icons.map((icon) => ({
        nodeId: icon.nodeId,
        name: icon.name,
        svg: optimizeSvg(icon.svg),
        componentName: toComponentName(icon.name),
        fileName: toFileName(icon.name)
      }))

      const reactFiles = generateReactIcons(optimized)
      const reactNativeFiles = generateReactNativeIcons(optimized)
      const files: GeneratedFile[] = [
        ...reactFiles.map((file) => ({ ...file, path: `react/${file.path}` })),
        ...reactNativeFiles.map((file) => ({ ...file, path: `react-native/${file.path}` }))
      ]
      const zip = createZip(files)
      downloadZip(zip, 'icons.zip')
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
