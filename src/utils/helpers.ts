function debounce(func: any, timeout = 300): (...args: any) => void {
  let timer: any

  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export { debounce }
