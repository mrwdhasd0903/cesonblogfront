<template>
  <div class="xhh-loading">
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
    <div class="dot dot4"></div>
    <div class="dot dot5"></div>
  </div>
</template>

<script>
export default {
  name: "XhhLoading",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script><style>
:root {
  /*点大小*/
  --xhhcorrpointsize: 30px;
  /*周期*/
  --xhhcorrpointtime: 1.6s;

  --dot1color: #00fff4;
  --dot2color: #00cec5;
  --dot3color: #00aba3;
  --dot4color: #00847d;
  --dot5color: #00635d;
}
.xhh-loading {
  position: relative;
  margin: 0 auto;
  width: 265px;
  height: 85px;
}

.dot {
  position: absolute;
  top: 50px;
  transform: translate(-50%, -50%);
  width: var(--xhhcorrpointsize);
  height: var(--xhhcorrpointsize);
  border-radius: 50%;
}

.dot::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--xhhcorrpointsize);
  height: var(--xhhcorrpointsize);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  animation: dot var(--xhhcorrpointtime) ease infinite;
}

@keyframes dot {
  0% {
    width: var(--xhhcorrpointsize);
    height: var(--xhhcorrpointsize);
  }
  30% {
    height: calc(var(--xhhcorrpointsize) * 1.4);
  }
  70% {
    width: calc(var(--xhhcorrpointsize) * 1.4);
  }
  100% {
    width: calc(var(--xhhcorrpointsize));
    height: calc(var(--xhhcorrpointsize));
  }
}

.dot1 {
  left: 30px;
  background-color: var(--dot1color);
}

.dot1::after {
  background-color: var(--dot1color);
  animation-delay: 0.2s;
}

.dot2 {
  background-color: var(--dot2color);
  left: 80px;
}

.dot2::after {
  background-color: var(--dot2color);
  animation-delay: 0.4s;
}

.dot3 {
  background-color: var(--dot3color);
  left: 130px;
}

.dot3::after {
  background-color: var(--dot3color);
  animation-delay: 0.6s;
}

.dot4 {
  background-color: var(--dot4color);
  left: 180px;
}

.dot4::after {
  background-color: var(--dot4color);
  animation-delay: 0.8s;
}

.dot5 {
  background-color: var(--dot5color);
  left: 230px;
}

.dot5::after {
  background-color: var(--dot5color);
  animation-delay: 1s;
}
</style>