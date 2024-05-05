<template>
  <div class="structure">
    <div
      :class="{
        'left--2': stype === 2,
        'left--3': stype === 3
      }"
      class="left"
    >
      <slot name="left" />
    </div>
    <div
      :class="{
        'right--2': stype === 2,
        'right--3': stype === 3
      }"
      class="right"
    >
      <slot name="right" />
    </div>
    <div>
      <slot name="shadow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stype: {
      default: 1,
      type: Number
    }
  },
  data() {
    return {
      shadow: false
    }
  },
  methods: {
    setShadow(shadow) {
      this.shadow = shadow
    }
  }
}
</script>

<style>
.structure {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.left {
  display: flex;
  flex-direction: column;
  width: calc(300px);
  padding: 5px 0px;
}

.right {
  width: calc(100% - 300px);
  padding: 5px 0px;
}

/* type 2 */
.left--2 {
  width: calc(200px) !important;
}

.right--2 {
  width: calc(100% - 200px) !important;
}

/* type 3 */
.left--3 {
  display: none;
  width: 0px !important;
}

.right--3 {
  width: calc(100%) !important;
}

.structure-shadow {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999;
}
</style>
