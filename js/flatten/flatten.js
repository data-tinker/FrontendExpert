function flatten(value) {
  if (typeof value === "object" && value !== null) {
    if (Array.isArray(value)) {
      return flattenArray(value)
    } else {
      return flattenObject(value)
    }
  }

  return value
}

function flattenArray(array) {
  return array.reduce((acc, item) => {
    return acc.concat(flatten(item))
  }, [])
}

function flattenObject(object) {
  const flattenedObject = {}

  for (const [key, value] of Object.entries(object)) {
   const valueIsObject = typeof value === "object" && value !== null && !Array.isArray(value)
    const flattenedValue = flatten(value)

    if (valueIsObject) {
      Object.assign(flattenedObject, flattenedValue)
    } else {
      flattenedObject[key] = flattenedValue
    }
  }

  return flattenedObject
}

exports.flatten = flatten
