import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

import type {
  ExportFramework,
  ExportSvgsRequestEvent,
  ExportSvgsResultEvent,
  SelectionFrameNode,
  SelectionFramesEvent,
  UIReadyEvent
} from '../types/events.js'

import { getExportFramework, EXPORT_FRAMEWORKS } from '../core/export-frameworks.js'
import type { GeneratedFile } from '../core/generators/react/index.js'
import { createZip, downloadZip } from '../core/packaging/zip.js'
import { toComponentName, toFileName } from '../core/utils/naming.js'
import { optimizeSvg } from '../utils/optimize-svg.js'
import { getNameValidationMessage } from '../utils/svg-name.js'
import { ActionsSection } from './sections/actions-section.js'
import { SelectionSection } from './sections/selection-section.js'
import { ToastProvider, useToast } from './shared/toast-provider.js'

export function Root () {
  return (
    <ToastProvider>
      <RootContent />
    </ToastProvider>
  )
}

function RootContent () {
  const { dismissToast, showToast } = useToast()
  const [nodes, setNodes] = useState<SelectionFrameNode[]>([])
  const [invalidNodeMessages, setInvalidNodeMessages] = useState<Record<string, string>>({})
  const [selectedFrameworks, setSelectedFrameworks] = useState<ExportFramework[]>(
    EXPORT_FRAMEWORKS.map((framework) => framework.id)
  )
  const exportToastIdRef = useRef<string | null>(null)

  useEffect(() => {
    const unsubscribe = on<SelectionFramesEvent>('SELECTION_FRAMES', (payload) => {
      setNodes(payload.nodes)
      setInvalidNodeMessages({})
    })
    emit<UIReadyEvent>('UI_READY')
    return unsubscribe
  }, [])

  useEffect(() => {
    const unsubscribe = on<ExportSvgsResultEvent>('EXPORT_SVGS_RESULT', (payload) => {
      if (exportToastIdRef.current !== null) {
        dismissToast(exportToastIdRef.current)
        exportToastIdRef.current = null
      }

      const optimized = payload.icons.map((icon) => ({
        nodeId: icon.nodeId,
        name: icon.name,
        svg: optimizeSvg(icon.svg),
        componentName: toComponentName(icon.name),
        fileName: toFileName(icon.name)
      }))

      if (optimized.length === 0) {
        showToast({
          title: 'Export failed',
          message: payload.errors.length > 0
            ? payload.errors[0].message
            : 'No exportable icons were found in the selection.',
          variant: 'error'
        })
        return
      }

      const files: GeneratedFile[] = payload.frameworks.flatMap((frameworkId) => {
        const framework = getExportFramework(frameworkId)

        return framework.generateFiles(optimized).map((file) => ({
          ...file,
          path: `${framework.packageFolder}/${file.path}`
        }))
      })

      if (files.length === 0) {
        showToast({
          title: 'Export failed',
          message: payload.errors.length > 0
            ? payload.errors[0].message
            : 'No export files were generated.',
          variant: 'error'
        })
        return
      }

      const zip = createZip(files)
      downloadZip(zip, 'sigen-icons.zip')

      showToast({
        title: 'Export ready',
        message: `Generated ${optimized.length} icon${optimized.length === 1 ? '' : 's'} for ${formatFrameworkList(payload.frameworks)}.`,
        variant: 'success'
      })

      if (payload.errors.length > 0) {
        showToast({
          title: 'Some icons were skipped',
          message: `${payload.errors.length} node${payload.errors.length === 1 ? '' : 's'} could not be exported.`,
          variant: 'error'
        })
      }
    })
    return unsubscribe
  }, [dismissToast, showToast])

  function handleToggleFramework (framework: ExportFramework) {
    setSelectedFrameworks((current) => (
      current.includes(framework)
        ? current.filter((item) => item !== framework)
        : [...current, framework]
    ))
  }

  const publishDisabled = nodes.length === 0 || selectedFrameworks.length === 0

  function handlePublishClick () {
    if (publishDisabled) {
      return
    }

    const invalidNodes = nodes.reduce<Array<{ id: string, name: string, message: string }>>((acc, node) => {
      const validationMessage = getNameValidationMessage(node.name)

      if (validationMessage !== null) {
        acc.push({ id: node.id, name: node.name, message: validationMessage })
      }

      return acc
    }, [])

    if (invalidNodes.length > 0) {
      const nextInvalidNodeMessages = invalidNodes.reduce<Record<string, string>>((acc, item) => {
        acc[item.id] = item.message
        return acc
      }, {})
      setInvalidNodeMessages(nextInvalidNodeMessages)
      showToast({
        message: `${invalidNodes.length} icon${invalidNodes.length === 1 ? '' : 's'} ${invalidNodes.length === 1 ? 'has' : 'have'} an invalid name. Names must start with "icon/*".`,
        variant: 'error'
      })
      return
    }

    setInvalidNodeMessages({})
    exportToastIdRef.current = showToast({
      title: 'Exporting icons',
      message: `Preparing ${nodes.length} icon${nodes.length === 1 ? '' : 's'} for ${formatFrameworkList(selectedFrameworks)}.`,
      variant: 'info',
      duration: 0
    })
    emit<ExportSvgsRequestEvent>('EXPORT_SVGS_REQUEST', { frameworks: selectedFrameworks })
  }

  return (
    <div class="relative flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-neutral-50 p-3 text-neutral-900">
      <SelectionSection nodes={nodes} invalidNodeMessages={invalidNodeMessages} />
      <ActionsSection
        onPublishClick={handlePublishClick}
        onToggleFramework={handleToggleFramework}
        publishDisabled={publishDisabled}
        selectedFrameworks={selectedFrameworks}
      />
    </div>
  )
}

function formatFrameworkList (frameworks: ExportFramework[]) {
  return frameworks
    .map((framework) => getExportFramework(framework).label)
    .join(', ')
}
