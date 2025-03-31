# 数组

## 二分查找

- [704. 二分查找](https://leetcode.cn/problems/binary-search/description/)

这道题是二分查找的模板题，主要考察的是对二分查找的理解，同时也考察了对边界条件的处理。

```js
// 左闭右闭
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1; // 一开始忘了减1，导致可能left === right，越界，nums[mid]取不到，导致返回错误值
  while (right >= left) {
    // 不能忽略left === right 的情况
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
};
```

## 移除元素

- [27. 移除元素](https://leetcode.cn/problems/remove-element/description/)

双指针法，一个指针遍历数组，一个指针记录新数组的位置。

```js
var removeElement = function (nums, val) {
  let prev = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[prev] = nums[i];
      prev++;
    }
  }
  return prev;
};
```

## 有序数组的平方

- [977. 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/description/)

这道题已经排序好了，但是负数平方后可能比正数大，有可能导致负数平方后需要放到后面，这样我们就用双指针，看看前面的会不会比后面的大，如果比后面的大，就先放后面的，否则放前面的。

```js
var sortedSquares = function (nums) {
  let p1 = 0;
  let p2 = nums.length - 1;
  let res = [];
  for (let i = nums.length - 1; i >= 0; i--) {
    let num1 = nums[p1] * nums[p1];
    let num2 = nums[p2] * nums[p2];
    if (num2 > num1) {
      res[i] = num2;
      p2--;
    } else {
      res[i] = num1;
      p1++;
    }
  }
  return res;
};
```

## 长度最小的子数组

- [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/description/)

这道题是滑动窗口的模板题，主要考察的是对滑动窗口的理解，同时也考察了对边界条件的处理。

```js
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let sum = 0;
  let res = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    // 开始滑动窗口
    while (sum >= target) {
      res = Math.min(res, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return res === Infinity ? 0 : res;
};
```

## 螺旋矩阵 II

- [59. 螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/description/)

```js
var generateMatrix = function (n) {
  let startX = 0;
  let startY = 0;
  let offset = 1;
  let loop = Math.floor(n / 2);
  let mid = Math.floor(n / 2);
  let count = 1;
  const res = new Array(n).fill(0).map(() => new Array(n).fill(0)); // 初始化要注意哦

  while (loop--) {
    let i = startX;
    let j = startY;
    // 左闭右开
    for (; j < n - offset; j++) {
      res[i][j] = count++;
    }

    for (; i < n - offset; i++) {
      res[i][j] = count++;
    }

    for (; j > startY; j--) {
      res[i][j] = count++;
    }

    for (; i > startX; i--) {
      res[i][j] = count++;
    }
    startX++;
    startY++;
    offset++;
  }
  // 处理边界
  if (n % 2 === 1) {
    res[mid][mid] = count;
  }
  return res;
};
```
