import { h } from 'preact'

import type { SelectionFrameNode } from '../../types/events.js'

import { SelectionRow } from './selection-row.js'

type SelectionListProps = {
  nodes: SelectionFrameNode[]
  invalidNodeMessages: Record<string, string>
}

export function SelectionList (props: SelectionListProps) {
  const { nodes, invalidNodeMessages } = props

  return (
    <div class="flex flex-col p-1">
      {nodes.map((node, index) => (
        <SelectionRow
          errorMessage={invalidNodeMessages[node.id]}
          key={node.id}
          node={node}
          index={index}
        />
      ))}
    </div>
  )
}
