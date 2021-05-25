<template>
  <div>
    <div id="add-schedule-overlay">
      <div id="add-schedule-content">
        <button id="close-button" @click="onClickClose">×</button>
        <div id="content-area">
          <input
            class="title-input"
            type="text"
            placeholder="タイトルと日時を入力"
            v-model="form.title"
          />
          <div id="info-area">
            <div class="common-input-area">
              <span>⏰</span
              ><input
                class="common-input"
                type="date"
                placeholder="月日を追加"
                v-model="form.date"
              />
            </div>
            <div class="common-input-area">
              <span>📍</span
              ><input
                class="common-input"
                type="text"
                placeholder="場所を追加"
                v-model="form.location"
              />
            </div>
            <div class="common-input-area">
              <span>🗒</span
              ><input
                class="common-input"
                type="text"
                placeholder="説明を追加"
                v-model="form.detail"
              />
            </div>
          </div>
        </div>
        <button id="save-button" @click="onClickSave">保存</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, useContext } from 'nuxt-composition-api'
import { Schedule } from '@/modules/Schedule'

type State = {
  title: string
  date: string
  location: string
  detail: string
}

export default defineComponent({
  setup(props, context) {
    const accessor = useContext().app.$accessor

    const form = reactive<State>({
      title: '',
      date: '',
      location: '',
      detail: '',
    })

    const onClickClose = () => {
      context.emit('onClose')
    }
    const onClickSave = () => {
      const schedule: Schedule = {
        id: accessor.modules.schedules.blankID,
        title: form.title,
        date: form.date,
        location: form.location,
        detail: form.detail,
      }
      accessor.modules.schedules.pushSchedule(schedule)
      context.emit('onClose')
    }

    return {
      form,
      onClickClose,
      onClickSave,
    }
  },
})
</script>

<style scoped>
input {
  border: none;
  background-image: linear-gradient(lightgray, lightgray);
  background-position: bottom 5px center;
  background-size: 100% 1px;
  background-repeat: no-repeat;
}

input::placeholder {
  color: lightgray;
}

#add-schedule-overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

#add-schedule-content {
  display: flex;
  position: relative;
  width: 400px;
  background-color: white;
}

#close-button {
  position: absolute;
  top: 0;
  right: 8px;
  font-size: 32px;
  padding: 8px;
  background-color: transparent;
  border: none;
  color: gray;
}

#save-button {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 16px;
  padding: 4px 16px 4px 16px;
  background-color: transparent;
  border: solid 1px lightskyblue;
  border-radius: 4px;
  color: lightskyblue;
}

#content-area {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

#info-area {
  margin-top: 24px;
  margin-bottom: 60px;
}

.title-input {
  height: 40px;
  width: calc(100% - 48px);
  margin-top: 60px;
  margin-left: 24px;
  font-size: 20px;
}

.common-input-area {
  height: 32px;
  width: calc(100% - 48px);
  margin-top: 8px;
  margin-left: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.common-input {
  height: 100%;
  width: 100%;
  margin-left: 32px;
  font-size: 16px;
}
</style>