<template>
  <div id="calendar-content">
    <div id="weekday-row">
      <CalendarWeekdayCard
        class="weekday-card"
        v-for="(weekday, index) in weekdays"
        :key="index"
        :weekday="weekday"
      />
    </div>
    <div class="week-row" v-for="week in weeks" :key="week.id">
      <CalendarDayCard
        class="day-card"
        v-for="day in week.days"
        :key="day.id"
        :date="day.date"
        :isCurrentMonth="day.isCurrentMonth"
        :isToday="day.isToday"
        :schedules="day.schedules"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'nuxt-composition-api'
import { Schedule } from '@/modules/Schedule'

type Day = {
  id: number
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  schedules: Schedule[]
}

type Week = {
  id: number
  days: Day[]
}

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
  setup(props) {
    // 当月の週配列を取得するcomputed
    const weeks = computed(() => {
      // 月の最初の日
      const startDate = new Date(props.year, props.month - 1, 1)
      // 月の最後の日
      const endDate = new Date(props.year, props.month, 0)
      // 前月の最後の日
      const lastMonthEndDate = new Date(props.year, props.month - 1, 0)
      // 最後の日の日付を取得
      const endDateNumber = endDate.getDate()
      // 最初の日の曜日を取得
      const startWeekday = startDate.getDay()
      // 前月の最後の日付を取得
      const lastMonthEndDateNumber = lastMonthEndDate.getDate()
      // 現在の月と同じ月か
      const isEachMonth =
        new Date().getFullYear() == props.year &&
        new Date().getMonth() + 1 == props.month

      // 1ヶ月最大6週間＋1週間7日でループ
      var dayCount = 1
      var weeks: Week[] = []
      for (let w = 0; w < 6; w++) {
        var days: Day[] = []

        for (let d = 0; d < 7; d++) {
          if (w == 0 && d < startWeekday) {
            // 月の最初の日までの空白を前月の日付で埋める
            const lastMonth = new Date(props.year, props.month - 1, 0)
            const date = new Date(
              lastMonth.getFullYear(),
              lastMonth.getMonth(),
              lastMonthEndDateNumber - startWeekday + d + 1
            )
            days.push({
              id: +`${w}${d}`,
              date: date,
              isCurrentMonth: false,
              isToday: false,
              schedules: [],
            })
          } else if (dayCount > endDateNumber) {
            // 次の最後の日からの空白を次月の日付で埋める
            const nextMonth = new Date(props.year, props.month + 1, 0)
            const date = new Date(
              nextMonth.getFullYear(),
              nextMonth.getMonth(),
              dayCount - endDateNumber
            )
            days.push({
              id: +`${w}${d}`,
              date: date,
              isCurrentMonth: false,
              isToday: false,
              schedules: [],
            })

            dayCount++
          } else {
            // 当月のデータはそのまま入れる
            const currentMonth = new Date(props.year, props.month, 0)
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              dayCount
            )
            days.push({
              id: +`${w}${d}`,
              date: date,
              isCurrentMonth: true,
              isToday: isEachMonth && new Date().getDate() == dayCount,
              schedules: [],
            })

            dayCount++
          }
        }

        weeks.push({
          id: w,
          days: days,
        })
      }

      return weeks
    })

    // 曜日配列を生成
    const weekdays = ['日', '月', '火', '水', '木', '金', '土']

    return {
      weekdays,
      weeks,
    }
  },
})
</script>

<style scoped>
#calendar-content {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 28px auto;
  grid-gap: 1px;
  background-color: lightgray;
  border: 1px solid transparent;
}

#weekday-row {
  display: grid;
  grid-template-columns: auto;
  grid-column: 1 / 8;
  grid-gap: 1px;
}

.week-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column: 1 / 8;
  grid-gap: 1px;
}

.weekday-card {
  grid-row: 1 / 2;
}

.day-card {
  grid-row: 1 / 2;
}
</style>