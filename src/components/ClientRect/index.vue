<template>
  <div class="client-rect">
    <img
      src="@/assets/images/登录/矩形.png"
      draggable="false"
      class="client-rect__bg"
    >
    <img
      :src="dict[type].src"
      draggable="false"
      class="client-rect__icon"
    >
    <span
      class="client-rect__text"
      O-R
    >{{ dict[type].text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'login',
      type: String
    }
  },
  data() {
    return {
      dict: {
        login: {
          text: '立即注册',
          src: require('@/assets/images/登录/reg.png')
        },
        reg: {
          text: '立即登录',
          src: require('@/assets/images/登录/密码.png')
        }
      }
    }
  }
}
</script>

<style>
.client-rect {
  user-select: none;
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 40px;
  width: 50px;
  margin: 0 !important;
}
.client-rect__bg {
  width: 100%;
}
.client-rect__icon {
  width: 18px;
  position: absolute;
  left: 50%;
  top: 8px;
  transform: translateX(-50%);
}
.client-rect__text {
  color: #00A0FF;
  position: absolute;
  display: inline-block;
  width: 30px;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  word-break: break-all;
  transform: translateX(-50%);
  left: 50%;
  top: 28px;
}
</style>
