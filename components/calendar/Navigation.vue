<template>
  <div id="calendar-navigation">
    <img id="calendar-navigation-icon" src="@/assets/calendar_icon.png" />
    <div id="calendar-navigation-title">カレンダー</div>
    <div id="calendar-navigation-button-area">
      <button class="calendar-navigation-button" @click="onClickPrevious">
        ＜
      </button>
      <button class="calendar-navigation-button" @click="onClickNext">
        ＞
      </button>
    </div>
    <div id="calendar-navigation-current-month">{{ year }}年{{ month }}月</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const onClickPrevious = () => context.emit('onClickPrevious')
    const onClickNext = () => context.emit('onClickNext')

    return {
      onClickPrevious,
      onClickNext,
    }
  },
})
</script>

<style scoped>
#calendar-navigation {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
#calendar-navigation-icon {
  width: auto;
  height: 80%;
  margin-left: 8px;
}
#calendar-navigation-title {
  height: 80%;
  vertical-align: middle;
  margin-left: 16px;
  font-size: 24px;
  color: darkgray;
}
#calendar-navigation-button-area {
  height: 80%;
  margin-left: 24px;
}
.calendar-navigation-button {
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  background: transparent;
  border: none;
  font-size: 16px;
  color: gray;
}
#calendar-navigation-current-month {
  height: 80%;
  vertical-align: middle;
  margin-left: 24px;
  font-size: 24px;
  color: gray;
}
</style>