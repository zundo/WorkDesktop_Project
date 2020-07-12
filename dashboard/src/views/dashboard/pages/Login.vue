<template>
  <v-container id="login" tag="section">
    <v-overlay :absolute="isAbsolute" :opacity="opacity" :value="isOverlay">
      <v-progress-circular color="warning" indeterminate size="80"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="isDialogForgotPassword" width="400px" overlay-opacity="0.9">
      <v-card class="px-6" outlined>
        <v-card-title class="info--text">
          Mot de passe oublié ?
          <v-icon aria-label="Close" @click="isDialogForgotPassword = false">mdi-close</v-icon>
        </v-card-title>
        <v-col cols="12">
          <div class="text-center">
            <v-divider />
            <v-row>TODO</v-row>
          </div>
        </v-col>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="10">
        <v-slide-y-transition appear>
          <base-material-card
            color="blue"
            max-width="100%"
            width="600"
            class="px-5 py-3 mx-auto"
            dark
          >
            <template v-slot:heading>
              <div class="text-center">
                <h1 class="display-3 font-weight-bold mb-2">
                  <v-icon large left>mdi-account-lock</v-icon>Connexion
                </h1>
              </div>
            </template>

            <v-card-text class="text-center">
              <!--<v-btn
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
              </v-btn>-->
              <v-col cols="12" class="py-2">
                <v-text-field
                  color="blue"
                  label="Email"
                  v-model="login"
                  prepend-icon="mdi-face"
                  clearable
                />
              </v-col>

              <v-col cols="12" class="py-2">
                <v-text-field
                  color="blue"
                  label="Password"
                  v-model="password"
                  prepend-icon="mdi-lock-outline"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  clearable
                />
              </v-col>
              <v-col cols="12" class="py-2">
                <span
                  @click="isDialogForgotPassword = true"
                  style="cursor: pointer;"
                  class="info--text display-1"
                >Mot de passe oublié ?</span>
              </v-col>
              <v-btn color="blue" @click="connexion(login,password)">
                <v-icon left>mdi-lock-outline</v-icon>Connexion
              </v-btn>
            </v-card-text>
            <span
              @click="inscription"
              style="cursor: pointer;"
              class="blue--text display-1"
            >Inscription Administrateur</span>
          </base-material-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <v-snackbar v-model="isSnackbarOpened" :color="isSuccess ? 'success' : 'error'">
      <div class="text-center display-1">
        <v-icon v-if="!isSuccess" color="white">mdi-alert-outline</v-icon>
        {{snackbarMessage}}
        <v-btn dark icon @click="isSnackbarOpened = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-snackbar>
  </v-container>
</template>

<script>
import qs from "qs";

export default {
  name: "Login",

  components: {},

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    showPassword: false,
    isDialogForgotPassword: false,
    opacity: 1,
    isAbsolute: true,
    isOverlay: false,
    /*socials: [
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
    ],*/
    login: "",
    password: ""
  }),
  mounted() {
    this.isOverlay = true;
    if (this.$route.params.reloadLogOut === true)
      document.location.reload(true);
    this.login =
      this.$route.params.email != undefined || this.$route.params.email == null
        ? this.$route.params.email
        : "";
    this.isOverlay = false;
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

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let payload = {
        email: login,
        password: password
      };
      //return console.log(JSON.stringify(payload));

      let id_user = null;
      let isAdmin = null;
      let id_entreprise = null;

      axios
        .post("http://localhost:3000/login", qs.stringify(payload), config)
        .then(response => {
          id_user = response.data.id_user;
          isAdmin = response.data.isAdmin;
          id_entreprise = response.data.id_entreprise;
          localStorage.setItem("token", response.data.token)
        })
        .catch(error => {
          console.log(
            "ERROR " +
              JSON.stringify(error.response.status) +
              " : " +
              JSON.stringify(error.response.data.message)
          );
          this.errorMessage(
            "ERROR " +
              JSON.stringify(error.response.status) +
              " : " +
              JSON.stringify(error.response.data.message)
          );
        })
        .finally(() => {
          if ((id_user != undefined && id_user.length != 0) ||
            (id_entreprise != undefined && id_entreprise.length != 0) ||
            (isAdmin != undefined && isAdmin.length != 0)
          ) {
            //localStorage.setItem("token", token); // OU sessionStorage pour que les infos disparaisse à la fermeture du navigateur
            if (localStorage.getItem("token") == null)
              return this.errorMessage("Token inconnu !");

            //return console.log(localStorage.getItem("token"))//
            this.$store.commit("SET_ID_ENTREPRISE", id_entreprise);
            this.$store.commit("SET_ID_USER", id_user);
            this.$store.commit("SET_IS_ADMIN", isAdmin);
            return this.$router.push({
              name: "Accueil"
              //params: { userId: id_user }
            });
          }
        });
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
