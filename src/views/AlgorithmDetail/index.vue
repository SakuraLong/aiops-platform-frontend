<template>
  <structure3>
    <template #card-r-1>
      <div>
        asvasv
      </div>
    </template>
  </structure3>
</template>

<script>
import structure3 from '@/components/Structure/structure3.vue'
import { algorithmResultDetail } from '@/api/algorithm'
export default {
  components: {
    structure3
  },
  data() {
    return {

    }
  },
  mounted() {
    const id = this.$route.query.id
    if (id) {
      algorithmResultDetail({
        id
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  methods: {

  }

}
</script>

<style>
</style>
