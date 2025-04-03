# 字符串

## 反转字符串

- [344. 反转字符串](https://leetcode.cn/problems/reverse-string/)

我已不再是那个我，第一次做这道题，我用了 `s.reverse()`

```js
var reverseString = function (s) {
  let left = 0;
  let right = s.length - 1;
  while (right > left) {
    let temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
};
```

## 反转字符串 II

- [541. 反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/description/)

这道题我们 for 循环不要陷入到 i++ 的惯性，同时我们需要考虑边界问题时，要确定一个基准。本题需要确定右指针，因为我们的左右指针都是指向索引，那我们就以数组的索引为基准，这样我们的`i+k`和`s.length`就需要`-1`。`let r = i + k <= arr.length ? i + k - 1 : arr.length - 1;`这也是一种写法，可以思考一下两者的不同，我觉得还是第一种更好理解。

- 为什么`[s[left], s[right]] = [s[right], s[left]]`?

`[s[right], s[left]]` 创建了一个临时数组，包含了 `s[right]` 和 `s[left]` 的值。`[s[left], s[right]]` 是目标位置，表示将临时数组的值解构并赋值回 `s[left]` 和 `s[right]`。

> 解构：使用解构语法时，左侧定义的一个**模式**，指定如何从右侧提取值，本题中，左侧并不是创建数组，而仅仅是一个**模式**

```js
var reverseStr = function (s, k) {
  s = s.split("");
  // 不要惯性使用 i++ 思考题目的要求
  for (let i = 0; i < s.length; i += 2 * k) {
    let left = i;
    // 注意如何判断右指针
    let right = i + k - 1 > s.length - 1 ? s.length - 1 : i + k - 1;
    while (right > left) {
      // 另一种交换字符串的方式，不需要额外变量。
      [s[left], s[right]] = [s[right], s[left]];
      left++;
      right--;
    }
  }
  return s.join("");
};
```

## 翻转字符串里的单词

- [151. 翻转字符串里的单词](https://leetcode.cn/problems/reverse-words-in-a-string/description/)

这道题主要考察我们对字符串的操作，也可以借助这道题复习一下 JS 的 API，不过面试的时候应该也不希望你直接用 API

```js
var reverseWords = function (s) {
  let res = "";
  let right = s.length - 1;
  let left = right; // 这一步一定要赋值，不然进不去循环
  while (left >= 0) {
    while (s[right] === " ") right--;
    left = right;
    // 这里要判断 left >= 0，不然就出去了，会一直循环
    while (left >= 0 && s[left] !== " ") left--;
    if (res) res += " ";
    for (let i = left + 1; i <= right; i++) {
      // 是 left + 1
      res += s[i];
    }
    // 去下一个单词的位置
    while (s[left] === " ") left--;
    right = left;
  }
  return res;
};
```

```js
// API 大法
var reverseWords = function (s) {
  return s.trim().replace(/\s+/g, " ").split(" ").reverse().join(" ");
};
```

## KMP 算法

## 找出字符串中第一个匹配项的下标

- [28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/description/)

```js

```

## 重复的子字符串

- [459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/description/)

```js

```
