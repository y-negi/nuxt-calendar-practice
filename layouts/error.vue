<template>
  <div>
    <p>{{ error.statusCode }}</p>
    <p>{{ error.message }}</p>
    <p>{{ error.path }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync } from 'nuxt-composition-api'

type Error = {
  message: String
  path: String
  statusCode: Number
}

export default defineComponent({
  props: {
    error: {
      type: Error,
      required: true,
    },
  },
})
</script>