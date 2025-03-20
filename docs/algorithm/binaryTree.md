# 二叉树

## 前置知识

### 1. 二叉树的定义

```js
class TreeNode {
  constructor(val, left, right) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}
```

### 2. 二叉树的分类

- 满二叉树
  ![满二叉树](/algorithm/fullBinaryTree.png)
- 完全二叉树
  ![完全二叉树](/algorithm/completeBinaryTree.png)
- 二叉搜索树
  ![二叉搜索树](/algorithm/binarySearchTree.png)
- 平衡二叉树：一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

### 3. 二叉树的存储方式

- 链式存储
- 顺序存储（数组）

### 4. 二叉树的遍历方式

目前我对递归更熟练一些，面试考察的也更多是递归。我理解迭代是更暴力的解法，不过树这种结构和递归关联性很强，所以后面的题解会以递归为主。

- 深度优先遍历（DFS）
  - 前序遍历
  - 中序遍历
  - 后序遍历
- 广度优先遍历（BFS）
  - 层序遍历
