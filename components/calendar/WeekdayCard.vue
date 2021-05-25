<template>
  <div id="calendar-weekday-card">
    <p :style="{ color: textColor }">{{ weekday }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    weekday: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let textColor: string
    switch (props.weekday) {
      case '土':
        textColor = 'blue'
        break
      case '日':
        textColor = 'red'
        break
      default:
        textColor = 'lightGray'
    }

    return {
      textColor,
    }
  },
})
</script>

<style scoped>
#calendar-weekday-card {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>