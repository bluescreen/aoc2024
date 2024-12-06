export class StringMap {
  map: Map<number[], Set<number>>

  constructor() {
    this.map = new Map<number[], Set<number>>();
  }


  set(key: string, value: string) {
    if (typeof key !== 'string') {
      key = String(key);
    }
    this.map.set(key, value);
  }


  get(key: string) {
    return this.map.get(String(key));
  }


  has(key: string) {
    return this.map.has(String(key));
  }

 
  delete(key: string) {
    return this.map.delete(String(key));
  }

  
  clear() {
    this.map.clear();
  }


  size() {
    return this.map.size;
  }

 
  forEach(callback: () => any, thisArg: any) {
    this.map.forEach((value, key) => callback.call(thisArg, value, key, this));
  }


  keys() {
    return Array.from(this.map.keys());
  }


  values() {
    return Array.from(this.map.values());
  }

  
  entries() {
    return Array.from(this.map.entries());
  }

  
  [Symbol.iterator]() {
    return this.map[Symbol.iterator]();
  }
}
