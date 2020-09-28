function getValueFromObject(obj, value) {
  if (!value) {
    return undefined
  }
  const keys = value.split('.')
  let property
  keys.forEach((key, i) => {
    if (!i) {
      property = obj[key]
    } else {
      property = property[key]
    }
  })
  return property
}

function setValue(obj, value, key) {
  const copyObj = { ...obj }
  const keys = key.split('.')
  if (keys.length > 1) {
    copyObj[keys[0]][keys[1]] = value
  } else {
    copyObj[key] = value
  }
  return copyObj
}

export { getValueFromObject, setValue }
