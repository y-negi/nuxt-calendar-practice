import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import { Schedule } from '@/modules/Schedule'

export const state = () => ({
  schedules: [] as Schedule[],
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  schedules: (state) => state.schedules,
  blankID(state): number {
    var id = 0
    while (state.schedules.some((schedule) => schedule.id == id)) {
      id++
    }
    return id
  },
})

export const mutations = mutationTree(state, {
  pushSchedule(state, schedule: Schedule): void {
    state.schedules.push(schedule)
  },
})

export const actions = actionTree({ state, getters, mutations }, {})
