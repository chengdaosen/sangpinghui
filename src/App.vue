<template>
  <div>
    <MyHeader></MyHeader>
    <router-view></router-view>
    <MyFooter v-show="$route.meta.show"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/Header/Header.vue';
import MyFooter from './components/Footer/Footer.vue';
export default {
  name: 'App',
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    this.$store.dispatch('home/categoryList');
  },
};
</script>

<style></style>
