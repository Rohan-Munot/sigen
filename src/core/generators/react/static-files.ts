// Shared IconProps type included in every export
export const TYPES_FILE = `import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string
  color?: string
  strokeWidth?: number | string
}
`
