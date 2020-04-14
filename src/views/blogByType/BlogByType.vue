<template>
  <div class="m-container-small m-padded-tb-big animated fadeIn">
    <div class="ui container">
      <!--header-->
      <div v-if="typeList" class="ui top attached segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">分类</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{typeList.length}}</h2>个
          </div>
        </div>
      </div>

      <div class="ui attached segment m-padded-tb-large" v-if="typeList">
        <router-link
          tag="div"
          @click.native="getPageBlog(item.id)"
          class="ui labeled button m-margin-tb-tiny"
          v-for="(item,index) in typeList"
          :to="'/blogbytype/' + item.id"
          :key="'typeList'+index"
        >
          <span class="ui basic button" :class="{teal:$route.params.tid==item.id}">{{item.name}}</span>
          <div
            class="ui basic left pointing label"
            :class="{teal:$route.params.tid==item.id}"
            th:text="${#arrays.length(type.blogs)}"
          >{{item.blogssize}}</div>
        </router-link>
      </div>

      <blog-list :pageJump="pageJump" :pageData="pageData" :pageBlog="pageBlog"></blog-list>
    </div>
  </div>
</template>

<script>
import BlogList from "components/blogList/BlogList";
export default {
  name: "BlogByType",
  components: { BlogList },
  data() {
    return {
      pageData: {
        // sort: "",
        size: 5,
        page: 0,
        id: ""
      },
      typeList: null,
      pageBlog: {}
    };
  },
  computed: {},
  mounted() {},
  activated() {
    //获取分类列表
    $.get({
      url: "typessort",
      data: { size: 10000 },
      success: res => {
        this.typeList = res;
        //如果没有tid则跳转至第一个tid
        if (!this.$route.params.tid) {
          this.$router.push("/blogbytype/" + res[0].id);
          this.getPageBlog(res[0].id);
        } else {
          this.getPageBlog(this.$route.params.tid);
        }
      }
    });
  },
  methods: {
    //获取博客分页查询列表
    getPageBlog(id) {
      if (id != -1) {
        this.pageData.id = id;
      }
      $.get({
        url: "blogbytype",
        data: this.pageData,
        success: res => {
          this.pageBlog = res;
        }
      });
    },
    //跳页
    pageJump(a) {
      this.pageData.page += a;
      this.getPageBlog(-1);
    },
  }
};
</script>

<style scoped>
</style>