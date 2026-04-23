import { h } from 'preact'

import { EXPORT_FRAMEWORKS } from '../../core/export-frameworks.js'
import type { ExportFramework } from '../../types/events.js'

type FrameworkSelectorProps = {
  selectedFrameworks: ExportFramework[]
  onToggleFramework: (framework: ExportFramework) => void
}

export function FrameworkSelector (props: FrameworkSelectorProps) {
  const { onToggleFramework, selectedFrameworks } = props

  return (
    <div class="flex flex-col gap-2">
      <p class="text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-500">
        Select Frameworks
      </p>
      <div class="flex flex-row gap-3">
        {EXPORT_FRAMEWORKS.map((framework) => {
          const checked = selectedFrameworks.includes(framework.id)

          return (
            <div
              key={framework.id}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              class="flex select-none items-center gap-1 outline-none"
              style={{cursor: 'pointer'}}
              onClick={() => onToggleFramework(framework.id)}
              onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                  event.preventDefault()
                  onToggleFramework(framework.id)
                }
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '14px',
                  height: '14px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  borderRadius: '3px',
                  border: `1.5px solid ${checked ? '#f97316' : '#737373'}`,
                  backgroundColor: checked ? '#f97316' : '#ffffff',
                  transition: 'background-color 120ms ease, border-color 120ms ease'
                }}
              >
                {checked ? (
                  <svg
                    viewBox="0 0 12 12"
                    width="10"
                    height="10"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="2.5,6.5 5,9 9.5,3.5" />
                  </svg>
                ) : null}
              </div>
              <span class="text-[12px] leading-4 text-neutral-900"
                style={{ cursor: 'pointer' }}
              >
                {framework.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
