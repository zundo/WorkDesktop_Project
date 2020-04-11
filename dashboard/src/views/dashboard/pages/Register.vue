<template>
  <v-container
    id="register"
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
          class="pa-3 pa-md-5 mx-auto"
          dark
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-3 font-weight-bold mb-2">
                Register
              </h1>
            </div>
          </template>


            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <v-row no-gutters>
                  <v-col
                    v-for="(section, i) in sections"
                    :key="i"
                    cols="12"
                  >
                    <v-list-item three-line>
                      <v-list-item-icon class="mr-4 mt-5 mt-md-4">
                        <v-icon
                          :large="$vuetify.breakpoint.mdAndUp"
                          :color="section.iconColor"
                          v-text="section.icon"
                        />
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title
                          class="font-weight-light mb-4 mt-3"
                          v-text="section.title"
                        />

                        <v-list-item-subtitle v-text="section.text" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <div class="text-center">
                  <v-btn
                    v-for="(social, i) in socials"
                    :key="i"
                    :color="social.iconColor"
                    class="my-2 mr-1"
                    depressed
                    fab
                    small
                  >
                    <v-icon v-text="social.icon" />
                  </v-btn>



                  <v-text-field
                    color="secondary"
                    label="First Name..."
                    prepend-icon="mdi-face"
                  />

                  <v-text-field
                    color="secondary"
                    label="Email..."
                    prepend-icon="mdi-email"
                  />

                  <v-text-field
                    class="mb-8"
                    color="secondary"
                    label="Password..."
                    prepend-icon="mdi-lock-outline"
                  />

                  <v-checkbox
                    :input-value="true"
                    color="secondary"
                  >
                    <template v-slot:label>
                      <span class="text-no-wrap">I agree to the &nbsp;</span>

                      <a
                        class="secondary--text ml-6 ml-sm-0"
                        href="#"
                      >
                         terms and conditions
                      </a>.
                    </template>
                  </v-checkbox>

                  <v-btn color="success">
                    Inscription
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </base-material-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'PagesRegister',

    components: {},

    data: () => ({
      sections: [
        {
          icon: 'mdi-chart-timeline-variant',
          iconColor: 'primary',
          title: 'Marketing',
          text: `We've created the marketing campaign of the website. It was a very interesting collaboration.`
        },
        {
          icon: 'mdi-code-tags',
          iconColor: 'secondary',
          title: 'Fully Coded in HTML5',
          text: `We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.`
        },
        {
          icon: 'mdi-account-multiple',
          iconColor: 'cyan',
          title: 'Built Audience',
          text: 'There is also a Fully Customizable CMS Admin Dashboard for this product.'
        }
      ],
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
          iconColor: '#ea4c89'
        }

      ]
    })
  }
</script>

<style lang="sass">
  #register
    .v-list-item__subtitle
      -webkic-line-clamp: initial
      -webkit-box-orient: initial
</style>
