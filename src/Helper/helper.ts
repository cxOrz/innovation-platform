export function equal(a: any, b: any) {
  // 对象比较
  for (const key in a) {
    if (Object.hasOwn(a, key)) {
      if (a[key] !== b[key]) return false;
    }
  }
  return true;
}