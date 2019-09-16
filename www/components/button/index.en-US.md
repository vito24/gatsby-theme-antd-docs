---
category: Components
type: General
title: Button
order: 1
---

## API

To get a customized button, just set `type`/`shape`/`size`/`loading`/`disabled`.

| Property | Description                                                                                                                      | Type                         | Default   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------- |
| disabled | disabled state of button                                                                                                         | boolean                      | `false`   |
| ghost    | make background transparent and invert text and border colors, added in 2.7                                                      | boolean                      | `false`   |
| href     | redirect url of link button                                                                                                      | string                       | -         |
| htmlType | set the original html `type` of `button`, see: [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string                       | `button`  |
| icon     | set the icon of button, see: Icon component                                                                                      | string                       | -         |
| loading  | set the loading status of button                                                                                                 | boolean \| { delay: number } | `false`   |
| shape    | can be set to `circle`, `round` or omitted                                                                                       | string                       | -         |
| size     | can be set to `small` `large` or omitted                                                                                         | string                       | `default` |
| target   | same as target attribute of a, works when href is specified                                                                      | string                       | -         |
| type     | can be set to `primary` `ghost` `dashed` `danger` `link`(added in 3.17) or omitted (meaning `default`)                           | string                       | `default` |
| onClick  | set the handler to handle `click` event                                                                                          | (event) => void              | -         |
| block    | option to fit button width to its parent width                                                                                   | boolean                      | `false`   |

It accepts all props which native button support.

`<Button>Hello world!</Button>` will be rendered into `<button><span>Hello world!</span></button>`, and all the properties which are not listed above will be transferred to the `<button>` tag.

`<Button href="http://example.com">Hello world!</Button>` will be rendered into `<a href="http://example.com"><span>Hello world!</span></a>`.
