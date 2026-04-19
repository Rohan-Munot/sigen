import { optimize } from 'svgo/browser'

export function optimizeSvg(svg: string): string {
  const result = optimize(svg, {
    multipass: true,
    plugins: [
      'preset-default',
      {
        name: 'convertColorsToCurrentColor',
        fn: () => ({
          element: {
            enter: (node) => {
              const { fill, stroke } = node.attributes
              if (fill && fill !== 'none') {
                node.attributes.fill = 'currentColor'
              }
              if (stroke && stroke !== 'none') {
                node.attributes.stroke = 'currentColor'
              }
            }
          }
        })
      }
    ]
  })

  return result.data
}
