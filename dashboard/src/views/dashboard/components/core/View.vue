<template>
  <v-main>
    <router-view class="mb-10" />

    <dashboard-core-footer v-if="id_user != null" />
  </v-main>
</template>

<script>
export default {
  name: "DashboardCoreView",

  components: {
    DashboardCoreFooter: () => import("./Footer")
  },
  computed: {
    id_user() {
      return this.$store.state.id_user;
    }
  }
};
</script>
