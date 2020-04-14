<template>
  <div class="m-container-small m-padded-tb-big" style="min-height: 800px!important;">
    <div class="ui container">
      <!--header-->
      <div class="ui top attached padded segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">归档</h3>
          </div>
          <div class="right aligned column">
            共
            <h2 class="ui orange header m-inline-block m-text-thin">{{blogcount}}</h2>篇文章
          </div>
        </div>
      </div>

      <th:block v-for="(item,index) in mapArchives" :key="'mapArchives'+index">
        <h3 class="ui center aligned header">{{index}}</h3>
        <div class="ui fluid vertical menu">
          <router-link
            class="item"
            v-for="(blogItem,blogIndex) in item"
            :key="'blogItem'+blogIndex"
            :to="'/blog/'+blogItem.id"
          >
            <span>
              <i class="mini teal circle icon"></i>
              <span>{{blogItem.title}}</span>
              <div
                class="ui teal basic left pointing label m-padded-mini"
              >{{ChangeDateFormat(blogItem.createTime)}}</div>
            </span>
            <div
              :class="setClass(blogItem.flag)"
              class="ui basic left pointing label m-padded-mini"
            >{{blogItem.flag}}</div>
          </router-link>
        </div>
      </th:block>
    </div>
  </div>
</template>

<script>
export default {
  name: "Archives",
  components: {},
  data() {
    return {
      blogcount: null,
      mapArchives: null
    };
  },
  mounted() {
    $.get({
      url: "archivemap",
      success: res => {
        this.mapArchives = res;
        console.log(res);
      }
    });
    $.get({
      url: "blogcount",
      success: res => {
        this.blogcount = res;
        console.log(res);
      }
    });
  },
  computed: {},
  methods: {
    //
    setClass(flag) {
      if (flag == "原创") {
        return "orange";
      } else if (flag == "转载") {
        return "red";
      } else {
        return "yellow";
      }
    },
    //mmdd
    ChangeDateFormat(date) {
      var arr = date.split("T");
      var d = arr[0];
      var darr = d.split("-");

      var t = arr[1];
      var tarr = t.split(".000");
      var marr = tarr[0].split(":");

      var dd =
        // parseInt(darr[0]) +
        // "年" +
        parseInt(darr[1]) + "月" + parseInt(darr[2]) + "日";
      //parseInt(marr[0])
      // ":" +
      // parseInt(marr[1]) +
      // ":" +
      // parseInt(marr[2]);
      return dd;
    }
  }
};
</script>

<style scoped>
</style>