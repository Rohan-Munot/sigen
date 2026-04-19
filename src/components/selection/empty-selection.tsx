import { h } from 'preact'

export function EmptySelection () {
  return (
    <div class="flex min-h-[8rem] flex-1 flex-col items-center justify-center gap-3 px-4 py-6 text-center">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-orange-600"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </div>
      <div class="flex flex-col gap-1">
        <p class="text-[12px] font-medium text-neutral-500">
          No layers selected
        </p>
        <p class="text-[11px] text-neutral-400">
          Select frames on the canvas
        </p>
      </div>
    </div>
  )
}
