/* @flow */
import type { Tab } from 'puppet-strings'
import { openTab, closeBrowser } from 'puppet-strings'
import { openChrome } from 'puppet-strings-chrome'
import {
  getPort,
  startServer,
  stopServer,
  respondToRequests,
  serveUi
} from 'passing-notes'

export default async function(appPath: string): Promise<Tab> {
  const port = await getPort()
  const server = await new Promise((resolve, reject) => {
    const server = startServer(
      port,
      respondToRequests(
        serveUi({
          entry: appPath,
          log: () => endLog => {
            if (endLog.error) {
              reject(endLog.error)
            } else {
              resolve(server)
            }
          }
        })
      )
    )
  })

  const browser = await openChrome()
  const tab = await openTab(browser, `http://localhost:${port}`)

  // Always true--to appease the type-checker
  if (tab.puppeteer) {
    tab.puppeteer.page.close = async () => {
      await closeBrowser(browser)
      await stopServer(server)
    }
  }

  return tab
}
