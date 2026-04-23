// Generate a React icon component from parsed SVG data
export function generateIconComponent(opts: {
  componentName: string
  viewBox: string
  children: string
}): string {
  const { componentName, viewBox, children } = opts

  return `import { forwardRef } from 'react'
import type { IconProps } from './types'

export const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
  function ${componentName}({ size = 24, color = '#615F63', strokeWidth = 2, ...props }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="${viewBox}"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        ${children}
      </svg>
    )
  }
)
`
}
