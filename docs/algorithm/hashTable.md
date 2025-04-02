# 哈希表

## 处理 Map 的方式

```js
// 方法一：使用 forEach
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// 方法二：使用 for...of 和 entries()
for (const [key, value] of map.entries()) {
  console.log(`${key}: ${value}`);
}

// 简写形式
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// 使用 keys() 方法
for (const key of map.keys()) {
  console.log(key);
}

// 使用 values() 方法
for (const value of map.values()) {
  console.log(value);
}

// 转换为键值对数组
const entriesArray = Array.from(map.entries());
// 或者
const entriesArray2 = [...map];

// 单独获取所有键或值
const keysArray = Array.from(map.keys());
const valuesArray = Array.from(map.values());

// 获取值，如果不存在则使用默认值
const value = map.get(key) || defaultValue;

// 增加计数（常用于统计）
map.set(key, (map.get(key) || 0) + 1);
```

## 有效的字母异位词

- [262. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram/submissions/)

第一种解法是 JS 魅力时刻了，不过这种异位词考察的跟哈希表有关，这涉及到每个字母的出现次数，我们用哈希记录即可。

```js
var isAnagram = function (s, t) {
  return s.split("").sort().join("") === t.split("").sort().join("");
};
```

```js
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const hash = new Map();
  // 映射哈希表
  for (const c of s) {
    hash.set(c, (hash.get(c) || 0) + 1);
  }
  // 处理哈希表
  for (const c of t) {
    const count = hash.get(c);
    if (!count) return false;
    hash.set(c, count - 1);
  }
  // 这里要用 for of 如果使用 forEach，返回 false 的时候是在回调函数里面返回，而不是在主函数中返回
  for (const num of hash.values()) {
    if (num !== 0) return false;
  }
  return true;
};
```

## 两个数组的交集

- [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/description/)

```js
var intersection = function (nums1, nums2) {
  const hash = new Map();
  const res = [];
  for (let num1 of nums1) {
    hash.set(num1, true);
  }
  for (let num2 of nums2) {
    if (hash.get(num2)) {
      hash.set(num2, false);
      res.push(num2);
    }
  }
  return res;
};
```

## 快乐数

- [202. 快乐数](https://leetcode.cn/problems/happy-number/description/)

```js
var isHappy = function (n) {
  let hash = new Map();
  while (n !== 1) {
    let cur = 0;
    hash.set(n, true);
    for (let num of String(n)) {
      // 这里不转换成 Number 直接用字符串相乘也可以的，JS 特性*
      cur += Number(num) * Number(num);
    }
    n = cur;
    if (hash.has(n)) return false;
  }
  return true;
};
```

## 两数之和

- [1. 两数之和](https://leetcode.cn/problems/two-sum/description/)

> 有人相爱，有人夜里开车看海，有人 leetcode 第一题都做不出来。

经典哈希表的应用，以前我也做不出来第一题，再做了好几遍这道题后，我也可以秒掉了。

```js
var twoSum = function (nums, target) {
  let hash = new Map();
  for (let i = 0; i < nums.length; i++) {
    let num = target - nums[i];
    if (hash.has(num)) {
      return [i, hash.get(num)];
    } else {
      hash.set(nums[i], i);
    }
  }
};
```

## 四数相加 II

- [454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/description/)

代码随想录的顺序还是很考究的，这道题听完讲解思路后，发现其本质其实和两数之和很像，nums1 + nums2 相当于第一个数，nums3 + nums4 相当于第二个数，如果用暴力解法这道题需要 n^4 的时间复杂度，但是通过转换，最终只需要 n^2 的时间复杂度

```js
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const n = nums1.length;
  const hash = new Map();
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      hash.set(nums1[i] + nums2[j], (hash.get(nums1[i] + nums2[j]) || 0) + 1);
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let temp = hash.get(-nums3[i] - nums4[j]);
      if (temp) {
        count += temp;
      }
    }
  }
  return count;
};
```

## 赎金信

- [383. 赎金信](https://leetcode.cn/problems/ransom-note/description/)

和异位词一摸一样的思路

```js
var canConstruct = function (ransomNote, magazine) {
  const hash = new Map();
  for (let c of magazine) {
    hash.set(c, (hash.get(c) || 0) + 1);
  }
  for (let c of ransomNote) {
    let num = hash.get(c);
    if (num && num > 0) {
      hash.set(c, num - 1);
    } else {
      return false;
    }
  }
  return true;
};
```

## 三数之和

- [15. 三数之和](https://leetcode.cn/problems/3sum/description/)

这道题不太适合使用哈希表来做，要使用三指针。本题关键在于正确处理三数去重，避免出现相同逻辑。

为什么要去重呢？比如我们已经找到了一个符合条件的答案，如果下一位数和前一位相同，这样我们的答案就重复了。

```js
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return res;
    // i 当前指向的位置和前面不同
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    let right = nums.length - 1;
    while (right > left) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum > 0) {
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        res.push([nums[i], nums[left], nums[right]]);
        // 让 right 和 left 指向的下一个位置和当前位置不同
        while (right > left && nums[right] === nums[right - 1]) right--;
        while (right > left && nums[left] === nums[left + 1]) left++;
        // 操作之后和 i 一样，left 和 right 当前指向的位置和前一位置不同
        right--;
        left++;
      }
    }
  }
  return res;
};
```

## 四数之和

- [18. https://leetcode.cn/problems/4sum/](https://leetcode.cn/problems/4sum/)

```js

```
