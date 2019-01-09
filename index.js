/* @flow */
import type { Tab } from 'puppet-strings'
import { promisify } from 'util'
import { openChrome, openTab, closeBrowser } from 'puppet-strings'
import Bundler from 'parcel-bundler'
import tempy from 'tempy'
import getPort from 'get-port'

const sleep = promisify(setTimeout)

export default async function(appPath: string): Promise<Tab> {
  const bundler = new Bundler(appPath, {
    watch: false,
    outDir: tempy.directory(),
    logLevel: 1
  })
  const port = await getPort()

  const [server, browser] = await Promise.all([
    bundler.serve(port),
    openChrome()
  ])

  const tab = await openTab(browser, `http://localhost:${port}`)

  // Always true--to appease the type-checker
  if (tab.puppeteer) {
    tab.puppeteer.page.on('close', async () => {
      // Allow enough time for Puppeteer to clean up before closing browser
      await sleep(0)

      closeBrowser(browser)
      server.close()
    })
  }

  return tab
}
