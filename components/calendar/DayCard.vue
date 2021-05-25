<template>
  <div>
    <div id="calendar-day-card" @click="onClickCard">
      <p
        id="date-text"
        :style="{ color: textColor, 'font-weight': fontWeight }"
      >
        {{ day }}
      </p>
      <div id="day-card-schedule-column">
        <div
          class="day-card-schedule"
          v-for="schedule in schedules"
          :key="schedule.id"
        >
          {{ schedule.title }}
        </div>
      </div>
    </div>

    <transition name="fade">
      <ModalAddSchedule
        id="modal-add-schedule"
        v-show="isShowModal"
        @onClose="onCloseAddSchedule"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  useContext,
} from 'nuxt-composition-api'

export default defineComponent({
  props: {
    date: {
      type: Date,
      required: true,
    },
    isCurrentMonth: {
      type: Boolean,
      required: true,
    },
    isToday: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    // 型をDateにしているのにstringになってしまう。一旦Date型に戻してからgetDateする。
    const currentDate = new Date(props.date)
    const day = currentDate.getDate()

    const textColor = computed(() =>
      props.isCurrentMonth ? 'gray' : 'lightGray'
    )
    const fontWeight = computed(() => (props.isToday ? 'bold' : 'normal'))

    const accessor = useContext().app.$accessor
    const schedules = computed(() => accessor.modules.schedules.schedules.filter(
      (schedule) => {
        const scheduleDate = new Date(schedule.date)
        return (
          scheduleDate.getFullYear() == currentDate.getFullYear() &&
          scheduleDate.getMonth() == currentDate.getMonth() &&
          scheduleDate.getDate() == currentDate.getDate()
        )
      }
    ))

    const isShowModal = ref(false)

    const onClickCard = () => {
      isShowModal.value = true
    }

    const onCloseAddSchedule = () => {
      isShowModal.value = false
    }

    return {
      day,
      textColor,
      fontWeight,
      schedules,
      isShowModal,
      onClickCard,
      onCloseAddSchedule,
    }
  },
})
</script>

<style scoped>
#calendar-day-card {
  width: 100%;
  height: 100%;
  background-color: white;
}

#date-text {
  text-align: center;
}

#day-card-schedule-column {
  display: flex;
  flex-direction: column;
}

.day-card-schedule {
  width: calc(100% - 4px);
  background-color: lightseagreen;
  color: white;
  margin: 2px;
}

#modal-add-schedule {
  position: absolute;
  top: 0;
  left: 0;
}

/* modal transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>