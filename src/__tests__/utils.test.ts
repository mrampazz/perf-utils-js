import { avg } from '../utils'

describe('avg function test', () => {
  it('calculate average given a list', () => {
    const _numberList = [1, 2, 3, 4, 5]
    const _empty: number[] = []
    expect(avg(_numberList)).toEqual(3)
    expect(() => avg(_empty)).toThrow()
  })
})
