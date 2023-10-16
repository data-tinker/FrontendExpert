const { describe, it, expect } = require('./framework.js')

describe('Passing test suite', () => {
  it('Passing Test Case #1', () => {
    expect('foo').toExist()
  })

  it('Passing Test Case #2', () => {
    expect(1 + 1).toBe(2)
  })

  it('Passing Test Case #3', () => {
    expect({}).toBeType('object')
  })
})

describe('Failing test suite', () => {
  it('Failing Test Case #1', () => {
    expect(null).toExist()
  })

  it('Failing Test Case #2', () => {
    expect(true).toBe(false)
  })

  it('Failing Test Case #3', () => {
    expect({}).toBeType('string')
  })
})
