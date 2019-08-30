---
order: 9
title:
  zh-CN: block 按钮
  en-US: block Button
---

## zh-CN

`block`属性将使按钮适合其父宽度。

## en-US

`block` property will make the button fit to its parent width.

```jsx
import { Button } from 'antd';

ReactDOM.render(
  <div>
    <Button type="primary" block style={{ marginBottom: 10 }}>
      Primary
    </Button>
    <Button block style={{ marginBottom: 10 }}>Default</Button>
    <Button type="dashed" block style={{ marginBottom: 10 }}>
      Dashed
    </Button>
    <Button type="danger" block style={{ marginBottom: 10 }}>
      Danger
    </Button>
    <Button type="link" block style={{ marginBottom: 10 }}>
      Link
    </Button>
  </div>,
  mountNode
);
```
