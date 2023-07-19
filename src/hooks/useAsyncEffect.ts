import { useEffect } from "react"

export const useAsyncEffect = (
  func: () => any | Promise<any>,
  args: Array<any> = []
) => {
  useEffect(() => {
    // eslint-disable-next-line
    const p = func()
    if (p) {
      // eslint-disable-next-line
      p.then(() => {
        return undefined
      }).catch(() => {
        return undefined
      })
    }
  }, args)
}