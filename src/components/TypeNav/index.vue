<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- * 过度动画 1.必须搭配v-if/v-show使用-->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(index)" :class="{ cur: currentIndex == index }">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex == index ? 'block' : 'none' }">
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
                        }}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
                          }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>



<script>
import { mapState } from "vuex";
import throttle from 'lodash/throttle';//按需引入，throttle默认暴露，不需要加{}
export default {
  name: "TypeNav",
  // 组件挂载完毕，发送请求
  data() {
    return {
      // 存储用户鼠标移到了哪一个一级分类
      currentIndex: -1, //*
      show: true,
    };
  },
  mounted() {
    // 通知vue发送请求，获取数据，存储于仓库中
    // 为减少请求次数，提高性能，选择放在app中
    // this.$store.dispatch("categoryList");
    // ? 当目前不在home中时，组件挂载完毕，show=false
    if (this.$route.path != "/Home") {
      this.show = false
    }
  },
  computed: {
    // 对象写法：name：函数（1. 会注入一个参数state，是大仓库的数据 2. 当使用此计算属性时，此函数会立即被调用）
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 
    // changeIndex(index) {
    //   // index:鼠标移到哪一个一级分类的索引值
    //   this.currentIndex = index;
    //   console.log("鼠标进入"+index);
    // },
    // 鼠标进入，当前列背景颜色变天蓝色
    changeIndex: throttle(function (index) {
      // throttle不要使用箭头函数，可能出现this问题
      this.currentIndex = index;
      console.log("鼠标进入" + index);
    }, 50),
    // 鼠标移出，没有skyblue背景色·
    leaveIndex() {
      // 鼠标移出
      this.currentIndex = -1;
      // leaveShow
      if (this.$route.path != "/Home") {
        this.show = false
      }
    },
    // 事件委派，点击1，2，3级列表跳转路由
    goSearch(event) {
      let element = event.target;
      // 1. element.dataset,存储当前节点的自定义属性与属性值
      // 2. 浏览器会自动把自定义属性的名字全部改为小写
      let { categoryname, category1id, category2id, category3id } = element.dataset;//对象的解构赋值
      // *判断是否为a标签：自定义标签上有categoryname的是a标签
      // *判断为几级标签：自定义标签是category1id，还是category2id，还是category3id
      //  todo 整理路由参数
      let location = { name: 'Search' };
      let query = { categoryName: categoryname }
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
      }
      // ? 判断：如果路由跳转时，携带params参数，也需要一并传过去
      if (this.$route.params) {
        // 恒真。Boolean({})=true.
        location.params = this.$route.params;
        location.query = query;
        this.$router.push(location);
      }
      // // todo 路由参数整理完毕
      // location.query = query;
      // // todo路由跳转
      // this.$router.push(location)


    },
    // 鼠标移入时，商品分类列表进行展示
    enterShow() {
      if (this.$route.path != "/Home") {
        this.show = true;
      }
    }
  },
};

</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过度动画
    .sort-enter {
      height: 0px;
    }

    .sort-enter-to {
      height: 461px;
    }

    .sort-enter-active {
      transition: all .5s linear;
    }
  }
}
</style>
