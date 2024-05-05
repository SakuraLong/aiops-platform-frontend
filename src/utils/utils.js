export const deepClone = (obj, cache = []) => {
  // 如果为普通数据类型，则直接返回，完成拷贝
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // cache用来储存原始值和对应拷贝数据，在递归调用deepCopy函数时，如果本次拷贝的原始值在之前已经拷贝了，则直接返回储存中的copy值，这样的话就不用再循环复制本次原始值里面的每一项了。
  // 还有一个更为重要的作用，假如原始值里面嵌套两个引用地址相同的对象，使用cache可以保证拷贝出来的copy值里面两个对象的引用地址也相同。
  // 如果find查找的是一个空数组，则不会执行
  const hit = find(cache, (c) => c.original === obj)
  if (hit) {
    return hit.copy
  }
  // 定义拷贝的数据类型
  const copy = Array.isArray(obj) ? [] : {}
  // 用来记录拷贝的原始值和copy值
  cache.push[
    {
      original: obj,
      copy
    }
  ]
  // 递归调用深拷贝函数，拷贝对象中的每一个值
  Object.keys(obj).forEach((key) => {
    copy[key] = deepClone(obj[key], cache)
  })
  return copy
}
