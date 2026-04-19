import { h } from 'preact'

import { PublishButton } from '../actions/publish-button.js'

type ActionsSectionProps = {
  onPublishClick: () => void
}

export function ActionsSection (props: ActionsSectionProps) {
  const { onPublishClick } = props

  return (
    <section class="flex min-h-0 flex-1 flex-col">
      <div class="h-px w-full shrink-0 bg-neutral-200" />
      <div class="flex min-h-0 flex-1 flex-col gap-2 pt-3">
        <h2 class="shrink-0 text-[13px] font-semibold tracking-tight text-neutral-800">
          Actions
        </h2>
        <div class="min-h-0 flex-1 bg-white p-2 text-xs text-neutral-700" />
        <PublishButton onClick={onPublishClick} />
      </div>
    </section>
  )
}
