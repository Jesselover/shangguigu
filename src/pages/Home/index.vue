<template>
  <div>
    我是首页
    <!-- 三级联动组件，全局注册，无需引入,无需注册 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- <Floor></Floor> -->
    <Floor v-for="floor in floorList " :key="floor.id"  :floorList="floorList"/>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("getFloorList")
  },
  computed: {
    ...mapState({ floorList: state => state.home.floorList })
  }
};
</script>

<style>

</style>
