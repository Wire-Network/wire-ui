# wire-card



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type                                                  | Default     |
| ---------- | ----------- | ----------- | ----------------------------------------------------- | ----------- |
| `actions`  | --          |             | `HTMLElement \| undefined`                            | `undefined` |
| `border`   | `border`    |             | `"default" \| "featured" \| "primary" \| "secondary"` | `'default'` |
| `heading`  | `heading`   |             | `string \| undefined`                                 | `undefined` |
| `icon`     | `icon`      |             | `string \| undefined`                                 | `undefined` |
| `iconSize` | `icon-size` |             | `"large" \| "medium" \| "small" \| number`            | `'medium'`  |
| `shadow`   | `shadow`    |             | `boolean`                                             | `true`      |
| `theme`    | `theme`     |             | `"dark" \| "light" \| undefined`                      | `undefined` |


## Dependencies

### Used by

 - [my-component](../my-component)

### Depends on

- [wire-icon](../wire-icon)

### Graph
```mermaid
graph TD;
  wire-card --> wire-icon
  my-component --> wire-card
  style wire-card fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
