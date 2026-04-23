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
      style={{
        width: '100%',
        padding: '8px 12px',
        borderRadius: '6px',
        border: 'none',
        appearance: 'none',
        fontSize: '13px',
        fontWeight: 600,
        lineHeight: '16px',
        color: '#ffffff',
        backgroundColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.85 : 1,
        transition: 'background-color 120ms ease'
      }}
    >
      Publish
    </button>
  )
}
