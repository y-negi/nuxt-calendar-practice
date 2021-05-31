import { accessorType } from '@/store'
import { Repositories } from '@/plugins/RepositoryFactory'

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $repositories: Repositories
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
    $repositories: Repositories
  }
}