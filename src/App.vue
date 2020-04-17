<template>
  <div id="app">
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view style="min-height:800px"></router-view>
    </keep-alive>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import "ajax/base";
import NavBar from "components/navBar/NavBar";
import FooterBar from "components/footer/FooterBar";

export default {
  name: "App",
  components: { NavBar, FooterBar },
  mounted() {
    $.post({
      url: "trafficUp"
    });
  }
};
</script>

<style>
@import "assets/css/base.css";
@import "assets/css/me.css";
</style>
