import { render } from '@create-figma-plugin/ui'
import { h } from 'preact'
import '!./output.css'

function Plugin () {
  return (
    <h1 class="text-xl font-bold p-2 bg-amber-100 text-blue-400 h-full">
      Hello, World!
    </h1>
  )
}

export default render(Plugin)
