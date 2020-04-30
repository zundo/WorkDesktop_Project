<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small color="dark" @click="setDrawer(!drawer)">
      <v-icon v-if="!drawer">mdi-view-quilt</v-icon>

      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title class="hidden-sm-and-down font-weight-light" v-text="$route.name" />
    <v-spacer />

    <!--<v-text-field :label="$t('search')" color="secondary" hide-details style="max-width: 165px;">
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
        <v-btn class="mt-n2" elevation="1" fab small>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>-->

    <div class="mx-3" />

    <v-btn class="ml-2" min-width="0" text to="/accueil">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-icon>mdi-account-cog-outline</v-icon>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <app-bar-item :to="setting.to" v-for="(setting, i) in settings" :key="`item-${i}`">
          <v-list-item-icon>
            <v-icon v-text="setting.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title to="/login" v-text="setting.title" />
        </app-bar-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text primary elevation-12": hover
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                },
                this.$slots.default
              );
            }
          }
        });
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    settings: [
      {
        icon: "mdi-account-lock",
        title: "Se connecter",
        to: '/'
      },
      {
        icon: "mdi-handshake",
        title: "Support",
        to: '/support'
      },
      {
        icon: "mdi-cogs",
        title: "Paramètres",
        to: '/parametres/parametres-generaux'
      },
      {
        icon: "mdi-logout",
        title: "Déconnexion",
        to: '/'
      }
    ]
  }),

  computed: {
    ...mapState(["drawer"])
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    })
  }
};
</script>
