# 链表

## 移除链表元素

- [203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/description/)

我们要通过这道题好好理解虚拟头节点的作用，虚拟头节点可以避免对头节点的特殊处理，让我们可以把头节点看作和其他节点一样的节点，从而简化代码。

```js
var removeElements = function (head, val) {
  let dummy = new ListNode();
  dummy.next = head;
  let cur = dummy;
  // 避免访问空指针
  while (cur !== null && cur.next !== null) {
    if (cur.next.val === val) {
      cur.next = cur.next.next;
      continue; // 这一步很关键，要及时截断，如果走到啦下一步，cur.next 就被忽略了（细品）
    }
    cur = cur.next;
  }
  return dummy.next;
};
```

## 设计链表

- [707.设计链表](https://leetcode.cn/problems/design-linked-list/description/)

```js
class ListNode {
  constructor(val = null, next = null) {
    this.val = val;
    this.next = next;
  }
}

var MyLinkedList = function () {
  this.head = null;
  this.size = 0;
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) return -1;
  let cur = this.head;
  while (index) {
    cur = cur.next;
    index--;
  }
  return cur.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const node = new ListNode(val);
  if (this.head === null) {
    this.head = node;
  } else {
    node.next = this.head;
    this.head = node;
  }
  this.size++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const node = new ListNode(val);
  let cur = this.head;
  if (this.head === null) {
    this.head = node;
    this.size++;
    return;
  }
  while (cur.next !== null) {
    cur = cur.next;
  }
  cur.next = node;
  this.size++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index === 0) {
    this.addAtHead(val);
    return;
  }
  if (index > this.size || index < 0) return;
  let dummy = new ListNode();
  let node = new ListNode(val);
  dummy.next = this.head;
  let cur = dummy;
  while (index) {
    index--;
    cur = cur.next;
  }
  node.next = cur.next;
  cur.next = node;
  this.size++;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) return;
  let dummy = new ListNode();
  dummy.next = this.head;
  let cur = dummy;
  while (index) {
    cur = cur.next;
    index--;
  }
  cur.next = cur.next.next;
  if (cur === dummy) this.head = cur.next;
  this.size--;
};
```

## 反转链表

- [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/description/)

我们使用两个指针，一个指向前一个节点，一个指向当前节点，然后不断交换它们的指向，从而实现链表的反转。

```js
var reverseList = function (head) {
  let prev = null;
  let cur = head;
  while (cur !== null) {
    let temp = cur.next;
    cur.next = prev;
    prev = cur;
    cur = temp;
  }
  return prev;
};
```

## 两两交换链表中的节点

- [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/)

```js
var swapPairs = function (head) {
  let dummy = new ListNode();
  dummy.next = head;
  let cur = dummy;
  while (cur.next && cur.next.next) {
    let temp = cur.next;
    let temp2 = cur.next.next.next;
    cur.next = cur.next.next;
    cur.next.next = temp;
    cur.next.next.next = temp2; // 一开始忘了这一步，导致没有链接起来，可以思考一下递归和这个的区别
    cur = cur.next.next;
  }
  return dummy.next;
};
```

如果使用递归，这道题可以不用虚拟头节点，大家可以细品一下用不用虚拟节点的区别，还有一个需要注意的是 返回 temp2，此时 temp2 是新的头节点。

```js
// 递归解法
var swapPairs = function (head) {
  if (!head || !head.next) return head;
  let temp1 = head;
  let temp2 = head.next;
  let temp3 = head.next.next;

  temp2.next = temp1;
  temp1.next = swapPairs(temp3);
  return temp2;
};
```

## 删除链表的倒数第 N 个节点

- [19. 删除链表的倒数第 N 个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/)

一开始写这道题的时候没有用虚拟节点，结果在删除头节点会出现空节点问题，所以这道题还是需要用虚拟节点，我觉得虚拟节点这个事情，当我们写的链表题多了，就可以比较灵活的运用了，我觉得要点就是看头节点是否需要特殊处理。

```js
var removeNthFromEnd = function (head, n) {
  let dummy = new ListNode();
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  while (n) {
    fast = fast.next;
    n--;
  }
  while (fast && fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};
```

## 链表相交

- [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/description/)

这道题的解法很巧妙，我们使用两个指针，一个指针指向 headA，一个指针指向 headB，然后不断移动指针，若有。

两个指针都走完了对方的路径，如果相交，那么两个指针一定会相遇，否则两个指针会同时走到 null

```js
var getIntersectionNode = function (headA, headB) {
  let node1 = headA;
  let node2 = headB;
  while (node1 !== node2) {
    node1 = node1 ? node1.next : headB;
    node2 = node2 ? node2.next : headA;
  }
  return node1;
};
```
