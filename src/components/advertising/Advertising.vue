<template>
  <div v-if="carousel.switch">
    <h4 class="ui horizontal divider header m-margin-top-large">卑微的广告</h4>
    <div class="ui shape">
      <div class="sides">
        <div class="side" v-for="(item,index) in carousel.items" :key="'carousel'+index">
          <a target="_blank" :href="item.href">
            <img :src="item.src" @load="loadOK" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Advertising",
  components: {},
  data() {
    return {
      loadCount: 0,
      carousel: {
        switch: true,
        items: [
          {
            src:
              "https://img.alicdn.com/tfs/TB1Ak92euH2gK0jSZFEXXcqMpXa-440-255.png",
            href: "https://www.aliyun.com/minisite/goods?userCode=c6po0lwh"
          },
          {
            src:
              "https://img.alicdn.com/tfs/TB1hblJl7Y2gK0jSZFgXXc5OFXa-750-400.jpg",
            href: "https://www.aliyun.com/minisite/goods?userCode=c6po0lwh"
          },
          {
            src:
              "https://img.alicdn.com/tfs/TB1kJDyvSzqK1RjSZPxXXc4tVXa-504-320.jpg",
            href: "https://www.aliyun.com/minisite/goods?userCode=c6po0lwh"
          }
        ]
      }
    };
  },
  methods: {
    loadOK() {
      this.loadCount++;
      if (this.loadCount == this.carousel.items.length) {
        $(".shape").shape();
        setInterval(() => {
          $(".shape").shape("flip left");
        }, 3000);
      }
    }
  }
};
</script>

<style scoped>
.shape {
  width: 100%;
}
img {
  width: 100%;
  border-radius: 4px;
}
.side {
  width: 100%;
  height: 400px;
}
</style>