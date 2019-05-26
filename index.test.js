/* @flow */
import test from 'ava'
import { closeTab, findElement } from 'puppet-strings'
import openApp from 'puppet-strings-open-app'

test('compiling and opening a web application', async t => {
  const app = await openApp('fixtures/index.html')
  const root = await findElement(app, '#root')

  t.is(root.innerText, 'Hello World!')

  await closeTab(app)
})
