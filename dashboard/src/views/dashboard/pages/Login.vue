<template>
  <v-container
    id="login"
    fill-height
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="10">
        <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="600"
          class="px-5 py-3 mx-auto"
          dark
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-3 font-weight-bold mb-2">
                Login
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                :color="social.iconColor"
                class="ma-1"
                depressed
                fab
                small
                rel="noopener"
                target="_blank"
              >
                <v-icon
                  v-text="social.icon"
                />
              </v-btn>
            <v-text-field
              color="secondary"
              label="Email..."
              prepend-icon="mdi-face"
            />

            <v-text-field
              class="mb-8"
              color="secondary"
              label="Password..."
              prepend-icon="mdi-lock-outline"
            />

                  <v-btn color="success">
                    Connexion
                  </v-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PagesLogin',

    components: {},

    data: () => ({
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook',
          iconColor: '#3B5998'
        },
        {
          href: '#',
          icon: 'mdi-twitter',
          iconColor: '#1DA1F2'
        },
        {
          href: '#',
          icon: 'mdi-google',
          iconColor: '#ea4c89',
        }
      ]
    })
  }
</script>
