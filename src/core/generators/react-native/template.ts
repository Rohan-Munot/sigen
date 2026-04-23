function toComponentTag(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1)
}

function getSvgImports(children: string): string {
  const tags = new Set<string>()
  const matches = children.matchAll(/<\/?([a-z][a-z0-9]*)\b/g)

  for (const match of matches) {
    const tag = match[1]
    if (tag !== 'svg') {
      tags.add(toComponentTag(tag))
    }
  }

  return Array.from(tags).sort().join(', ')
}

function toReactNativeSvg(children: string): string {
  return children
    .replace(/<(\/?)([a-z][a-z0-9]*)\b/g, (_, slash: string, tag: string) => `<${slash}${toComponentTag(tag)}`)
    .replace(/\s(?:className|class)=(["']).*?\1/g, '')
    .replace(/(fill|stroke)="currentColor"/g, '$1={colour}')
}

export function generateIconComponent(opts: {
  componentName: string
  viewBox: string
  children: string
}): string {
  const { componentName, viewBox, children } = opts
  const nativeChildren = toReactNativeSvg(children)
  const svgImports = getSvgImports(nativeChildren)
  const namedImports = svgImports !== '' ? `, { ${svgImports} }` : ''

  return `import * as React from 'react'
import Svg${namedImports} from 'react-native-svg'
import type { IconProps } from './types'

const ${componentName} = ({ width = 24, height = 24, colour = '#615F63', ...props }: IconProps) => (
  <Svg width={width} height={height} viewBox="${viewBox}" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    ${nativeChildren}
  </Svg>
)

export default ${componentName}
`
}
