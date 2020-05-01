<template>
  <v-container id="parametresG" fluid tag="section">
    <v-dialog v-model="isDialogDateNaissanceOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="blue lighten-1"
        v-model="user.date_naissance"
        reactive
        show-current
      >
        <v-btn
          class="ml-auto"
          outlined
          color="info"
          text
          @click="isDialogDateNaissanceOpen = false"
        >Ok</v-btn>
      </v-date-picker>
    </v-dialog>

    <v-dialog v-model="isChangePasswordDialog" width="400px" overlay-opacity="0.8" persistent>
      <v-card class="px-6">
        <v-card-title class="secondary--text">
          Modifier le mot de passe
          <v-icon aria-label="Close" @click="deletePassword()">mdi-close</v-icon>
        </v-card-title>
        <v-divider class="my-2" />
        <v-row>
          <v-text-field
            color="secondary"
            label="Mot de passe actuel"
            v-model="old_passwordUser"
            prepend-inner-icon="mdi-lock-outline"
            clearable
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          />
          <v-text-field
            color="secondary"
            label="Nouveau mot de passe"
            v-model="passwordUser"
            prepend-inner-icon="mdi-lock-outline"
            clearable
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          />
          <v-col cols="12" class="text-right">
            <v-btn class="mr-1" outlined color="error" text @click="deletePassword()">Annuler</v-btn>
            <v-btn
              outlined
              color="success"
              text
              @click="savePassword(old_passwordUser,passwordUser)"
            >Sauvegarder</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="secondary">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <v-icon left>mdi-cog</v-icon>Profil Utilisateur
            </div>
            <div class="subtitle-1 font-weight-light">
              <v-icon left>mdi-cogs</v-icon>Complete ton profil
            </div>
          </template>
          <v-form>
            <v-container class="py-0">
              <v-card class="mt-0" height="auto">
                <v-col cols="12">
                  <div class="text-center">
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="secondary"
                          label="Nom"
                          v-model="user.lastname"
                          prepend-inner-icon="mdi-face"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="secondary"
                          label="Prénom"
                          v-model="user.firstname"
                          prepend-inner-icon="mdi-face"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="secondary"
                          label="Site Web"
                          v-model="user.site_web"
                          prepend-inner-icon="mdi-web"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="mt-n4">
                      <v-col cols="12" md="6">
                        <v-text-field
                          color="secondary"
                          label="Email"
                          v-model="user.email"
                          prepend-inner-icon="mdi-email-outline"
                          disabled
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-select
                          color="secondary"
                          prepend-inner-icon="mdi-format-list-bulleted-type"
                          v-model="user.sexe"
                          :items="items_Sexe"
                          label="Sexe"
                          :disabled="!isUpdateUser"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="secondary"
                          v-model="user.date_naissance"
                          label="Date de naissance"
                          prepend-icon="mdi-calendar-outline"
                          maxlength="10"
                          @click:prepend="isDialogDateNaissanceOpen = true"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="mt-n4">
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="secondary"
                          label="Poste"
                          v-model="user.poste"
                          prepend-inner-icon="mdi-badge-account-outline"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="secondary"
                          label="Numéro de téléphone"
                          v-model="user.phone"
                          prepend-inner-icon="mdi-deskphone"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-text-field
                          color="secondary"
                          label="Personne à contacter"
                          v-model="user.personne_contacter"
                          prepend-inner-icon="mdi-deskphone"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="mt-n4">
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="secondary"
                          label="Rue"
                          v-model="user.rue"
                          prepend-inner-icon="mdi-walk"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="secondary"
                          label="Ville"
                          v-model="user.ville"
                          prepend-inner-icon="mdi-walk"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="secondary"
                          label="Code Postal"
                          v-model="user.codePostal"
                          prepend-inner-icon="mdi-walk"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="secondary"
                          label="Pays"
                          v-model="user.pays"
                          prepend-inner-icon="mdi-walk"
                          :clearable="isUpdateUser"
                          :disabled="!isUpdateUser"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
                <v-row>
                  <v-col md="3">
                    <v-btn
                      @click="isChangePasswordDialog = true"
                      class="mx-2"
                      color="secondary"
                      text
                      outlined
                      :disabled="!isUpdateUser"
                      small
                    >
                      <v-icon left>mdi-cog-outline</v-icon>Changer le password
                    </v-btn>
                  </v-col>
                  <v-col md="4" class="ml-auto" v-if="!isUpdateUser">
                    <v-btn
                      small
                      color="secondary"
                      @click="isUpdateUser = true"
                      class="mx-2"
                    >
                      <v-icon left>mdi-account-edit-outline</v-icon>Modifier le Profil
                    </v-btn>
                  </v-col>
                  <v-col md="5" class="ml-auto" v-else>
                    <v-btn
                      small
                      color="error"
                      class="mx-2"
                      @click="annulerUpdate"
                    >
                      <v-icon left>mdi-close-circle-outline</v-icon>Annuler
                    </v-btn>
                    <v-btn
                      small
                      color="success"
                      class="mx-2"
                      @click="saveUpdate"
                    >
                      <v-icon left>mdi-content-save-outline</v-icon>Sauvegarder
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-2 mb-1 grey--text">{{ user.poste }}</h6>
            <h4 class="display-3 mb-3 black--text">{{ user.firstname }} {{ user.lastname }}</h4>
          </v-card-text>
        </base-material-card>
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
import qs from "qs";

export default {
  name: "Parametres-generaux",
  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    isDialogDateNaissanceOpen: false,
    showPassword: false,
    items_Sexe: ["Homme", "Femme"],
    user: {
      email: "",
      lastname: "",
      firstname: "",
      date_naissance: new Date().toISOString().substr(0, 10),
      sexe: "",
      rue: "",
      ville: "",
      codePostal: "",
      pays: "",
      site_web: "",
      personne_contacter: "",
      phone: "",
      poste: "",
      isAdmin: ""
    },
    isUpdateUser: false,
    isChangePasswordDialog: false,
    passwordUser: null,
    old_passwordUser: null
  }),
  computed: {
    id_user() {
      return this.$store.state.id_user;
    }
  },
  mounted() {
    if (this.id_user != undefined && this.id_user !== 0) {
      console.log("idUser: " + this.id_user);
    } else return this.$router.push({ name: "Connexion" });

    /*--------------------------------------------------- */
    axios
      .get("http://localhost:3000/user/" + this.id_user) //tous les users de l entreprise
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          var user = response.data.user;
          //console.log(user);
          user.date_naissance =
            user.date_naissance.substr(6, 4) +
            "-" +
            user.date_naissance.substr(3, 2) +
            "-" +
            user.date_naissance.substr(0, 2);
          this.user = user;
        }
        console.log("OK");
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
        this.user.date_naissance = userDateNaissance;
      });
  },
  methods: {
    saveUpdate: function() {
      this.isUpdateUser = false;
      /*--------------------------------------------------- */
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };
      let userDateNaissance = this.user.date_naissance;
      this.user.date_naissance =
        this.user.date_naissance.substring(8, 10) +
        "-" +
        this.user.date_naissance.substring(5, 7) +
        "-" +
        this.user.date_naissance.substring(0, 4);

      let payload = this.user;
      axios
        .put(
          "http://localhost:3000/user/" + this.id_user,
          qs.stringify(payload),
          config
        ) //update de l'user
        .then(response => {
          if (this.verifyResponseOk(response.data)) {
            //console.log(response.data);
            if (response.data.error == false)
              this.successMessage("Sauvegarde des modifications effectuée !");
            setTimeout(() => {
              document.location.reload(true);
            }, 2000);
          }
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
          this.user.date_naissance = userDateNaissance;
        });
    },
    annulerUpdate: function() {
      this.isUpdateUser = false;
      document.location.reload(true);
    },
    savePassword: function(old_passwordUser, passwordUser) {
      this.isChangePasswordDialog = false;

      if (old_passwordUser == null || old_passwordUser == "")
        return this.errorMessage("Mot de passe actuel vide !");
      if (passwordUser == null || passwordUser == "")
        return this.errorMessage("Nouveau mot de passe vide !");

      /*--------------------------------------------------- */
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let payload = {
        old_password: old_passwordUser,
        new_password: passwordUser
      };

      axios
        .put(
          "http://localhost:3000/userEditPass/" + this.id_user,
          qs.stringify(payload),
          config
        ) //edit password de l'user
        .then(response => {
          if (this.verifyResponseOk(response.data)) {
            console.log(response.data);
            if (response.data.error == false)
              this.successMessage("Le mot de passe a bien été modifié !");

            setTimeout(() => {
              document.location.reload(true);
            }, 2000);
          }
        })
        .catch(error => {
          this.passwordUser = "";
          this.old_passwordUser = "";
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
        });
    },
    deletePassword: function() {
      this.isChangePasswordDialog = false;
      this.showPassword = false;
      this.passwordUser = "";
      this.old_passwordUser = "";
      this.confirm_passwordUser = "";
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
