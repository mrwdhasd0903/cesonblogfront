<template>
  <footer class="ui inverted vertical segment m-padded-tb-massive">
    <div class="ui center aligned container">
      <div class="ui inverted divided stackable grid">
        <div class="four wide column">
          <div class="ui inverted link list">
            <div class="item">
              <img :src="listContact.wechatCode" class="ui rounded image" alt style="width: 110px" />
            </div>
          </div>
        </div>
        <div class="four wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced">友情链接</h4>
          <div class="ui inverted link list">
            <a
              v-for="(item,index) in listLink"
              :key="'listLink'+index"
              :href="item.link"
              class="item m-text-thin"
              arget="_blank"
            >{{item.name}}</a>
          </div>
        </div>
        <div class="four wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced">联系小王</h4>
          <div class="ui inverted link list">
            <a class="item m-text-thin">{{listContact.email}}</a>
            <a class="item m-text-thin">{{'QQ：'+listContact.qq}}</a>
            <a class="item m-text-thin">{{'WeChat：'+listContact.wechat}}</a>
          </div>
        </div>
        <div class="four wide column">
          <br />
          <br />
          <p class="m-text-thin m-text-spaced m-opacity-mini">唯有时间对我们一视同仁</p>
        </div>
      </div>
      <div class="ui inverted section divider"></div>
      <p class="m-text-thin m-text-spaced m-opacity-tiny">
        <a
          style="color:rgba(255,255,255,.9)"
          href="http://www.beian.gov.cn/"
          target="_blank"
        >粤ICP备20003149号</a> | Copyright © 2019 - 2022 - www.wdhhh.cn | By 小王的程序人生
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  data() {
    return {
      listContact: [],
      listLink: []
    };
  },
  mounted() {
    $.get({
      url: "contacts",
      success: res => {
        this.listContact = res[0];
      }
    });
    $.get({
      url: "links",
      success: res => {
        this.listLink = res;
      }
    });
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>