const removeUndifined: <T extends Record<string, any>>(value: T) => T = value => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  Object.keys(value).forEach(key => (value[key] === undefined ? delete value[key] : {}))
  return value
}

export default removeUndifined
