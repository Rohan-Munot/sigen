import { h } from 'preact'
import { useState } from 'preact/hooks'

type PublishButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export function PublishButton (props: PublishButtonProps) {
  const { disabled = false, onClick } = props
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)

  const backgroundColor = disabled
    ? '#fdba74'
    : pressed
      ? '#ea580c'
      : hovered
        ? '#f97316'
        : '#fb923c'

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className={`w-full rounded-md border-none appearance-none px-3 py-2 h-9 text-[13px] leading-4 font-semibold text-white transition-colors duration-120 ${disabled ? 'cursor-not-allowed opacity-[0.85]' : 'cursor-pointer'}`}
      style={{
        backgroundColor
      }}
    >
      Publish
    </button>
  )
}
