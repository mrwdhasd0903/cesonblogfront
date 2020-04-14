<template>
  <div class="m-container-small m-padded-tb-big animated fadeIn">
    <div class="ui container">
      <!--header-->
      <div v-if="tagList" class="ui top attached segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">标签</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{tagList.length}}</h2>个
          </div>
        </div>
      </div>

      <div class="ui attached segment m-padded-tb-large" v-if="tagList">
        <router-link
          tag="div"
          @click.native="getPageBlog(item.id)"
          class="ui basic left pointing large label m-margin-tb-tiny m-pointer"
          v-for="(item,index) in tagList"
          :to="'/blogbytag/' + item.id"
          :key="'tagList'+index"
          :class="{teal:$route.params.gid==item.id}"
        >
          <span>{{item.name}}</span>
          <div class="detail">{{item.blogssize}}</div>
        </router-link>
      </div>
      <blog-list :pageJump="pageJump" :pageData="pageData" :pageBlog="pageBlog"></blog-list>
    </div>
  </div>
</template>

<script>
import BlogList from "components/blogList/BlogList";
export default {
  name: "BlogByTag",
  components: { BlogList },
  data() {
    return {
      pageData: {
        // sort: "",
        size: 5,
        page: 0,
        id: ""
      },
      tagList: null,
      pageBlog: {}
    };
  },
  computed: {},
  activated() {
    //获取标签列表
    $.get({
      url: "tagssort",
      data: { size: 10000 },
      success: res => {
        this.tagList = res;
        //如果没有gid则跳转至第一个gid
        if (!this.$route.params.gid) {
          this.$router.push("/blogbytag/" + res[0].id);
          this.getPageBlog(res[0].id);
        } else {
          this.getPageBlog(this.$route.params.gid);
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
        url: "blogbytag",
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
    }
  }
};
</script>

<style scoped>
</style>