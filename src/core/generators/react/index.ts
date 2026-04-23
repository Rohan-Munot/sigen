import { parseSvg } from './svg-to-jsx'
import { generateIconComponent } from './template'
import { TYPES_FILE } from './static-files'

export type GeneratedFile = { path: string; contents: string }

export type OptimizedIcon = {
  nodeId: string
  name: string
  svg: string
  componentName: string
  fileName: string
}

// Generate React icon components with tree-shakeable barrel export
export function generateReactIcons(icons: OptimizedIcon[]): GeneratedFile[] {
  const files: GeneratedFile[] = []

  // Add shared types file
  files.push({ path: 'types.ts', contents: TYPES_FILE })

  // Generate each icon component
  for (const icon of icons) {
    const { viewBox, children } = parseSvg(icon.svg)
    const code = generateIconComponent({
      componentName: icon.componentName,
      viewBox,
      children
    })
    files.push({ path: `${icon.fileName}.tsx`, contents: code })
  }

  // Generate barrel index for tree-shaking (named exports only)
  const exports = icons
    .map((i) => `export { ${i.componentName} } from './${i.fileName}'`)
    .join('\n')
  files.push({ path: 'index.ts', contents: exports + '\n' })

  return files
}
