import { h } from 'preact'

import type { ExportFramework } from '../../types/events.js'

import { FrameworkSelector } from '../actions/framework-selector.js'
import { PublishButton } from '../actions/publish-button.js'

type ActionsSectionProps = {
  selectedFrameworks: ExportFramework[]
  onToggleFramework: (framework: ExportFramework) => void
  onPublishClick: () => void
  publishDisabled: boolean
}

export function ActionsSection (props: ActionsSectionProps) {
  const {
    onPublishClick,
    onToggleFramework,
    publishDisabled,
    selectedFrameworks
  } = props

  return (
    <section class="flex min-h-0 flex-1 flex-col">
      <div class="h-px w-full shrink-0 bg-neutral-200" />
      <div class="flex min-h-0 flex-1 flex-col gap-2 pt-3">
        <h2 class="shrink-0 text-[13px] font-semibold tracking-tight text-neutral-800">
          Actions
        </h2>
        <div class="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <FrameworkSelector
            onToggleFramework={onToggleFramework}
            selectedFrameworks={selectedFrameworks}
          />
        </div>
         <PublishButton disabled={publishDisabled} onClick={onPublishClick} />
      </div>
    </section>
  )
}
