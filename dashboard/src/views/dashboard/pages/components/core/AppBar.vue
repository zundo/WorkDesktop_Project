<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
  >
    <v-container>
      <v-row align="center">
        <v-toolbar-title
          class="font-weight-light"
          v-text="title"
        />

        <v-spacer />

        <v-btn
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          class="hidden-sm-and-down mr-10"
          min-height="48"
          text
        >
          <v-icon
            left
            size="22"
            v-text="item.icon"
            class="mr-2"
          />

          <span v-text="item.text" />
        </v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-account-multiple-plus',
          text: 'Register',
          to: '/pages/register'
        },
        {
          icon: 'mdi-fingerprint',
          text: 'Login',
          to: '/pages/login'
        },
        {
          icon: 'mdi-lock-open-outline',
          text: 'Lock',
          to: '/pages/lock'
        }
      ],
      titles: {
        '/pages/lock': 'Lock',
        '/pages/login': 'Login',
        '/pages/register': 'Register'
      }
    }),

    computed: {
      title() {
        return this.titles[this.$route.path]
      }
    }
  }
</script>
