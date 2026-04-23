import { h } from 'preact'

import type { SelectionFrameNode } from '../../types/events.js'

type SelectionRowProps = {
  node: SelectionFrameNode
  index: number
  errorMessage?: string
}

export function SelectionRow (props: SelectionRowProps) {
  const { errorMessage, node, index } = props
  const hasError = errorMessage !== undefined

  return (
    <div
      class={`flex cursor-default items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors active:scale-[0.995] ${
        hasError ? 'hover:bg-red-50' : 'hover:bg-orange-50'
      }`}
    >
      <span
        class={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-medium ${
          hasError
            ? 'bg-red-100 text-red-700'
            : 'bg-orange-100 text-orange-700'
        }`}
      >
        {index + 1}
      </span>

      <span
        class={`min-w-0 flex-1 truncate text-[12px] ${
          hasError ? 'text-red-700' : 'text-neutral-800'
        }`}
        title={node.name}
      >
        {node.name}
      </span>

      <span class="shrink-0 font-mono text-[11px] tabular-nums text-neutral-400">
        {formatNumber(node.width)}×{formatNumber(node.height)}
      </span>

      {hasError ? (
        <span class="shrink-0 rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">
          Invalid
        </span>
      ) : null}
    </div>
  )
}

function formatNumber (n: number): string {
  return Number.isInteger(n) ? String(Math.round(n)) : n.toFixed(1)
}
