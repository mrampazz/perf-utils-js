import { compareFnProfile, memLog, profileFn, sizeof } from '../index'

describe('sizeof tests', () => {
  it('calculate approximate value correctly', () => {
    const _empty = {}
    const _null = null
    const _undef = undefined
    const _number = 2
    const _string = 's'
    const _string_2 = 'ss'
    const _bool = true
    const _obj = {
      a: 2,
      b: 'c',
      c: [
        { a: 2, b: 2 },
        { a: '2', b: 'asd' },
      ],
    }
    expect(sizeof(_empty)).toEqual(0)
    expect(sizeof(_null)).toEqual(0)
    expect(sizeof(_undef)).toEqual(0)
    expect(sizeof(_number)).toEqual(8)
    expect(sizeof(_string)).toEqual(2)
    expect(sizeof(_string_2)).toEqual(4)
    expect(sizeof(_bool)).toEqual(4)
    expect(sizeof(_obj)).toEqual(34)
  })
})

describe('memLog tests', () => {
  const { process } = global
  beforeAll(() => {
    // @ts-ignore
    delete global.process
  })
  afterAll(() => {
    global.process = process
  })
  it('should throw when not node env', () => {
    expect(memLog).toThrow()
  })
})

describe('profileFn tests', () => {
  it('should throw when fn is undefined', () => {
    expect(() => profileFn(undefined as any)).toThrow()
  })
  it('should throw when iter is < 1', () => {
    expect(() => profileFn(() => {}, 0)).toThrow()
  })
  it('should return correct object', () => {
    expect(profileFn(() => {})).toHaveProperty('message')
    expect(profileFn(() => {})).toHaveProperty('executionTime')
  })
})

describe('compareFn tests', () => {
  it('should throw when at least one fn is undefined', () => {
    expect(() => compareFnProfile(2, undefined as any, () => {})).toThrow()
  })
  it('should throw when iter is < 1', () => {
    expect(() => compareFnProfile(0, () => {})).toThrow()
  })
  it('should return correct object', () => {
    expect(
      compareFnProfile(
        1,
        () => {},
        () => {}
      )
    ).toHaveProperty('logs')
    expect(
      compareFnProfile(
        1,
        () => {},
        () => {}
      )
    ).toHaveProperty('fastest')
  })
})
