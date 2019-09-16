---
order: 3
title: 在线预览JSX
type: 入门
---

创建如下的目录结构，在 `demo` 目录下的 `.md` 中编写 `jsx` ， 即可实现在线预览。

```tree
├── components
    └── button
        ├── index.en-US.md
        ├── index.zh-CN.md
        └── demo
            ├── basic.md
            └── block.md
```

---

### 1. 创建上面的目录结构

### 2. 编写 `index.zh-CN.md`

> 文件中得包含 `## API` ，demo会渲染到此处

```markdown
---
category: Components
type: 通用
title: Button
subtitle: 按钮
order: 1
---

## API

...
```

### 3. 编写 `basic.md` 和 `block.md`


例如 `basic.md`

```markdown
---
order: 0
title:
  zh-CN: 按钮类型
  en-US: Type
---

## zh-CN

按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。

## en-US

There are `primary` button, `default` button, `dashed` button and `danger` button in antd.

```jsx
import { Button } from 'antd';

ReactDOM.render(
  <div>
    <Button type="primary" style={{ marginRight: 10 }}>Primary</Button>
    <Button style={{ marginRight: 10 }}>Default</Button>
    <Button type="dashed" style={{ marginRight: 10 }}>Dashed</Button>
    <Button type="danger" style={{ marginRight: 10 }}>Danger</Button>
    <Button type="link">Link</Button>
  </div>,
  mountNode
);
```

然后打开浏览器访问 http://127.0.0.1:8000/components/button-cn

<img src="/images/screenshots/button-zh.png" alt="home screenshot" />
