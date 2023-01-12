<template>
  <div>
    我是search
    <TypeNav></TypeNav>
    <h1>param---{{ $route.params.keyword }}</h1>
    <h1>query---{{ $route.query.k }}</h1>
  </div>
</template>

<script>
export default {
  name: "Search",
  // 路由组件可以传递props
  props: ["keyword"],
};
</script>

<style>

</style>
