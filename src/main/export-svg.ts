import { RawIcon } from '../types/events'

type ExportError = {
  nodeId: string
  message: string
}

function isExportable(node: SceneNode): node is SceneNode & ExportMixin {
  return 'exportAsync' in node
}

export async function exportSvgs(): Promise<{
  icons: RawIcon[]
  errors: ExportError[]
}> {
  const selection = figma.currentPage.selection
  const icons: RawIcon[] = []
  const errors: ExportError[] = []

  for (const node of selection) {
    if (!isExportable(node)) {
      errors.push({ nodeId: node.id, message: 'Node is not exportable' })
      continue
    }

    try {
      const rawSvg = await node.exportAsync({ format: 'SVG_STRING' })
      icons.push({
        nodeId: node.id,
        name: node.name,
        svg: rawSvg,
        width: node.width,
        height: node.height
      })
    } catch (error) {
      errors.push({
        nodeId: node.id,
        message: error instanceof Error ? error.message : String(error)
      })
    }
  }

  return { icons, errors }
}
