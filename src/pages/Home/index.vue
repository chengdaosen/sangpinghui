<template>
  <div>
    <TypeNav></TypeNav>
    <ListComtainer></ListComtainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="(floor, index) in floorList"
      :key="floor.id"
      :list="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListComtainer from '@/pages/Home/ListContainer/index.vue';
import Recommend from '@/pages/Home/Recommend/index.vue';
import Rank from '@/pages/Home/Rank/index.vue';
import Like from '@/pages/Home/Like/index.vue';
import Floor from '@/pages/Home/Floor/index.vue';
import Brand from '@/pages/Home/Brand/index.vue';
import { mapState } from 'vuex';
export default {
  components: {
    ListComtainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch('home/getFloorList');
    this.$store.dispatch('user/getUserInfo');
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style></style>
