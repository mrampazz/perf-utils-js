export function avg(list: number[]): number {
  if (list.some((it) => typeof it != 'number'))
    throw new Error('avg@utils: has to be a list of numbers')
  if (list.length < 1) throw new Error('avg@utils: list cannot be empty.')
  let sum = 0
  for (let i = 0; i < list.length; i++) sum += list[i]
  return sum / list.length
}
