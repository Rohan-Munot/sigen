import { h } from 'preact'

import type { SelectionFrameNode } from '../../types/events.js'

type SelectionRowProps = {
  node: SelectionFrameNode
  index: number
}

export function SelectionRow (props: SelectionRowProps) {
  const { node, index } = props

  return (
    <div class="flex cursor-default items-center gap-2 rounded-md px-2.5 py-1.5 transition-colors hover:bg-orange-50 active:scale-[0.995]">
      <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-orange-100 text-[10px] font-medium text-orange-700">
        {index + 1}
      </span>

      <span
        class="min-w-0 flex-1 truncate text-[12px] text-neutral-800"
        title={node.name}
      >
        {node.name}
      </span>

      <span class="shrink-0 font-mono text-[11px] tabular-nums text-neutral-400">
        {formatNumber(node.width)}×{formatNumber(node.height)}
      </span>
    </div>
  )
}

function formatNumber (n: number): string {
  return Number.isInteger(n) ? String(Math.round(n)) : n.toFixed(1)
}
