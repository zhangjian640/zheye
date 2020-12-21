<template>
  <div
   class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
   :style="{backgroundColor: background || ''}"
  >
  <div class="loading-content">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only"></span>
    </div>
    <p v-if="text" class="text-primary small">{{text}}</p>
  </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    background: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
})
</script>

<style>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
