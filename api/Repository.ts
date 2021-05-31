import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosResponse } from 'axios'

export interface CRUDActions {
  index<T>(query?: string): Promise<T>
  show<T>(id: number): Promise<T>
  create<T>(payload: any): Promise<T>
  update<T>(payload: any, id?: number): Promise<T>
  delete(id?: number): Promise<any>
}

export default (client: NuxtAxiosInstance) => (resource: string) => ({
  index<T>(query?: string) {
    return client.$get<T>(`/api/${resource}?${query}/`)
  },
  show<T>(id: number) {
    return client.$get<T>(`/api/${resource}/${id}/`)
  },
  create<T>(payload: any) {
    return client.$post<T>(`/api/${resource}/`, payload)
  },
  update<T>(payload: any, id?: number) {
    return client.$patch<T>(resourcePath(resource, id), payload)
  },
  delete(id?: number) {
    return client.delete(resourcePath(resource, id))
  },
})

const resourcePath = (resource: string, id?: number) => {
  let path
  if (id) {
    path = `/api/${resource}/${id}/`
  } else {
    path = `/api/${resource}/`
  }
  return path
}
