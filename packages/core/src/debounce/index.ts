/**
 * func debounce ap dung thay cho lodash
 * hook
 * @param func
 * @param wait
 * @param immediate
 */
const debounce = (func: (...arg: Array<any>) => void, wait: number, immediate?: boolean) => {
  let timeout: any

  return (...args: Array<any>) => {
    const context = this

    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout

    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}

export default debounce
