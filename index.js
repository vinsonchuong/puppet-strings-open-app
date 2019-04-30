/* @flow */
import type { Tab } from 'puppet-strings'
import { openBrowser, openTab, closeBrowser } from 'puppet-strings'
import {
  getPort,
  startServer,
  stopServer,
  respondToRequests,
  serveUi
} from 'passing-notes'

export default async function(
  browserPath: string,
  appPath: string
): Promise<Tab> {
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

  const browser = await openBrowser(browserPath)
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
