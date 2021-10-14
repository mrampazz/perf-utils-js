import { performance } from 'perf_hooks'
import { avg } from './utils'

type CBFuncVariadicAnyReturn = (...args: any[]) => any

type ProfileFnLog = {
  executionTime: number
  message: string
}

interface CompareFnLog {
  logs: ProfileFnLog[]
  fastest: ProfileFnLog
}

export function memLog(): number {
  if (typeof process != 'undefined') {
    return process.memoryUsage().heapUsed / Math.pow(1000, 2)
  } else {
    throw new Error('This function can only be run in a node.js environment.')
  }
}

export function profileFn(
  fn: CBFuncVariadicAnyReturn,
  iter: Number = 1
): ProfileFnLog {
  if (typeof fn === 'undefined')
    throw new Error(
      'profileFn@perf: function passed as argument cannot be undefined.'
    )

  if (iter < 1)
    throw new Error('profileFn@perf: number of iterations has to be >= 1.')

  const timestamps = []
  for (let i = 0; i < iter; i++) {
    const s = performance.now()
    fn()
    const e = performance.now()
    timestamps.push(e - s)
  }

  const executionTime = avg(timestamps)

  return {
    executionTime,
    message: `Function roughly run for ${executionTime}ms ${
      iter > 1 ? `over ${iter} iterations` : ''
    }`,
  }
}

export function sizeof(obj: any) {
  if (obj === null || obj === undefined) return 0

  const stack = [obj]
  let bytes = 0

  while (stack.length) {
    let value = stack.pop()

    switch (typeof value) {
      case 'boolean':
        bytes += 4
        break
      case 'number':
        bytes += 8
        break
      case 'string':
        bytes += value.length * 2
        break
      case 'object':
        if (Array.isArray(value)) {
          stack.push(...value)
        } else {
          const keys = Object.keys(value)
          for (let i = 0; i < keys.length; i++) {
            stack.push(value[keys[i]])
          }
        }
        break
    }
  }
  return bytes
}

export function compareFnProfile(
  iter: number,
  ...functions: CBFuncVariadicAnyReturn[]
): CompareFnLog {
  if (functions.some((fn) => typeof fn === 'undefined'))
    throw new Error(
      'compareFnProfile@perf: function passed as argument cannot be undefined.'
    )

  if (iter < 1)
    throw new Error('profileFn@perf: number of iterations has to be >= 1.')

  const logs = []
  const firstLog = profileFn(functions[0], iter)
  logs.push(firstLog)
  let fastest = firstLog
  for (let i = 0; i < functions.length; i++) {
    const log = profileFn(functions[i])
    if (log.executionTime < fastest.executionTime) fastest = log
    logs.push(log)
  }

  return {
    logs,
    fastest,
  }
}
