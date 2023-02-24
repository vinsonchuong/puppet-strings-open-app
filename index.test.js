import test from 'ava'
import {closeTab, findElement} from 'puppet-strings'
import openApp, {logger} from './index.js'

test('compiling and opening a web application', async (t) => {
  logger.on('log', (_, message) => t.log(message))

  const app = await openApp('./fixtures')
  const root = await findElement(app, '#root')

  t.is(root.textContent, 'Hello World!')

  await closeTab(app)
})
