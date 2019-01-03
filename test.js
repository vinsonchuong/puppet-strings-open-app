/* @flow */
import test from 'ava'
import greeting from 'puppet-strings-open-app'

test('exporting "Hello World!"', t => {
  t.is(greeting, 'Hello World!')
})
