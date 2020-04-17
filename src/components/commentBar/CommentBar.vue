<template>
  <div class="ui bottom attached segment">
    <!--留言区域列表-->
    <div id="comment-container" class="ui teal segment">
      <div>
        <div class="ui threaded comments" style="max-width: 100%;">
          <h3 class="ui dividing header">评论</h3>
          <div class="comment" v-for="(item,index) in commentList" :key="'commentList'+index">
            <a class="avatar">
              <img :src="item.adminComment?userAvatar:item.avatar" />
            </a>
            <div class="content">
              <a class="author">
                <span v-text="item.nickname"></span>
                <div
                  class="ui mini basic teal left pointing label m-padded-mini"
                  v-if="item.adminComment"
                >博主</div>
              </a>
              <div class="metadata">
                <span class="date" v-text="ChangeDateFormat(item.createTime)"></span>
              </div>
              <div class="text" v-text="item.content"></div>
              <div class="actions">
                <a
                  class="reply"
                  :data-commentid="item.id"
                  :data-commentnickname="item.nickname"
                  @click="reply(item.id,item.nickname)"
                >回复</a>
              </div>
            </div>
            <div class="comments" v-if="item.replyComments.length>0">
              <div
                class="comment"
                v-for="(replyItem,index) in  uniqueArray(item.replyComments,'id')"
                :key="'replyComments'+index"
              >
                <a class="avatar">
                  <img :src="replyItem.adminComment?userAvatar:replyItem.avatar" />
                </a>
                <div class="content">
                  <a class="author">
                    <span v-text="replyItem.nickname"></span>
                    <div
                      class="ui mini basic teal left pointing label m-padded-mini"
                      v-if="replyItem.adminComment"
                    >博主</div>&nbsp;
                    <span v-text="'@'+ replyItem.parentComment.nickname" class="m-teal"></span>
                  </a>
                  <div class="metadata">
                    <span class="date" v-text="ChangeDateFormat(replyItem.createTime)"></span>
                  </div>
                  <div class="text" v-text="replyItem.content"></div>
                  <div class="actions">
                    <a
                      class="reply"
                      :data-commentid="replyItem.id"
                      :data-commentnickname="replyItem.nickname"
                      @click="reply(replyItem.id,replyItem.nickname)"
                    >回复</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="comment-form" class="ui form">
      <div class="field">
        <textarea name="content" v-model="data.content" placeholder="请输入评论信息..."></textarea>
      </div>
      <div class="fields">
        <div class="popup-err-intput field m-mobile-wide m-margin-bottom-small">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input
              type="text"
              name="nickname"
              :disabled="isDisabled"
              placeholder="起个响亮的昵称吧"
              v-model="data.nickname"
            />
          </div>
        </div>
        <div class="field m-mobile-wide m-margin-bottom-small">
          <div class="ui left icon input">
            <i class="mail icon"></i>
            <input type="text" name="email" placeholder="邮箱不会作为展示" v-model="data.email" />
          </div>
        </div>
        <div class="field m-margin-bottom-small m-mobile-wide">
          <button @click="delInput" class="ui teal basic button m-mobile-wide">
            <i class="eraser icon"></i>清空
          </button>
          <button @click="commentPost" type="button" class="ui teal button m-mobile-wide">
            <i class="edit icon"></i>发布
          </button>

          <button class="errmsg-button" style="display:none"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChangeDateFormat from "utils/ChangeDateFormat";
import { getCookie, setCookie } from "utils/cookie";
export default {
  name: "CommentBar",
  components: {},
  data() {
    return {
      isDisabled: false,
      commentList: [],
      data: {
        "parentComment.id": -1,
        "blog.id": 0,
        nickname: "",
        email: "",
        content: "",
        avatar:
          "http://47.113.92.137:8888/upload/io/img/2020/4/6/1586149620923.png"
      }
    };
  },
  props: {
    userAvatar: ""
  },
  mounted() {
    //触发按钮
    $(".errmsg-button").popup({
      position: "top center",
      target: ".popup-err-intput",
      title: "提示",
      on: "click",
      content: "稍等一会再留言吧"
    });
    //获取cookie
    this.data.nickname = getCookie("nickname");
    this.data.email = getCookie("email");
    if (this.data.nickname) {
      this.isDisabled = true;
    }
    //获取内容
    if (this.$route.params.bid) {
      this.data["blog.id"] = this.$route.params.bid;
      this.getCommentList(this.$route.params.bid);
    }
    //评论表单验证
    $(".ui.form").form({
      fields: {
        title: {
          identifier: "content",
          rules: [
            {
              type: "empty",
              prompt: "请输入评论内容"
            }
          ]
        },
        content: {
          identifier: "nickname",
          rules: [
            {
              type: "empty",
              prompt: "请输入你的大名"
            }
          ]
        },
        type: {
          identifier: "email",
          rules: [
            {
              type: "email",
              prompt: "请填写正确的邮箱地址"
            }
          ]
        }
      }
    });
  },
  computed: {},
  methods: {
    //发布
    commentPost() {
      var boo = $(".ui.form").form("validate form");
      setCookie("nickname", this.data.nickname, 30);
      setCookie("email", this.data.email, 30);
      if (boo) {
        $.post({
          url: "comment",
          data: this.data,
          success: res => {
            if (res === 0) {
              this.getCommentList(this.$route.params.bid);
              $(window).scrollTo("#comment-container", 400);
              this.delInput();
            } else {
              $(".errmsg-button").click();
            }
            this.isDisabled = true;
          }
        });
      } else {
        console.log("校验失败");
      }
    },
    //清空
    delInput() {
      $("[name='content']")
        .attr("placeholder", "请输入评论信息...")
        .focus();
      this.data["parentComment.id"] = -1;
      this.data.content = "";
    },
    //回复点击
    reply(id, nickname) {
      $("[name='content']")
        .attr("placeholder", "@" + nickname)
        .focus();
      this.data["parentComment.id"] = id;
      $(window).scrollTo($("#comment-form"), 500);
    },
    //
    //序列化时间
    ChangeDateFormat(date) {
      return ChangeDateFormat(date);
    },
    //获取回复列表
    getCommentList(id) {
      $.get({
        url: "comments",
        data: { id: id },
        success: res => {
          this.commentList = res;
        }
      });
    },
    //json数组去重
    uniqueArray(array, key) {
      var result = [array[0]];
      for (var i = 1; i < array.length; i++) {
        var item = array[i];
        var repeat = false;
        for (var j = 0; j < result.length; j++) {
          if (item[key] == result[j][key]) {
            repeat = true;
            break;
          }
        }
        if (!repeat) {
          result.push(item);
        }
      }
      return result;
    }
  }
};
</script>

<style scoped>
</style>