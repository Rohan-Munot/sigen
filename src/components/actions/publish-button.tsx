import { h } from 'preact'

type PublishButtonProps = {
  onClick: () => void
}

export function PublishButton (props: PublishButtonProps) {
  const { onClick } = props

  return (
    <div
      class="cursor-pointer rounded-md bg-orange-400 p-2 text-center text-sm text-white"
      onClick={onClick}
    >
      Publish
    </div>
  )
}
