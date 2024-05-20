<template>
  <div class="graph-shower-page">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style>
.graph-shower-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  overflow: auto;
  background-color: white;
}
.graph-shower-page > iframe {
  width: 100%;
  height: 100%;
}
</style>
