<template>
  <div class>
    <!-- loading -->
    <div class="loading" v-if="isLoading">
      <xhh-loading></xhh-loading>
    </div>
    <!--content-->
	<transition name="fade">
    <div v-if="vShow" class="ui top attached teal segment">
      <div
        class="ui padded vertical segment m-padded-tb-large"
        v-for="(item,index) in pageBlog.content"
        :key="'content'+index"
      >
        <div class="ui middle aligned mobile reversed stackable grid">
          <div class="eleven wide column">
            <h3 class="ui header">
              <router-link :to="'/blog/'+item.id" tag="a" class="m-black">{{item.title}}</router-link>
              <a class="m-black"></a>
            </h3>
            <p class="m-text">{{item.description}}</p>
            <div class="ui grid">
              <div class="row">
                <div class="six wide column">
                  <div class="ui mini horizontal link list">
                    <div class="item">
                      <img :src="item.user.avatar" class="ui avatar image" />
                      <div class="content">
                        <router-link to="/about" class="header">{{item.user.nickname}}</router-link>
                      </div>
                    </div>
                    <!--  -->
                  </div>
                </div>
                <div class="right aligned ten wide column">
                  <router-link
                    :to="'/blogbytype/'+item.type.id"
                    class="ui teal basic label m-padded-tiny m-text-thin"
                  >{{item.type.name}}</router-link>
                </div>
              </div>
              <!--  -->
              <div class="row">
                <div class="sixteen wide column m-black">
                  <span class="m-margin-lr-small">
                    <i class="calendar icon"></i>
                    <span>{{ChangeDateFormat(item.updateTime)}}</span>
                  </span>
                  <span class="m-margin-lr-small">
                    <i class="hand pointer icon"></i>
                    <span>{{item.views}}</span>
                  </span>
                  <span class="m-margin-lr-small">
                    <i class="comment alternate outline icon"></i>
                    <span>{{item.commentssize}}</span>
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="column">
                  <router-link
                    v-for="(tagItem,index) in item.tags"
                    :key="'tagItem'+index"
                    :to="'/blogbytag/'+tagItem.id"
                    :style="{ 'color':tagItem.color+'!important','border-color':tagItem.color+'!important'}"
                    class="ui teal basic left pointing label m-padded-tiny"
                  >{{tagItem.name}}</router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="five wide column">
            <router-link :to="'/blog/'+item.id">
              <img :src="item.firstPicture" class="ui rounded image" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
	</transition>

    <!--footer-->
    <div class="ui bottom attached segment" v-if="pageBlog.totalPages>1">
      <div class="ui middle aligned two column grid">
        <div class="column">
          <a
            @click="thisPageJump(-1)"
            v-if="!this.pageBlog.first"
            class="ui mini teal basic button"
          >上一页</a>
        </div>
        <div class="right aligned column">
          <a
            @click="thisPageJump(+1)"
            v-if="!this.pageBlog.last"
            class="ui mini teal basic button"
          >下一页</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeDateFormat from "utils/ChangeDateFormat";
import XhhLoading from "components/xhhLoading/XhhLoading";
export default {
  name: "BlogList",
  components: { XhhLoading },
  data() {
    return {
      isLoading: true,
	  vShow: true
    };
  },
  props: {
    pageJump: {
      type: Function,
      default: null
    },
    pageData: {
      // sort: "",
      size: 5,
      page: 0
    },
    pageBlog: {}
  },
  updated() {
    this.isLoading = false;
	this.vShow = true;
  },
  computed: {},
  methods: {
    //日期序列化
    ChangeDateFormat(date) {
      return ChangeDateFormat(date).substring(0, 10);
    },
    //对父组件的跳页多一层封装
    thisPageJump(a) {
      this.isLoading = true;
	  this.vShow = false;
      this.pageJump(a);
      //$(window).scrollTo(0, 200);
    }
  },
  mounted() {}
};
</script>
<style scope>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
