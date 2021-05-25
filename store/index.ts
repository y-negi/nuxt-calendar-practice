import { getAccessorType } from 'typed-vuex'

import * as schedules from '@/store/modules/schedules'

export const state = () => {
  return {}
}

export const getters = {}

export const mutations = {}

export const actions = {}

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  // フォルダ構成に合わせてネストさせる必要がある
  modules: {
    modules: {
      modules: {
        schedules
      }
    },
  },
})
