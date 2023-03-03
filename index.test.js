import test from 'ava'
import {useTemporaryDirectory} from 'ava-patterns'
import {closeTab, findElement} from 'puppet-strings'
import openApp, {logger} from './index.js'

test('compiling and opening a web application', async (t) => {
  const directory = await useTemporaryDirectory(t)
  await directory.writeFile(
    'component.js',
    `
    import { html } from 'htm/react'

    export default function() {
      return html\`<span>Hello World!</span>\`
    }
  `,
  )

  logger.on('log', (_, message) => t.log(message))
  const app = await openApp({
    path: directory.path,
    files: {
      'index.html': `
        <!doctype html>
        <script type="module" src="/index.js"></script>
        <div></div>
      `,
      'index.js': `
        import { createRoot } from 'react-dom/client'
        import { html } from 'htm/react'
        import Component from './component.js'

        const root = createRoot(document.body.firstElementChild)
        root.render(html\`<\${Component} />\`)
      `,
    },
  })
  t.teardown(async () => {
    await closeTab(app)
  })

  const root = await findElement(app, 'div')
  t.is(root.textContent, 'Hello World!')
})
