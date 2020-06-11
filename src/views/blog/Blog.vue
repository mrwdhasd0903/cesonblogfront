<template>
  <div class>
    <no-find v-if="!this.$route.params.bid"></no-find>
    <div v-if="blog" class="m-container-small m-padded-tb-big animated fadeIn">
      <div class="ui container">
        <div class="ui top attached segment">
          <div class="ui horizontal link list">
            <div class="item">
              <img :src="blog.user.avatar" alt class="ui avatar image" />
              <div class="content">
                <a class="header">{{blog.user.nickname}}</a>
              </div>
            </div>
            <div class="item">
              <i class="calendar icon"></i>
              <span>{{ChangeDateFormat(blog.updateTime)}}</span>
            </div>
            <div class="item">
              <i class="hand pointer icon"></i>
              <span>{{blog.views}}</span>
            </div>
            <div class="item">
              <i class="comment alternate outline icon"></i>
              <span>{{blog.commentssize}}</span>
            </div>
          </div>
        </div>
        <div class="ui attached segment">
          <!--图片区域-->
          <img :src="blog.firstPicture" class="ui fluid rounded image" />
        </div>
        <div class="ui attached padded segment">
          <!--内容-->
          <div class="ui right aligned basic segment">
            <div class="ui orange basic label">{{blog.flag}}</div>
          </div>

          <h2 class="ui center aligned header">{{blog.title}}</h2>
          <br />
          <!--中间主要内容部分-->
          <div
            id="content"
            v-highlight
            class="js-toc-content typo typo-selection m-padded-lr-responsive m-padded-tb-large"
            v-html="blog.content"
          ></div>
          <!--标签-->
          <div class="m-padded-lr-responsive">
            <router-link
              tag="a"
              class="ui basic teal left pointing label"
              v-for="(tagItem,index) in blog.tags"
              :to="'/blogbytag/'+tagItem.id"
              :style="{'color':tagItem.color+'!important','border-color':tagItem.color+'!important' }"
              :key="'tagItem'+index"
            >{{tagItem.name}}</router-link>
          </div>

          <!--赞赏-->
          <appreciation v-if="blog.appreciation" :payCode="contacts"></appreciation>
        </div>
        <!--博客版权信息-->
        <share-statement
          v-if="blog.shareStatement"
          :nickname="blog.user.nickname"
          :updateTime="ChangeDateFormat(blog.createTime)"
          :imgSrc="'http://qr.liantu.com/api.php?text='+getWindowHref()"
        ></share-statement>
        <!-- ----留言板块 -->
        <comment-bar v-if="blog.commentabled" :userAvatar="blog.user.avatar"></comment-bar>
      </div>
    </div>

    <div id="toolbar" class="m-padded m-fixed m-right-bottom">
      <div class="ui vertical icon buttons">
        <button type="button" @click="$router.back(-1)" class="ui teal button">返回</button>
        <button type="button" class="ui toc teal button">目录</button>
        <a href="#comment-container" class="ui teal button">留言</a>
        <button class="ui wechat icon button">
          <i class="weixin icon"></i>
        </button>
        <button @click="setNight" class="ui icon button">
          <i class="lightbulb outline icon"></i>
        </button>
        <div id="toTop-button" class="ui icon button">
          <i class="chevron up icon"></i>
        </div>
      </div>
    </div>

    <div class="ui toc-container flowing popup transition hidden" style="width: 250px!important;">
      <ol class="js-toc"></ol>
    </div>

    <div
      id="qrcode"
      class="ui wechat-qr flowing popup transition hidden"
      style="width: 130px !important;"
    >
      <img
        :src="'http://qr.liantu.com/api.php?text='+getWindowHref()"
        class="ui rounded image"
        style="width: 120px !important;"
      />
      <div style="text-align:center;font-size:12px">
        <span>扫一扫</span>
        <p>使用手机阅读</p>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeDateFormat from "utils/ChangeDateFormat";
import Appreciation from "components/appreciation/Appreciation";
import ShareStatement from "components/shareStatement/ShareStatement";
import CommentBar from "components/commentBar/CommentBar";
import NoFind from "components/err/NoFind";
import tocbot from "assets/js/tocbot.min";
import { imgAmp } from "utils/imgAmp";
export default {
  name: "Blog",
  components: { NoFind, Appreciation, ShareStatement, CommentBar },
  data() {
    return {
      blog: null,
      contacts: {}
    };
  },
  deactivated() {
    this.blog = null;
  },
  activated() {
    this.baidustatistical();
    if (this.$route.params.bid) {
      $.get({
        url: "blog",
        data: { id: this.$route.params.bid },
        success: res => {
          this.blog = res;
          $(window).scrollTo(0, 10);
          this.setTO();
        },
        error: res => {
          this.noFindShow = false;
          this.$router.push("/blog");
        }
      });
      $.get({
        url: "contacts",
        success: res => {
          this.contacts = res[0];
        }
      });
    } else {
      this.noFindShow = false;
    }
  },
  inject: ["setNight", "baidustatistical"],
  computed: {},
  methods: {
    //获取地址
    getWindowHref() {
      return window.location.href;
    },
    //序列化时间
    ChangeDateFormat(date) {
      return ChangeDateFormat(date);
    },
    //延迟
    setTO() {
      setTimeout(() => {
        this.litsenAll();
        this.tocbotInit();
        var html = "<div style='width:100%;overflow:auto'></div>";
        $(".tablee").wrap(html);
      }, 200);
    },
    //监听
    litsenAll() {
      imgAmp("js-toc-content");
      $("#payButton").popup({
        popup: $(".payQR.popup"),
        on: "click",
        position: "bottom center"
      });
      $("#toTop-button").click(function() {
        $(window).scrollTo(0, 500);
      });
      $(".toc.button").popup({
        popup: $(".toc-container.popup"),
        on: "click",
        position: "left center"
      });
      $(".wechat").popup({
        popup: $(".wechat-qr"),
        position: "left center"
      });
    },
    //初始化目录
    tocbotInit() {
      tocbot.init({
        // Where to render the table of contents.
        tocSelector: ".js-toc",
        // Where to grab the headings to build the table of contents.
        contentSelector: "#content",
        // Which headings to grab inside of the contentSelector element.
        headingSelector: "h1, h2, h3, h4"
      });
    }
  }
};
</script>

<style scoped>
@import "~assets/css/tocbot.css";
@import "~assets/css/typo.css";
</style>