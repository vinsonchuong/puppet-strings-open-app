import {openTab, closeBrowser} from 'puppet-strings'
import {openChrome} from 'puppet-strings-chrome'
import getPort from 'get-port'
import {startServer, stopServer, Logger, compose} from 'passing-notes'
import serveUi from 'passing-notes-ui'

export const logger = new Logger()

export default async function openApp({path, files}) {
  const port = await getPort()
  const server = await startServer(
    {port},
    compose(
      serveUi({
        path,
        files,
        logger,
      }),
      () => () => ({status: 404}),
    ),
  )

  const browser = await openChrome()
  const tab = await openTab(browser, `http://localhost:${port}`, {
    timeout: 30_000,
  })

  tab.puppeteer.page.close = async () => {
    await closeBrowser(browser)
    await stopServer(server)
  }

  return tab
}
