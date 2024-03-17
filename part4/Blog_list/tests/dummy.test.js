const {test} = require('node:test')
const assert = require('node:assert')
const dummy = require('../utils/list_helper').dummy

test('dummy test returns 1', ()=> {
    const blogs = []

    const result = dummy(blogs)
    assert.strictEqual = (result, 1)
})