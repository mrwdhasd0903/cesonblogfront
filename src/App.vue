<template>
  <div id="app" :class="isNight?'night':'day'">
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view class="info" style="min-height:800px"></router-view>
    </keep-alive>
    <footer-bar></footer-bar>
    <div class="moon" v-if="isNight"></div>
  </div>
</template>

<script>
import "ajax/base";
import NavBar from "components/navBar/NavBar";
import FooterBar from "components/footer/FooterBar";
var _hmt = _hmt || [];

export default {
  name: "App",
  components: { NavBar, FooterBar },
  data() {
    return {
      isNight: false
    };
  },
  mounted() {
    $.post({
      url: "trafficUp"
    });
    this.baidustatistical();
  },
  provide() {
    return {
      setNight: this.setNight,
      baidustatistical: this.baidustatistical
    };
  },
  methods: {
    //百度统计
    baidustatistical() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?2bfc05a1c19c23b09afa56201053d18e";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    },
    setNight() {
      this.isNight = !this.isNight;
    }
  }
};
</script>

<style>
</style>
