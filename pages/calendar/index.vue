<template>
  <div id="calendar">
    <div id="navigation">
      <CalendarNavigation
        :year="year"
        :month="month"
        @onClickPrevious="onClickPrevious"
        @onClickNext="onClickNext"
      />
    </div>
    <div id="content">
      <CalendarContent :year="year" :month="month" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    let currentDate = new Date()
    let currentMonth = ref(currentDate.getMonth())

    // computedの中にrefの変数の変更を含めることで発火させている
    const year = computed(() => {
      currentDate.setMonth(currentMonth.value)
      currentMonth.value = currentDate.getMonth()
      return currentDate.getFullYear()
    })
    const month = computed(() => {
      currentDate.setMonth(currentMonth.value)
      currentMonth.value = currentDate.getMonth()
      return currentDate.getMonth() + 1
    })

    const onClickPrevious = () => {
      currentMonth.value--
    }
    const onClickNext = () => {
      currentMonth.value++
    }

    return {
      year,
      month,
      onClickPrevious,
      onClickNext,
    }
  },
})
</script>

<style scoped>
#calendar {
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  margin: 8px;
  display: flex;
  flex-direction: column;
}
#navigation {
  width: 100%;
  height: 44px;
}
#content {
  width: 100%;
  height: 100%;
}
</style>