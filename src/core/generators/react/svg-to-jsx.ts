// Convert SVG attribute name to JSX (stroke-width -> strokeWidth, class -> className)
function svgAttrToJsx(attr: string): string {
  if (attr === 'class') return 'className'
  return attr.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
}

// Convert all attributes in an SVG string to JSX-compatible format
function convertAttrsToJsx(svgContent: string): string {
  // Match attribute="value" or attribute='value' patterns
  return svgContent.replace(/\s([a-z-]+)=/gi, (_, attr: string) => {
    return ` ${svgAttrToJsx(attr)}=`
  })
}

// Parse SVG and extract viewBox + JSX-ready children
export function parseSvg(svg: string): { viewBox: string; children: string } {
  const viewBoxMatch = svg.match(/<svg\b[^>]*\bviewBox\s*=\s*(["'])(.*?)\1/i)
  const viewBox = viewBoxMatch?.[2] ?? ''

  const contentMatch = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/i)
  const rawChildren = (contentMatch?.[1] ?? '').trim()

  // Convert attributes and normalize self-closing tags
  const children = convertAttrsToJsx(rawChildren).replace(/\s*\/>/g, ' />')

  return { viewBox, children }
}
