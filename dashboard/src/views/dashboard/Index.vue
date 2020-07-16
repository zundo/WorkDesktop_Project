<template>
  <v-app>
    <dashboard-core-app-bar v-if="id_user != null" v-model="expandOnHover"/>

    <dashboard-core-drawer v-if="id_user != null"/>

    <dashboard-core-view />

    <dashboard-core-settings v-if="id_user != null" v-model="expandOnHover" />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreSettings: () => import('./components/core/Settings'),
      DashboardCoreView: () => import('./components/core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
    created() {
      this.$vuetify.theme.dark = true;
    },
    computed: {
      id_user() {
        return this.$store.state.id_user;
      },
    },
  }
</script>
