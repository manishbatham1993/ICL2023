export const createDebounceFunction = (callback, delay = 500) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

export const createThrottleFunction = (callback, delay = 500) => {
  let shouldWait
  return (...args) => {
    if (shouldWait) return
    shouldWait = true
    callback(...args)
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}
