import { h } from 'preact'

import { NameErrors } from '../actions/name-errors.js'
import { PublishButton } from '../actions/publish-button.js'

type ActionsSectionProps = {
  nameErrors: string[]
  onPublishClick: () => void
}

export function ActionsSection (props: ActionsSectionProps) {
  const { nameErrors, onPublishClick } = props

  return (
    <section class="flex min-h-0 flex-1 flex-col">
      <div class="h-px w-full shrink-0 bg-neutral-200" />
      <div class="flex min-h-0 flex-1 flex-col gap-2 pt-3">
        <h2 class="shrink-0 text-[13px] font-semibold tracking-tight text-neutral-800">
          Actions
        </h2>
        <div class="min-h-0 flex-1 bg-white p-2 text-xs text-neutral-700">
          <NameErrors errors={nameErrors} />
        </div>
        <PublishButton onClick={onPublishClick} />
      </div>
    </section>
  )
}
