---
order: 0
col: 2
title:
  zh-CN: 按钮类型
  en-US: Type
---

## zh-CN

按钮有四种类型：主按钮、次按钮、虚线按钮、危险按钮。主按钮在同一个操作区域最多出现一次。

## en-US

There are `primary` button, `default` button, `dashed` button and `danger` button in antd.

```jsx
import { Button } from 'example';

ReactDOM.render(
  <div>
    <Button type="primary" style={{ marginRight: 10 }}><span>Primary</span></Button>
    <Button style={{ marginRight: 10 }}>Default</Button>
    <Button type="dashed" style={{ marginRight: 10 }}>Dashed</Button>
    <Button type="danger" style={{ marginRight: 10 }}>Danger</Button>
    <Button loading={true} style={{ marginRight: 10 }}>loading</Button>
    <Button disabled={true} style={{ marginRight: 10 }}>disabled</Button>
    <Button type="link">Link</Button>
  </div>,
  mountNode
);
```
