import { Plugin } from '@nuxt/types'
import createRepositories, { CRUDActions } from '@/api/Repository'

export type Repositories = {
  weather: CRUDActions
}

const myPlugin: Plugin = (context, inject) => {
  context.$axios.interceptors.request.use((config) => {
    console.log('--- request ---')
    console.log(config.baseURL)
    console.log(config.url)
    console.log(config.params)
    return config
  })
  context.$axios.interceptors.response.use((response) => {
    console.log('--- response ---')
    console.log(response.status)
    console.log(response.data)
    return response
  })
  const repositoryWithAxios = createRepositories(context.$axios)
  const repositories = {
    weather: repositoryWithAxios('location'),
  }
  inject('repositories', repositories)
}

export default myPlugin
