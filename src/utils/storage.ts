function serialize(val: any): string {
  return JSON.stringify(val)
}

function deserialize(val: any) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}
interface API {
  set(): any;
  get(): any;
  has(): any;
  remove(): any;
  clear(): any;
}
interface Storage {
  setItem(str: string, val: any): void;
  getItem(str: string): any
  removeItem(str: string): void
  clear(): any
  key(num: number): any
}
class Api {
  storage: Storage
  constructor(storage: any) {
    this.storage = storage
  }
  set(key: string, val:any) {
    if (val === undefined) {
      return this.remove(key)
    }
    this.storage.setItem(key, serialize(val))
    return val
  }

  get(key: string, def?: any) {
    const val = deserialize(this.storage.getItem(key))
    return (val === undefined ? def : val)
  }

  has(key: string) {
    return this.get(key) !== undefined
  }

  remove(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
const newStore = new Api(window.localStorage)

export default newStore
