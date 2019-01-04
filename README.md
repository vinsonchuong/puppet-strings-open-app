# puppet-strings-open-app
![npm](https://img.shields.io/npm/v/puppet-strings-open-app.svg)
[![Build Status](https://travis-ci.org/vinsonchuong/puppet-strings-open-app.svg?branch=master)](https://travis-ci.org/vinsonchuong/puppet-strings-open-app)
[![dependencies Status](https://david-dm.org/vinsonchuong/puppet-strings-open-app/status.svg)](https://david-dm.org/vinsonchuong/puppet-strings-open-app)
[![devDependencies Status](https://david-dm.org/vinsonchuong/puppet-strings-open-app/dev-status.svg)](https://david-dm.org/vinsonchuong/puppet-strings-open-app?type=dev)

An extension to [puppet-strings](https://github.com/vinsonchuong/puppet-strings)
for compiling and opening a web application in Chrome

## Example

### `app/index.html`
```html
<!doctype html>
<meta charset="utf-8">
<script async src="index.js"></script>
<div id="root"></div>
```

### `app/index.js`
```js
import React from 'react'
import { render } from 'react-dom'

render(<div>Hello World!</div>, window.root)
```

### `test.js`
```js
import { closeBrowser, findElement } from 'puppet-strings'
import openApp from 'puppet-strings-open-app'

async function run() {
  const app = await openApp('app/index.html')
  const root = await findElement(app, '#root')

  console.log(root.innerText)

  await closeBrowser(app)
}

run()
```


## Installation
Install [puppet-strings-open-app](https://yarnpkg.com/en/package/puppet-strings-open-app)
by running:

```sh
yarn add puppet-strings-open-app
```
