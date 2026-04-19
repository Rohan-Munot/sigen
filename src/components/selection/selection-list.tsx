import { h } from 'preact'

import type { SelectionFrameNode } from '../../types/events.js'

import { SelectionRow } from './selection-row.js'

type SelectionListProps = {
  nodes: SelectionFrameNode[]
  invalidNodeIds: string[]
}

export function SelectionList (props: SelectionListProps) {
  const { nodes, invalidNodeIds } = props

  return (
    <div class="flex flex-col p-1">
      {nodes.map((node, index) => (
        <SelectionRow
          key={node.id}
          node={node}
          index={index}
          hasError={invalidNodeIds.includes(node.id)}
        />
      ))}
    </div>
  )
}
