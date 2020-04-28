<template>
  <nav
    :class="toggleClass?'nav':'nav-down'"
    class="ui info inverted attached segment m-padded-tb-mini m-shadow-small"
  >
    <div class="ui container">
      <div class="ui inverted secondary stackable menu">
        <h2 class="ui teal header item">
          <img src="~assets/img/logo.png" />
        </h2>
        <a
          @click="navjump('/cesonblog')"
          class="item"
          :class="{'active':$route.path.indexOf('/cesonblog')!=-1,'m-mobile-hide':toggleClass}"
        >
          <i class="mini home icon"></i>首页
        </a>
        <a
          @click="navjump('/blogbytype')"
          class="item"
          :class="{active:$route.path.indexOf('/blogbytype')!=-1,'m-mobile-hide':toggleClass}"
        >
          <i class="mini idea icon"></i>分类
        </a>
        <a
          @click="navjump('/blogbytag')"
          class="item"
          :class="{active:$route.path.indexOf('/blogbytag')!=-1,'m-mobile-hide':toggleClass}"
        >
          <i class="mini tags icon"></i>标签
        </a>
        <a
          @click="navjump('/archives')"
          class="item"
          :class="{active:$route.path.indexOf('/archives')!=-1,'m-mobile-hide':toggleClass}"
        >
          <i class="mini clone icon"></i>归档
        </a>
        <a
          @click="navjump('/about')"
          class="item"
          :class="{active:$route.path.indexOf('/about')!=-1,'m-mobile-hide':toggleClass}"
        >
          <i class="mini info icon"></i>关于小王
        </a>
        <a
          @click="navjump('/traffic')"
          class="item"
          :class="{active:$route.path.indexOf('/traffic')!=-1,'m-mobile-hide':toggleClass}"
        >
          <i class="mini chart pie icon"></i>流量统计
        </a>
        <div class="right item" :class="{'m-mobile-hide':toggleClass}">
          <div class="ui icon inverted transparent input m-margin-tb-tiny">
            <input type="text" v-model="searchKey" placeholder="Search...." />
            <i @click="search" class="search link icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="lamp-switch" @click="setNight"></div>
    <a @click="menuToggle" class="ui menu toggle black icon button m-right-top m-mobile-show">
      <i class="sidebar icon"></i>
    </a>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  data() {
    return {
      toggleClass: true,
      searchKey: ""
    };
  },
  inject: ["setNight"],
  mounted() {},
  computed: {},
  methods: {
    menuToggle() {
      this.toggleClass = !this.toggleClass;
    },
    navjump(link) {
      if (this.$route.path.indexOf(link)) {
        this.menuToggle();
        this.$router.push(link);
      }
    },
    search() {
      if (this.searchKey) {
        this.$router.push({
          path: "/search",
          query: {
            key: this.searchKey
          }
        });
        this.searchKey = "";
      }
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 767px) {
  .nav {
    height: 59.56px;
    transition: all 0.2s ease;
  }
  .nav-down {
    transition: all 0.2s ease;
    height: 321.94px;
  }
}
</style>