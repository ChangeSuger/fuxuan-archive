# 贡献指南

项目使用 TS + Vue3 + Vite 进行开发

其中，Vue SFC 组件使用 `<script setup>` 写法。

```vue
<script setup lang="ts">
// ...
</script>
```

状态管理使用 [Pinia](https://pinia.vuejs.org/zh/)

## 命名规则

- 组件名称 : 大驼峰
- 函数 : function
- 函数命名 : 小驼峰
- 私有变量 : 小驼峰
- 公有变量 : 小驼峰
- 常量 : 全大写，单词之间使用 `_` 分隔
- 模板 : 大驼峰

## 注释规则

- 尽可能详细

## 提交信息

`提交类型`: `简要描述`

> 参考：[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)
