import { h } from 'preact'

import type { SelectionFrameNode } from '../../types/events.js'

import { EmptySelection } from '../selection/empty-selection.js'
import { SelectionList } from '../selection/selection-list.js'

type SelectionSectionProps = {
  nodes: SelectionFrameNode[]
  invalidNodeMessages: Record<string, string>
}

export function SelectionSection (props: SelectionSectionProps) {
  const { nodes, invalidNodeMessages } = props

  return (
    <section class="flex flex-col gap-2">
      <header class="flex shrink-0 items-center justify-between">
        <h2 class="text-[13px] font-semibold tracking-tight text-neutral-800">
          Selection
        </h2>
        {nodes.length > 0 ? (
          <span class="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-medium tabular-nums text-orange-700">
            {nodes.length}
          </span>
        ) : null}
      </header>

      <div class="flex max-h-48 flex-col overflow-y-auto bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {nodes.length === 0 ? (
          <EmptySelection />
        ) : (
          <SelectionList nodes={nodes} invalidNodeMessages={invalidNodeMessages} />
        )}
      </div>
    </section>
  )
}
