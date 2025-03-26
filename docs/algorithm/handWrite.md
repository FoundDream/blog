# 前端经典手写题

除了看写法之外，还可以看注释复习一些 JS 的语法。

## 柯里化

```js
const curry = (fn) => {
  // 这样接收到的 args1 是一个数组
  return function curried(...args1) {
    // fn.length 返回一个函数参数的个数
    if (fn.length <= args1.length) {
      return fn.apply(this, args1); // apply 的参数传递用数组，call 直接传递参数
    } else {
      return function (...args2) {
        return curried.apply(this, [...args1, ...args2]);
      };
    }
  };
};

const sum = (a, b, c) => {
  return a + b + c;
};
const curryiedSum = curry(sum);
console.log(curryiedSum(1)(2, 3));
```

## 数组扁平化
