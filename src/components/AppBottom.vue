<template>
  <v-bottom-navigation v-model="bottomNav" fixed>
    <v-btn value="recent">
      <span>刷新</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>收藏</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>回到顶部</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: 'recent',
    }
  },
}
</script>

<style>
</style>