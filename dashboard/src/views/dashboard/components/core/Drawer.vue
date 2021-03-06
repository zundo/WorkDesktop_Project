<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="../../../../../public/logo.jpg"
            max-height="auto"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-2 pb-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list
      expand
      nav
    >
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
      <div />
    </v-list>

    <template v-slot:append>
      <base-item
        :item="{
          title: 'Support',
          icon: 'mdi-handshake',
          to: '/support',
        }" 
      />
    </template>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'Accueil',
          to: '/accueil',
        },
        {
          title: 'Calendrier',
          icon: 'mdi-calendar-outline',
          to: '/calendar',
        },
        {
          title: 'Projet',
          icon: 'mdi-clipboard-text-multiple-outline',
          to: '/project',
        },
        {
          title: 'Collaborateurs',
          icon: 'mdi-clipboard-account',
          to: '/collaborateurs',
        }, 
        {
          title: 'Clients',
          icon: 'mdi-clipboard-account-outline',
          to: '/clients',
        }, 
        {
          title: 'Comptabilité',
          icon: 'mdi-bank-outline',
          to: '/accounting',
        },
        {
          group: '/parametres',
          icon: 'mdi-cog-transfer',
          title: 'Paramètres',
          children: [
            {
              title: 'Paramètres généraux',
              icon: 'mdi-account-cog',
              to: 'parametres-generaux',
            },
            {
              title: 'Paramètres entreprise',
              icon: 'mdi-cogs',
              to: 'parametres-entreprise',
            }
          ]
        },  
        {
          title: 'Ticket',
          icon: 'mdi-text-box-outline',
          to: '/ticket',
        },
        /*{
          title: 'icons',
          icon: 'mdi-chart-bubble',
          to: '/icons',
        },
        {
          title: 'notifications',
          icon: 'mdi-view-dashboard-outline',
          to: '/notifications',
        },
        {
          title: 'Buttons',
          icon: 'mdi-arrow-right-drop-circle-outline',
          to: '/buttons',
        },
        {
          title: 'Grid',
          icon: 'mdi-view-quilt',
          to: '/grid',
        },
        {
          title: 'Tabs',
          icon: 'mdi-arrange-send-backward',
          to: '/tabs',
        },*/
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: 'Inglorius',
        }
      },
    },
    watch: {
      '$vuetify.breakpoint.smAndDown' (val) {
        this.$emit('update:expandOnHover', !val)
      }
    },
    
    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
