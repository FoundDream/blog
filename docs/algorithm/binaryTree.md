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

DFS 还有迭代的方法，因为目前我对递归更熟练一些，面试考察的也更多是递归。我理解层序是更暴力的解法，不过树这种结构和递归关联性很强，所以后面的题解会以递归为主。

- 深度优先遍历（DFS）
  - 前序遍历
  - 中序遍历
  - 后序遍历
- 广度优先遍历（BFS）
  - 层序遍历

## 二叉树的遍历

- [144.二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
- [145.二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)
- [94.二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)
- [102.二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
- [107.二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/)

### 1. 前/中/后序遍历

深度遍历的话，前中后指的是中间节点在什么时候被访问，然后就是左右子树的遍历顺序。

```js
var preorderTraversal = function (root) {
  // 前序遍历：中左右
  let res = [];
  const dfs = (node) => {
    if (!node) return;
    // 其他的遍历顺序，只需要调整这三行代码的顺序即可
    res.push(node.val); // 中
    dfs(node.left); // 左
    dfs(node.right); // 右
  };
  dfs(root);
  return res;
};
```

### 2. 层序遍历

层序遍历 II，直接把结果放到前面即可（push 改成 unshift）。

```js
var levelOrder = function (root) {
  let res = [];
  let quene = []; // 层序遍历是一层层遍历，我们用一个队列，先进先出适合这种遍历
  quene.push(root);
  if (!root) return res; // 处理第一个节点，以防第一个节点就是空节点
  while (quene.length !== 0) {
    let curArr = []; // 存储当前层的结果
    let length = quene.length; // 因为后续遍历每一层时，队列的大小会变化，所以要先记录。
    for (let i = 0; i < length; i++) {
      // 从左到右出列，然后加入当前处理节点的左右节点
      let node = quene.shift();
      curArr.push(node.val);
      // 有节点才加入队列
      node.left && quene.push(node.left);
      node.right && quene.push(node.right);
    }
    res.push(curArr);
  }
  return res;
};
```

## 翻转二叉树

- [226.翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)

这道题我觉得可以作为递归解题的引入，首先我们要想好终止条件是什么，本题就是遍历到叶子节点，实际上最后两个叶子节点翻转后返回的就是自己的本身，然后我们就开始一步步从下到上走交换逻辑。递归的一个关键是我们要假设递归函数返回的值是正确的，在最后的时候返回我们的答案。

这道题还有一个有意思的故事，Homebrew 的作者 Max Howell 在面试的时候没有在白板上写出这道题的解法，最后被 google 拒掉了，作者还发了一条推特：

> Google: 90% of our engineers use the software you wrote (Homebrew), but you can’t invert a binary tree on a whiteboard so fuck off.

```js
var invertTree = function (root) {
  if (!root) return null; // 终止条件
  let Invertedright = invertTree(root.right); // 可以和下面简化成一行，不过方便理解就不简化了，这题是后续遍历
  let Invertedleft = invertTree(root.left);
  root.left = Invertedright;
  root.right = Invertedleft;
  return root;
};
```

## 对称二叉树

- [101.对称二叉树](https://leetcode.cn/problems/symmetric-tree/)

```js
var isSymmetric = function (root) {
  const compare = (leftNode, rightNode) => {
    // 这是比较节点的核心思路，这些都比完后，如果没有返回，说明目前比较的两个节点对称，继续去比较子节点
    if (leftNode && !rightNode) return false;
    if (rightNode && !leftNode) return false;
    if (!rightNode && !leftNode) return true;
    if (leftNode.val !== rightNode.val) return false;
    // 比较子节点
    const r1 = compare(leftNode.right, rightNode.left);
    const r2 = compare(leftNode.left, rightNode.right);
    return r1 && r2;
  };
  return compare(root.left, root.right);
};
```

## 二叉树的最大深度

- [104.二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)

我们做二叉树的题目时，可以先考虑使用什么遍历方法，这里我们可以通过思考如何返回结果，来决定使用什么遍历方法。本题要求深度，那我们只要确定好根节点左右的深度即可。

考虑一下终止条件，如果节点为空，那深度就返回 0。

```js
var maxDepth = function (root) {
  if (!root) return 0; // 递归三部曲，终止条件
  const leftDepth = maxDepth(root.left); // 递归
  const rightDepth = maxDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1; // 每一层要 +1
};
```

## 二叉树的最小深度

- [111.二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

这道题和最大深度还是有不小的区别的，求最小深度需要考虑叶子节点，关键点在于**若左/右节点为空，则最小深度为另一边的深度**。

```js
var minDepth = function (root) {
  const getDepth = (node) => {
    if (!node) return 0;
    let leftDepth = minDepth(node.left);
    let rightDepth = minDepth(node.right);
    // 处理的关键点，如果左节点为空，右节点不为空，则最小深度为右节点的深度
    if (node.left && !node.right) return leftDepth + 1;
    if (node.right && !node.left) return rightDepth + 1;
    return Math.min(leftDepth, rightDepth) + 1;
  };
  return getDepth(root);
};
```

## 完全二叉树的节点个数

- [222.完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/)

这道题和求最大深度很像，只不过这道题是求节点个数，我们只需要遍历每个节点的左右节点数目，然后加上当前节点即可。

```js
var countNodes = function (root) {
  if (!root) return 0;
  let leftCount = countNodes(root.left);
  let rightCount = countNodes(root.right);
  return leftCount + rightCount + 1;
};
```

## 平衡二叉树

- [110.平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)

先确定终止条件，如果节点为空，则返回 0。然后我们计算左右子树的高度，如果左右子树的高度差大于 1，则返回 -1，代表已经不平衡了。否则返回当前比较深的那个子树的高度，因为我们要计算的是高度差，要用左右子树最大的深度相减。

这道题值得学习的是，我们用一个**变量**来记录是否平衡，我们的递归函数既要返回结果，又要记录是否平衡，这一块在做的时候卡住了。

```js
var isBalanced = function (root) {
  const getHeight = (node) => {
    // -1 这里代表树不平衡
    if (!node) return 0;
    let leftDepth = getHeight(node.left);
    if (leftDepth === -1) return -1;
    let rightDepth = getHeight(node.right);
    if (rightDepth === -1) return -1;
    if (Math.abs(leftDepth - rightDepth) > 1) return -1;
    else return Math.max(leftDepth, rightDepth) + 1;
  };

  return getHeight(root) !== -1;
};
```

## 二叉树的所有路径

- [257.二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)

```js
var binaryTreePaths = function (root) {
  const res = [];
  let curPath = "";
  const getPath = (node, curPath) => {
    // 终止条件，如果为叶子节点，就说明到最后了，可以把答案放回去
    if (!node.left && !node.right) {
      curPath += node.val;
      res.push(curPath);
      return; // 这里 return，防止继续往下走
    }
    curPath += node.val + "->";
    node.left && getPath(node.left, curPath); // 这里用 && ，防止 node.left 为空时，继续往下走
    node.right && getPath(node.right, curPath); // curPath 可以把当前路径传下去，记录前面的路径
  };
  getPath(root, curPath);
  return res;
};
```

## 左叶子之和

- [404.左叶子之和](https://leetcode.cn/problems/sum-of-left-leaves/)

这道题做的不好，主要因为没有思考好遍历顺序吧。这道题采用中序遍历，先计算左节点的值，然后看当前节点，如果当前节点能发现左节点是叶子节点，那么左边的值就是当前节点的左节点的值。然后在计算后边节点，相加返回

```js
var sumOfLeftLeaves = function (root) {
  const countSum = (node) => {
    if (!node) return 0;
    // 终止条件，如果为叶子节点，则返回 0
    if (!node.left && !node.right) return 0;
    let leftSum = countSum(node.left);
    if (node.left && !node.left.left && !node.left.right) {
      leftSum = node.left.val;
    }
    let rightSum = countSum(node.right);
    return leftSum + rightSum;
  };
  return countSum(root);
};
```

## 找树左下角的值

- [513.找树左下角的值](https://leetcode.cn/problems/find-bottom-left-tree-value/)

通过这一题和上一次，要明确前中后序遍历的具体过程。这题我们用一个变量去记录最大深度，当遍历到叶子节点，看看目前的叶子节点是否是最大深度，如果是，则记录当前节点的值。这道题和前面记录路径的题很像，有两个参数，需要传递深度。

```js
var findBottomLeftValue = function (root) {
  let res;
  let maxDepth = -Infinity;
  const traversal = (node, depth) => {
    depth++;
    if (!node.left && !node.right && depth > maxDepth) {
      maxDepth = depth;
      res = node.val;
    }
    node.left && traversal(node.left, depth);
    node.right && traversal(node.right, depth);
  };
  traversal(root, 0);
  return res;
};
```

## 路径总和

- [112.路径总和](https://leetcode.cn/problems/path-sum/)

这题和所有路径的题很像，只不过这题是找到一条符合条件的路线，我们可以找一个 flag 变量，一旦符合要求就设置为 true，然后返回 flag 即可。

```js
var hasPathSum = function (root, targetSum) {
  let flag = false;
  const countSum = (node, curNum) => {
    if (!node) return;
    curNum += node.val;
    if (!node.left && !node.right && targetSum === curNum) {
      flag = true;
    }
    node.left && countSum(node.left, curNum);
    node.right && countSum(node.right, curNum);
  };
  countSum(root, 0);
  return flag;
};
```

比较简单的一种解法，可以简单学习一下如何返回答案

```js
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  targetSum -= root.val;
  if (!root.left && !root.right && targetSum === 0) {
    return true;
  }
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};
```

## 从中序与后序遍历序列构造二叉树

- [106.从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
