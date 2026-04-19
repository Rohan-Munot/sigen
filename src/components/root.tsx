import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import type {
  SelectionFrameNode,
  SelectionFramesEvent,
  UIReadyEvent
} from '../types/events.js'

import { EmptySelection } from './empty-selection.js'
import { SelectionList } from './selection-list.js'

export function Root () {
  const [nodes, setNodes] = useState<SelectionFrameNode[]>([])

  useEffect(() => {
    const unsubscribe = on<SelectionFramesEvent>('SELECTION_FRAMES', (payload) => {
      setNodes(payload.nodes)
    })
    emit<UIReadyEvent>('UI_READY')
    return unsubscribe
  }, [])

  return (
    <div class="flex h-full flex-col min-h-0 gap-4 overflow-hidden bg-neutral-50 p-3 text-neutral-900">
      <section class="flex flex-col gap-2">
        <header class="flex shrink-0 items-center justify-between">
          <h2 class="text-[13px] font-semibold tracking-tight text-neutral-800">
            Selection
          </h2>
          {nodes.length > 0 && (
            <span class="rounded-full bg-orange-100 px-2 py-0.5 text-[11px] font-medium tabular-nums text-orange-700">
              {nodes.length}
            </span>
          )}
        </header>

        <div class="flex max-h-48 flex-col overflow-y-auto bg-white [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {nodes.length === 0 ? (
            <EmptySelection />
          ) : (
            <SelectionList nodes={nodes} />
          )}
        </div>
      </section>

      <section class="flex min-h-0 flex-1 flex-col">
        <div class="h-px w-full shrink-0 bg-neutral-200" />
        <div class="flex min-h-0 flex-1 flex-col gap-2 pt-3">
          <h2 class="shrink-0 text-[13px] font-semibold tracking-tight text-neutral-800">
            Actions
          </h2>
          <div class="min-h-0 flex-1 bg-white">hi</div>
          <div
            class="cursor-pointer rounded-md bg-orange-400 p-2 text-center text-sm text-white"
          >
            Publish
          </div>
        </div>
      </section>
    </div>
  )
}
