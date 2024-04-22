<template>
  <structure :stype="3">
    <template #right>
      <card :full="true">
        <template #default>
          <slot name="card-r-1" />
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
  },
  methods: {
    shadowEnter() {
      this.$refs.structure.setShadow(true)
    },
    shadowLeave() {
      this.$refs.structure.setShadow(false)
    }
  }
}
</script>

<style scoped>

</style>
