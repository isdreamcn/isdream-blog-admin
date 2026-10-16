import {
  NOOP,
  hasOwn,
  isObject,
  isPromise,
  isArray,
  isNil,
  cloneDeep,
  debounce
} from '../plugins'

describe('@vue/shared 内联实现（升级后替代依赖包）', () => {
  it('NOOP 调用无返回值', () => {
    expect(NOOP()).toBeUndefined()
  })

  it('hasOwn 识别自身属性（不含原型链）', () => {
    const obj: Record<string, unknown> = { a: 1 }
    expect(hasOwn(obj, 'a')).toBe(true)
    expect(hasOwn(obj, 'toString')).toBe(false)
    expect(hasOwn(obj, 'b')).toBe(false)
  })

  it('isObject 排除 null 与函数', () => {
    expect(isObject({})).toBe(true)
    expect(isObject([])).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject(() => {})).toBe(false)
  })

  it('isPromise 要求 then/catch 均为函数', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise({ then: () => {} })).toBe(false)
    expect(isPromise(null)).toBe(false)
  })
})

describe('lodash-es re-export（升级后替代 lodash-unified）', () => {
  it('isArray / isNil 行为正常', () => {
    expect(isArray([1, 2])).toBe(true)
    expect(isArray('str')).toBe(false)
    expect(isNil(null)).toBe(true)
    expect(isNil(undefined)).toBe(true)
    expect(isNil(0)).toBe(false)
  })

  it('cloneDeep 深拷贝嵌套对象', () => {
    const source = { list: [{ id: 1 }] }
    const copy = cloneDeep(source)
    copy.list[0].id = 2
    expect(source.list[0].id).toBe(1)
  })

  it('debounce 延迟执行', () => {
    vi.useFakeTimers()
    const fn = vi.fn()
    const debounced = debounce(fn, 100)
    debounced()
    debounced()
    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })
})
