# Vue.js 设计与实现

## 第一章. 权衡的艺术

## 声明式 vs 命令式

声明式代码不优于命令式代码的性能。但是前提是写出绝对优化的命令式代码，这需要耗费大量的精力同时可维护性质差，投入产出比并不好，估计第二人也很难看懂逻辑了，对于团队开发是很不友好的。

声明式代码未必就不如命令式代码。`innerHTML`利用拼接 HTML 元素来渲染，心智负担还可以，但是性能极差，而原生 JS 的性能高，但是心智负担巨大且难以维护，虚拟 DOM 完美结合来两者的优点，甚至可以逼近原生 JS 的性能。

虚拟 DOM 的性能：声明式的更新性能消耗 = 找出差异的性能消耗 ＋ 直接修改的性能消耗。 虚拟 DOM 的意义就在于使找出差异的性能消耗最⼩化。

## 编译时 vs 运行时

1. 运行时

```js
const obj = {
  tag: "div",
  children: [{ tag: "span", children: "hello world" }],
};

const Render = (obj, root) => {
  const el = document.createElement(obj.tag);
  if (typeof obj.children === string) {
    const text = document.createTextNode(obj.children);
    el.appendChild(text);
  } else if (obj.children) {
    obj.children.forEach((child) => Render(child));
  }
  root.appendChild(el);
};

Render(obj, document.body);
```

2. 编译时

我们还是更习惯写 HTML，能不能让我写 HTML，而不是写虚拟 DOM。这个时候我们就可以把 HTML 编译成虚拟 DOM，然后在渲染虚拟 DOM。

因为编译本身就有性能开销，所以我们可以考虑在打包的时候就编译好 HTML 元素，这样在生产环境就可以直接渲染了。

编译的好处是我们可以对用户的代码进行分析，这样我们可以拿到一些信息便于我们在渲染的时候优化，可以极大的提高性能。

既然我们都可以编译了，干脆我直接把声明式代码编译成命令式代码。这样确实可以，并且直接变成了纯编译时的代码了。这样性能方面确实也很不错，但是却损失了一些灵活性，代码也必须编译才可以运行，这样在开发阶段的体验可能不是很好。
