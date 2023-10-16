function describe(testSuiteName, func) {
  console.log(`beginning test suite ${testSuiteName}`)
  try {
    func()
    console.log(`successfully completed test suite ${testSuiteName}`)
  } catch ({ failedTestName, expectErrorMessage }) {
    console.error(`failed running test suite ${testSuiteName} on test case ${failedTestName} with error message ${expectErrorMessage}`)
  }
}

function it(testCaseName, func) {
  console.log(`beginning test case ${testCaseName}`)
  try {
    func()
    console.log(`successfully completed test case ${testCaseName}`)
  } catch (e) {
    throw {
      failedTestName: testCaseName,
      expectErrorMessage: e
    }
  }
}

function expect(actual) {
  return {
    toExist: () => throwIfFalse(actual != null, `expected value to exist but got ${JSON.stringify(actual)}`),
    toBe: (expected) => throwIfFalse(actual === expected, `expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`),
    toBeType: (type) => throwIfFalse(typeof actual === type, `expected ${JSON.stringify(actual)} to be of type ${type} but got ${typeof actual}`)
  }
}

function throwIfFalse(value, errorMessage) {
  if (!value) {
    throw errorMessage
  }
}

// Do not edit the lines below.
exports.describe = describe;
exports.it = it;
exports.expect = expect;
