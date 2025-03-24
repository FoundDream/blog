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

## 从中序与后序/前序与中序遍历序列构造二叉树

- [106.从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
- [105.从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

这两道题很像，关键是想清楚如何对两个数组进行切割。这道题最近的面试（字节后端 1 面）有考查到，可能改编成中序与后序得出前序，或者中序与前序得出后序。

想清楚如何找到根节点，如何分为左右子树，然后递归即可。递归的终止条件是空数组（代表叶子节点），需要空数组返回 null 就完成了树的构建

```js
// 106
var buildTree = function (inorder, postorder) {
  // 从后序出发，每个后序遍历的尾是根节点
  if (postorder.length === 0) return null;
  const rootVal = postorder.pop();
  const rootIndex = inorder.indexOf(rootVal);
  const root = new ListNode(rootVal);
  const leftInorder = inorder.slice(0, rootIndex);
  const leftPostorder = postorder.slice(0, rootIndex);
  const rightInorder = inorder.slice(rootIndex + 1);
  const rightPostorder = postorder.slice(rootIndex);
  root.left = buildTree(leftInorder, leftPostorder);
  root.right = buildTree(rightInorder, rightPostorder);
  return root;
};
```

```js
// 105
var buildTree = function (preorder, inorder) {
  // 从先序出发，每个先序遍历的头是根节点
  if (preorder.length === 0) return null;
  const rootVal = preorder.shift();
  const rootIndex = inorder.indexOf(rootVal);
  const root = new ListNode(rootVal);
  root.left = buildTree(
    preorder.slice(0, rootIndex),
    inorder.slice(0, rootIndex)
  );
  root.right = buildTree(
    preorder.slice(rootIndex),
    inorder.slice(rootIndex + 1)
  );
  return root;
};
```

## 最大二叉树

- [654.最大二叉树](https://leetcode.cn/problems/maximum-binary-tree/)

这道题和上面两道题很像，如果搞懂了上面的题，这道题也不会有问题。

```js
var constructMaximumBinaryTree = function (nums) {
  if (nums.length === 0) return null;
  let curNum = -Infinity;
  let rootIndex;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > curNum) {
      curNum = nums[i];
      rootIndex = i;
    }
  }
  const root = new ListNode(curNum);
  root.left = constructMaximumBinaryTree(nums.slice(0, rootIndex));
  root.right = constructMaximumBinaryTree(nums.slice(rootIndex + 1));
  return root;
};
```

## 合并二叉树

- [617.合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)

这道题是没有看题解独立完成的一道题，我觉得只要掌握好递归的逻辑，这道题还是挺简单的。

首先考虑这道题的递归结束条件，就是两个节点都为 null，当只有一个节点有值的时候直接返回有值的节点即可。接着就是认为递归返回的是正确的，把每一个节点的左右节点都合并即可。

```js
var mergeTrees = function (root1, root2) {
  if (!root1 && !root2) return null;
  if (root1 && !root2) return root1;
  if (!root1 && root2) return root2;
  const root = new ListNode(root1.val + root2.val);
  root.left = mergeTrees(root1.left, root2.left);
  root.right = mergeTrees(root1.right, root2.right);
  return root;
};

var mergeTrees = function (root1, root2) {
  if (!root1 && !root2) return null;
  if (root1 && !root2) return root1;
  if (!root1 && root2) return root2;
  root1.val = root1.val + root2.val;
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);
  return root1;
};
```

## 二叉搜索树中的搜索

- [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/description/)

在刷了几道二叉搜索树我有一个心得：我们考虑二叉搜索树的过程的时候，如果使用中序遍历，可以从叶子节点开始，去思考如何写递归终止条件和对初始值的处理。

这道题是二叉搜索树的基础应用，题目本身不难，但是有一个比较有意思的点：我们如果发现值不相等，要继续搜索，这个时候我们要记得 return 新搜索的结果，因为最后判题是看我们的最后一次 return，所以我们需要通过 return 结果，一层层传递到最外层，这样才能拿到结果。

```js
var searchBST = function (root, val) {
  // 如果没有搜索到，root 就是 null，会返回 null
  if (!root || root.val === val) return root;
  else if (root.val > val) return searchBST(root.left, val); // 不要漏了 return
  else if (root.val < val) return searchBST(root.right, val);
};
```

## 验证二叉搜索树

- [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/description/)

第二次写这道题的时候还是出现了一个问题，这道题本身需要利用中序遍历，去看得到的结果是否为单调递增，所以我们需要一个 prev 变量求记录前一个变量的值，但是一开始的时候，我直接把 prev 设置为 null，然后发现如果根节点是 null 的时候，会报错。

所以在处理根节点的时候，需要先判断根节点是否为 null，这样可以避免一开始根节点没有 val 报错

```js
var isValidBST = function (root) {
  // 利用中序遍历，去看得到的结果是否为单调递增
  let prev = null;
  const dfs = (node) => {
    if (!node) return true;
    const left = dfs(node.left);
    // 注意要判断 prev !== null
    if (prev !== null && prev.val >= node.val) return false;
    prev = node;
    const right = dfs(node.right);
    return left && right;
  };
  return dfs(root);
};
```

## 二叉搜索树的最小绝对差

- [530. 二叉搜索树的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/description/)

跟验证二叉树一样的思路，如果上面会处理 prev，这道题也没有问题

```js
var getMinimumDifference = function (root) {
  let res = Infinity;
  let prev = null;
  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    if (prev !== null) {
      res = Math.min(res, node.val - prev);
    }
    prev = node.val;
    dfs(node.right);
  };
  dfs(root);
  return res;
};
```

## 二叉搜索树中的众数

- [501. 二叉搜索树中的众数](https://leetcode.cn/problems/find-mode-in-binary-search-tree/description/)

二叉搜索树都可以考虑中序遍历，相当于单调递增的数组。这道题就是维护一下最大计数和前一个数字和计数即可，

```js
var findMode = function (root) {
  let maxCount = -Infinity;
  let curCount = 1;
  let curNum;
  let preNum = null;
  let res = [];
  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    curNum = node.val;
    // 要注意处理preNum没有数的情况，如果前一个数和当前数相等，则当前数计数加一
    if (preNum !== null && preNum === curNum) curCount++;
    else curCount = 1;
    // 如果当前数计数和最大计数相等，则把当前数加入结果数组
    if (curCount === maxCount) res.push(curNum);
    // 如果当前数计数大于最大计数，则更新最大计数，并清空结果数组，把当前数加入结果数组
    if (curCount > maxCount) {
      maxCount = curCount;
      res = [];
      res.push(curNum);
    }
    preNum = curNum;
    dfs(node.right);
  };
  dfs(root);
  return res;
};
```

## 二叉树的最近公共祖先

- [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/)

这道题的解法是后序遍历，当遇到 p 或者 q 的时候直接返回节点，然后拿到左右节点，如果左右节点都存在，则说明当前节点是最近公共祖先，如果只有一个存在，则返回存在的那个节点。这样也包括了 p 或者 q 是最近公共祖先的情况。

```js
var lowestCommonAncestor = function (root, p, q) {
  const dfs = (node, p, q) => {
    if (!node) return null;
    // 这道题的关键
    if (node === p || node === q) return node;
    const left = dfs(node.left, p, q);
    const right = dfs(node.right, p, q);
    if (right && left) return node;
    // if (!right && left) return left;
    // if (!left && right) return right;
    return left || right; // 更简洁一些
  };
  return dfs(root, p, q);
};
```

## 二叉搜索树的最近公共祖先

- [235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

这道题主要是利用二叉搜索树的性质，一旦发现当前节点的值在 p 和 q 之间，则当前节点就是最近公共祖先。如果不清楚为什么，我们可以考虑，我们继续往下遍历会发生什么：如果我们进去了左子树，那么我们永远也接受不到右子树的值，相反同理。

下面给出了两种解法，第二种解法更好一些，可以节省时间，因为第一种解法需要遍历整棵树，而第二种解法只需要遍历一条路径，避免不必要的递归。

```js
var lowestCommonAncestor = function (root, p, q) {
  const dfs = (node, p, q) => {
    if (!node) return null;
    if (
      (node.val >= p.val && node.val <= q.val) ||
      (node.val <= p.val && node.val >= q.val)
    )
      return node;
    const left = dfs(node.left, p, q);
    const right = dfs(node.right, p, q);
    return left || right;
  };
  return dfs(root, p, q);
};
```

```js
var lowestCommonAncestor = function (root, p, q) {
  const dfs = (node, p, q) => {
    if (!node) return null;
    if (node.val > p.val && node.val > q.val) return dfs(node.left, p, q);
    if (node.val < p.val && node.val < q.val) return dfs(node.right, p, q);
    return node;
  };
  return dfs(root, p, q);
};
```

## 二叉搜索树中的插入操作

- [701. 二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/description/)

我们只要插入到叶子节点即可，没有其他的要求。

```js
var insertIntoBST = function (root, val) {
  if (!root) {
    const node = new TreeNode(val);
    return node;
  }
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val);
  } else {
    root.right = insertIntoBST(root.right, val);
  }
  return root;
};
```

## 将有序数组转换为二叉搜索树

- [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/)

构造二叉树的话，我觉得就是考虑对数组切片吧，第二种方案是传递索引，效率会更好。

start + end 和 nums.length 其实可以重点关注一下，如果我们传递索引，那么开头就是 0，我们取中值的时候要使用 Math.ceil 或者 Math.floor((start+end+1)/2)。而如果我们传递 nums.length，那么开头就是 1，我们取中值的时候要使用 Math.floor((start+end)/2)。

```js
var sortedArrayToBST = function (nums) {
  // 奇数就是中间，偶数就是中间偏右
  if (nums.length <= 0) return null;
  let index = Math.floor(nums.length / 2);
  // 中左右遍历，前序遍历
  let node = new TreeNode(nums[index]);
  node.left = sortedArrayToBST(nums.slice(0, index));
  node.right = sortedArrayToBST(nums.slice(index + 1));
  return node;
};
```

```js
var sortedArrayToBST = function (nums) {
  const dfs = (start, end) => {
    if (end < start) return null;
    if (nums.length <= 0) return null;
    let index = Math.ceil((start + end) / 2);
    // 中左右遍历，前序遍历
    let node = new TreeNode(nums[index]);
    node.left = dfs(start, index - 1);
    node.right = dfs(index + 1, end);
    return node;
  };
  return dfs(0, nums.length - 1);
};
```

## 把二叉搜索树转换为累加树

- [538. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/description/)

这道题根据图可知，我们需要右中左遍历，利用 prev 变量来记录上一个节点的值，然后每次遍历当前节点的值加上上一个节点的值，然后更新 prev 的值。

通过这道题，可以好好思考一下遍历的过程，一定要真正的理解遍历的过程，这样才能更好的理解递归的过程。

```js
var convertBST = function (root) {
  // 右中左遍历
  let prev = null;
  const dfs = (node) => {
    if (!node) return null;
    dfs(node.right);
    if (prev !== null) node.val = prev.val + node.val;
    prev = node;
    dfs(node.left);
  };
  dfs(root);
  return root;
};
```

## 删除二叉搜索树中的节点

- [450. 删除二叉搜索树中的节点](https://leetcode.cn/problems/delete-node-in-a-bst/description/)

## 修剪二叉搜索树

- [669. 修剪二叉搜索树](https://leetcode.cn/problems/trim-a-binary-search-tree/description/)
