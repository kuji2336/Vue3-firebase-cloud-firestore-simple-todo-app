<template>
      <div class="r">
        <the-header></the-header>
      <router-view></router-view>
      </div>
</template>

<script>
import TheHeader from './layouts/TheHeader.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
  },
  }

</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
