import { generateReactIcons } from './generators/react/index.js'
import type { GeneratedFile, OptimizedIcon } from './generators/react/index.js'
import { generateReactNativeIcons } from './generators/react-native/index.js'
import type { ExportFramework } from '../types/events.js'

export type ExportFrameworkDefinition = {
  id: ExportFramework
  label: string
  description: string
  packageFolder: string
  generateFiles: (icons: OptimizedIcon[]) => GeneratedFile[]
}

export const EXPORT_FRAMEWORKS: ExportFrameworkDefinition[] = [
  {
    id: 'react',
    label: 'React',
    description: 'Generates web SVG icon components for React apps.',
    packageFolder: 'sigen-react',
    generateFiles: generateReactIcons
  },
  {
    id: 'react-native',
    label: 'React Native',
    description: 'Generates icon components powered by react-native-svg.',
    packageFolder: 'sigen-react-native',
    generateFiles: generateReactNativeIcons
  }
]

export function getExportFramework (id: ExportFramework): ExportFrameworkDefinition {
  const framework = EXPORT_FRAMEWORKS.find((item) => item.id === id)

  if (framework === undefined) {
    throw new Error(`Unsupported export framework: ${id}`)
  }

  return framework
}
