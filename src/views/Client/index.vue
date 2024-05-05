<template>
  <div class="client-container">
    <div class="client-container__body">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.client-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999;
  background-image: url('../../assets/images/登录/bg.png');
  background-size: cover;
  background-position: center;
}
.client-container__body {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
