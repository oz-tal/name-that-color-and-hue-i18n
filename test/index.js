const test    = require('tape')
const tapSpec = require('@randomgoods/tap-spec')
const ntc     = require('../src/index')

// make tape output look pretty
test.createStream().pipe(tapSpec()).pipe(process.stdout)

test('ntc test', function(t) {
    t.plan(1)
    t.ok(ntc, 'ntc exists and is defined')
})
