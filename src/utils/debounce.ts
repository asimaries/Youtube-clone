
export const debounce = (fn: Function, delay = 300) => {
  let timerId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      return fn.apply(this, args)
    }, delay);
  }
}
