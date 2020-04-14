<template>
  <div class="ui attached positive message">
    <!--博客信息-->
    <div class="ui middle aligned grid">
      <div class="eleven wide column">
        <ui class="list">
          <li>
            作者：
            <span>{{nickname}}</span>
            <a href="#comment-container">（联系{{nickname}}）</a>
          </li>
          <li>
            发表时间：
            <span>{{updateTime}}</span>
          </li>
          <li>版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）</li>
          <li>公众号转载：请在文末添加此域名或二维码</li>
        </ui>
      </div>
      <div class="five wide column">
        <img :src="imgSrc" class="ui right floated rounded bordered image" style="width: 110px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShareStatement",
  components: {},
  data() {
    return {};
  },
  props: {
    nickname: "",
    imgSrc: "",
    updateTime: ""
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>