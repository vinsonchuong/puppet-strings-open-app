/* @flow */
import test from 'ava'
import { closeTab, findElement } from 'puppet-strings'
import openApp from 'puppet-strings-open-app'

const browserPath = process.env.CI ? 'google-chrome' : 'chromium'

test('compiling and opening a web application', async t => {
  const app = await openApp(browserPath, 'fixtures/index.html')
  const root = await findElement(app, '#root')

  t.is(root.innerText, 'Hello World!')

  await closeTab(app)
})
