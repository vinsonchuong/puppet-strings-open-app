# puppet-strings-open-app
![npm](https://img.shields.io/npm/v/puppet-strings-open-app.svg)
[![Build Status](https://travis-ci.org/vinsonchuong/puppet-strings-open-app.svg?branch=master)](https://travis-ci.org/vinsonchuong/puppet-strings-open-app)
[![dependencies Status](https://david-dm.org/vinsonchuong/puppet-strings-open-app/status.svg)](https://david-dm.org/vinsonchuong/puppet-strings-open-app)
[![devDependencies Status](https://david-dm.org/vinsonchuong/puppet-strings-open-app/dev-status.svg)](https://david-dm.org/vinsonchuong/puppet-strings-open-app?type=dev)

An extension to [puppet-strings](https://github.com/vinsonchuong/puppet-strings)
for compiling and opening a web UI in Chrome.

## Example
To test a React component in isolation within Chrome:

### `ui/component.js`
```javascript
import { html } from 'htm/react'

export default function Component() {
  return html`
    <div>Hello World!</div>
  `
}
```

### `ui/component.test.js`
```javascript
import test from 'ava'
import { closeTab, findElement } from 'puppet-strings'
import openApp from 'puppet-strings-open-app'

test('rendering in a browser', async (t) => {
  const app = await openApp({
    path: './app',
    files: {
      'index.html': `
        <!doctype html>
        <script type="module" src="/index.js"></script>
        <div></div>
      `,
      'index.js': `
        import { createRoot } from 'react-dom/client'
        import { html } from 'htm/react'
        import Component from './component'

        const root = createRoot(document.body.firstElementChild)
        root.render(html\`<\${Component} />\`)
      `
    }
  })
  t.teardown(async () => {
    await closeTab(app)
  })

  const root = await findElement(app, 'div')
  t.is(root.innerText, 'Hello World!')
})
```


## Installation
Install [puppet-strings-open-app](https://yarnpkg.com/en/package/puppet-strings-open-app)
by running:

```sh
yarn add puppet-strings-open-app
```
