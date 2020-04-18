<template>
  <v-container id="register" fluid tag="section">
    <v-row justify="center">
      <v-col cols="10">
        <v-slide-y-transition appear>
          <base-material-card
            color="primary"
            light
            max-width="100%"
            class="pa-3 pa-md-5 mx-auto"
            dark
          >
            <template v-slot:heading>
              <div class="text-center">
                <h1 class="display-3 font-weight-bold mb-2"><v-icon large left>mdi-account-plus</v-icon>Inscription</h1>
              </div>
            </template>

            <v-row>
              <v-col cols="12" md="6">
                <v-row no-gutters>
                  <v-col v-for="(section, i) in sections" :key="i" cols="12">
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

              <v-col cols="12" md="6">
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

                  <v-text-field color="primary" label="First Name..." prepend-icon="mdi-face" />

                  <v-text-field color="primary" label="Email..." prepend-icon="mdi-email" />

                  <v-text-field
                    class="mb-8"
                    color="primary"
                    label="Password..."
                    prepend-icon="mdi-lock-outline"
                  />

                  <v-checkbox :input-value="true" color="secondary">
                    <template v-slot:label>
                      <span class="text-no-wrap">I agree to the terms and conditions</span>
                    </template>
                  </v-checkbox>

                  <v-btn color="primary" @click="connexionPage">
                    <v-icon left>mdi-account-multiple-plus</v-icon>Inscription
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </base-material-card>
        </v-slide-y-transition>
        <v-snackbar v-model="isSnackbarOpened" :color="isSuccess ? 'success' : 'error'">
          <v-icon v-if="!isSuccess" color="white">mdi-alert-outline</v-icon>
          {{snackbarMessage}}
          <v-btn dark icon @click="isSnackbarOpened = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import qs from 'qs'

export default {
  name: "PagesRegister",

  components: {},

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    sections: [
      {
        icon: "mdi-chart-timeline-variant",
        iconColor: "primary",
        title: "Marketing",
        text: `We've created the marketing campaign of the website. It was a very interesting collaboration.`
      },
      {
        icon: "mdi-code-tags",
        iconColor: "secondary",
        title: "Fully Coded in HTML5",
        text: `We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.`
      },
      {
        icon: "mdi-account-multiple",
        iconColor: "cyan",
        title: "Built Audience",
        text:
          "There is also a Fully Customizable CMS Admin Dashboard for this product."
      }
    ],
    socials: [
      {
        href: "#",
        icon: "mdi-facebook",
        iconColor: "#3B5998"
      },
      {
        href: "#",
        icon: "mdi-twitter",
        iconColor: "#1DA1F2"
      },
      {
        href: "#",
        icon: "mdi-google",
        iconColor: "#ea4c89"
      }
    ]
  }),
  methods: {
    connexionPage: function(){
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }      

        let payload={
          email:"mou8@mou8.mou8",
          password:"mou8",
          lastname:"nirkos8",
          firstname:"mounir8",
          date_naissance:"17-05-1998",
          sexe:"Homme",
          rue:"17 rue alexandre",
          ville:"Gonesse",
          codePostal:"95500",
          pays:"France",
          phone:"0614587425",
          poste:"Developpeur"
        };

        let id_user;
        axios
          .post('http://localhost:3000/register',qs.stringify(payload),config)
          .then(response => {
            //console.log(JSON.stringify(response.data))
            id_user = response.data.id_user;
            //console.log("id_user: "+id_user)
            if(id_user != undefined && id_user.trim().length != 0)
              this.$router.push({ name: 'Accueil',params: { userId: id_user } }); 
          })
          .catch((error) => { 
            console.log("ERROR "+JSON.stringify(error.response.status) + " : " + JSON.stringify(error.response.data.message));
            this.errorMessage("ERROR "+JSON.stringify(error.response.status) + " : " + JSON.stringify(error.response.data.message)); 
          })
    },
    /*------------------------------------------------------ */
    verifyResponseOk: function(responseData) {
      var tmpStr = JSON.stringify(responseData);
      if (tmpStr.startsWith('"Error:')) {
        this.errorMessage(responseData.substring(7)); // suppress "Error:
        return false;
      }
      return true;
    },
    successMessage: function(message) {
      this.snackbarMessage = message;
      this.isSuccess = true;
      this.isSnackbarOpened = true;
    },
    errorMessage: function(message) {
      this.snackbarMessage = message;
      this.isSuccess = false;
      this.isSnackbarOpened = true;
    }
  },
};
</script>

<style lang="sass">
#register
  .v-list-item__subtitle
    -webkic-line-clamp: initial
    -webkit-box-orient: initial
</style>
