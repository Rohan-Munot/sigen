import { h } from 'preact'

type NameErrorsProps = {
  errors: string[]
}

export function NameErrors (props: NameErrorsProps) {
  const { errors } = props

  if (errors.length === 0) {
    return null
  }

  return (
    <div class="rounded border border-red-200 bg-red-50 p-2 text-red-700">
      Invalid names: {errors.join(', ')}
    </div>
  )
}
