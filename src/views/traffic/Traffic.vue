<template>
  <div class="Traffic m-container-small m-padded-tb-big" style="min-height: 800px!important;">
    <div class="ui container">
      <!--header-->
      <div class="ui top attached padded segment">
        <div class="ui middle aligned two column grid">
          <div class="column">
            <h3 class="ui teal header">流量统计</h3>
          </div>
          <div class="right aligned column">
            统计时间从
            <h2 class="ui orange header m-inline-block m-text-thin">2020/4/17</h2>开始
          </div>
        </div>
      </div>
      <th:block>
        <div class="ui fluid vertical menu m-padded">
          昨日Vp
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="yesterdayVp"></h2>比前日
          <h2 class="ui orange header m-inline-block m-text-thin">{{beforeGrowth}}</h2>
        </div>
      </th:block>
      <th:block>
        <div class="ui fluid vertical menu m-padded">
          今日Vp
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="todayVp"></h2>比昨日
          <h2 class="ui orange header m-inline-block m-text-thin">{{ growth }}</h2>
        </div>
      </th:block>
      <th:block>
        <div class="ui fluid vertical menu m-padded">
          历史Vp
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="allVp"></h2>日均
          <h2 class="ui orange header m-inline-block m-text-thin" v-text="averageDaily"></h2>
        </div>
      </th:block>
      <th:block>
        <div class="ui fluid vertical menu m-padded">
          历史
          <h2 class="ui orange header m-inline-block m-text-thin">24小时</h2>
          <span class="m-text-min">(按住Shift 滚动)</span>
          <div style="overflow: auto;">
            <canvas id="cv">你的设备不支持图表数据显示</canvas>
          </div>
        </div>
      </th:block>
    </div>
  </div>
</template>

<script>
import { brokenLine } from "utils/brokenLine";
export default {
  name: "Traffic",
  components: {},
  data() {
    return {
      beforedayVp: "加载中",
      todayVp: "加载中",
      allVp: "加载中",
      yesterdayVp: "加载中"
    };
  },
  computed: {
    growth() {
      let g = (
        ((this.todayVp - this.yesterdayVp) / this.yesterdayVp) *
        100
      ).toFixed(2);
      return (g < 0 ? "↓" + -g : "↑" + g) + "%";
    },
    beforeGrowth() {
      let g = (
        ((this.yesterdayVp - this.beforedayVp) / this.beforedayVp) *
        100
      ).toFixed(2);
      return (g < 0 ? "↓" + -g : "↑" + g) + "%";
    },
    averageDaily() {
      return (
        this.allVp / this.getDaysBetween("2020-04-17", new Date())
      ).toFixed(2);
    }
  },
  activated() {
    //24小时
    $.get({
      url: "trafficList24hours",
      success: res => {
        brokenLine(res, document.getElementById("cv"));
      }
    });
    //今日
    $.get({
      url: "trafficByCreateTime",
      data: {
        query: this.getDate(0),
        size: 1000,
        page: 1000
      },
      success: res => {
        this.todayVp = res.totalElements;
      }
    });
    //前日
    $.get({
      url: "trafficByCreateTime",
      data: {
        query: this.getDate(2),
        size: 1000,
        page: 1000
      },
      success: res => {
        this.beforedayVp = res.totalElements;
      }
    });
    //昨日
    $.get({
      url: "trafficByCreateTime",
      data: {
        query: this.getDate(1),
        size: 1000,
        page: 1000
      },
      success: res => {
        this.yesterdayVp = res.totalElements;
      }
    });
    //所有
    $.get({
      url: "trafficTotal",
      success: res => {
        this.allVp = res;
      }
    });
  },
  methods: {
    //获取day天前的日期
    getDate(day) {
      var date = new Date();
      date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * day);
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    //获取两个日期之间的天数
    getDaysBetween(dateString1, dateString2) {
      var startDate = Date.parse(dateString1);
      var endDate = Date.parse(dateString2);
      var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
      // alert(days);
      return days;
    }
  },
  mounted() {}
};
</script>

<style scoped>
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 2px;
  height: 4px;
  background-color: rgb(255, 255, 255);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #00b5ad;
}
</style>