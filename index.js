/* @flow */
import type { Tab } from 'puppet-strings'
import * as http from 'http'
import { openChrome, openTab } from 'puppet-strings'
import Bundler from 'parcel-bundler'
import tempy from 'tempy'
import getPort from 'get-port'

export default async function(appPath: string): Promise<Tab> {
  const bundler = new Bundler(appPath, {
    watch: false,
    outDir: tempy.directory(),
    logLevel: 1
  })
  const port = await getPort()
  const server = await bundler.serve(port)

  const browser = await openChrome()
  const tab = await openTab(browser, `http://localhost:${port}`)

  server.close()

  return tab
}
