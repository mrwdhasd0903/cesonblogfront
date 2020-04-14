<template>
  
  <div>
    <div class="ui center aligned basic segment">
      <button id="payButton" class="ui orange basic circular button">赞赏</button>
    </div>
    <div class="ui payQR flowing popup transition hidden">
      <div class="ui orange basic label">
        <div class="ui images" style="font-size: inherit !important;">
          <div class="image">
            <img :src="payCode.payByZhi" class="ui rounded bordered image" style="width: 120px" />
            <div>支付宝</div>
          </div>
          <div class="image">
            <img :src="payCode.payByWechat" class="ui rounded bordered image" style="width: 120px" />
            <div>微信</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Appreciation",
  components: {},
  data() {
    return {};
  },
  props: {
    payCode: {
      payByZhi: "",
      payByWechat: ""
    }
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
</style>