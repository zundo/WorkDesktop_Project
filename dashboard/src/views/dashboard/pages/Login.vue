<template>
  <v-container id="login" fill-height tag="section">
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
                <h1 class="display-3 font-weight-bold mb-2">Login</h1>
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
                <v-icon v-text="social.icon" />
              </v-btn>
              <v-col cols="12" class="py-2">
                <v-text-field
                  color="primary"
                  label="Email/Username"
                  v-model="login"
                  prepend-icon="mdi-face"
                />
              </v-col>

              <v-col cols="12" class="py-2">
                <v-text-field
                  color="primary"
                  label="Password"
                  v-model="password"
                  prepend-icon="mdi-lock-outline"
                />
              </v-col>
              <v-btn color="success" @click="connexion(login,password)">
                <v-icon left>mdi-lock-outline</v-icon>Connexion
              </v-btn>
            </v-card-text>
            <a @click="inscription" color="primary">
              <span class="display-1">Inscription</span>
            </a>
          </base-material-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <v-snackbar v-model="isSnackbarOpened" :color="isSuccess ? 'success' : 'error'">
      <v-icon v-if="!isSuccess" color="white">mdi-alert-outline</v-icon>
      {{snackbarMessage}}
      <v-btn dark icon @click="isSnackbarOpened = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "PagesLogin",

  components: {},

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
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
    ],
    login: "",
    password: "",
  }),
  mounted() {

  },
  methods: {
    inscription: function() {
      this.$router.push({ name: "Inscription" });
    },
    connexion: function(login, password) {
      if (login == null || login == "")
        return this.errorMessage("Identifiant vide !");
      if (password == null || password == "")
        return this.errorMessage("Mot de passe vide !");

      //Axios teste connexion
      this.successMessage("Bienvenue " + login);
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
  }
};
</script>
