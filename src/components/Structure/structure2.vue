<template>
  <structure :stype="2">
    <template #left>
      <card :full="true">
        <template #default>
          <slot name="card-l-1" />
        </template>
      </card>
    </template>
    <template #right>
      <card style="height: calc(70px - 5px * 4);">
        <template #default>
          <slot name="card-r-1" />
        </template>
      </card>
      <card style="height: calc(100% - 70px - 5px * 4);">
        <template #default>
          <slot name="card-r-2" />
        </template>
      </card>
    </template>
    <template #shadow>
      <slot name="shadow" />
    </template>
  </structure>
</template>

<script>
import card from './card.vue'
import structure from './index.vue'
export default {
  components: {
    structure,
    card
  }
}
</script>

<style scoped>

</style>
