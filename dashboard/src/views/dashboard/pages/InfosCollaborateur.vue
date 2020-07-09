<template>
  <v-container id="collaborateurs" fluid tag="section">
    <v-dialog v-model="isDialogDateNaissanceOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="blue lighten-1"
        v-model="collaborateur.date_naissance"
        reactive
        show-current
      >
        <v-btn
          class="ml-auto"
          outlined
          color="blue"
          text
          @click="isDialogDateNaissanceOpen = false"
        >Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="info">
          <template v-slot:heading>
            <div v-if="$route.params.isEdit === false">
              <div
                class="display-3 white--text"
              >{{ collaborateur.firstname }} {{ collaborateur.lastname }}</div>
              <div class="subtitle-2 white--text">
                <span v-if="collaborateur.isAdmin">Administrateur</span>
                <span v-else>Utilisateur</span>
              </div>
            </div>
            <div v-else>
              <div class="display-2 white--text mb-4">
                <v-icon large>mdi-account-edit-outline</v-icon>Modification collaborateur
              </div>
              <div class="subtitle-2 white--text">
                <span>{{ collaborateur.email }}</span>
              </div>
            </div>
          </template>
          <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table"></v-skeleton-loader>
          <div v-else>
            <v-simple-table v-if="$route.params.isEdit === false" dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Nom de l'entreprise</td>
                    <td>{{ collaborateur.nom }}</td>
                  </tr>
                  <tr>
                    <td>Personne à contacter</td>
                    <td>{{ collaborateur.personne_contacter }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{ collaborateur.email }}</td>
                  </tr>
                  <tr>
                    <td>Numéro de téléphone</td>
                    <td>{{ collaborateur.phone }}</td>
                  </tr>
                  <tr>
                    <td>Sexe</td>
                    <td>{{ collaborateur.sexe }}</td>
                  </tr>
                  <tr>
                    <td>Date de naissance</td>
                    <td>{{ collaborateur.date_naissance }}</td>
                  </tr>
                  <tr>
                    <td>Poste</td>
                    <td>{{ collaborateur.poste }}</td>
                  </tr>
                  <tr>
                    <td>Adresse</td>
                    <td>{{ collaborateur.rue }}, {{ collaborateur.ville }}</td>
                  </tr>
                  <tr>
                    <td>Code postal</td>
                    <td>{{ collaborateur.codePostal }}</td>
                  </tr>
                  <tr>
                    <td>Pays</td>
                    <td>{{ collaborateur.pays }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="px-4" v-else>
              <v-row>
                <v-col cols="12">
                  <div class="text-center">
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          color="info"
                          label="Nom"
                          v-model="collaborateur.lastname"
                          prepend-inner-icon="mdi-face"
                          clearable
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          color="info"
                          label="Prénom"
                          v-model="collaborateur.firstname"
                          prepend-inner-icon="mdi-face"
                          clearable
                        />
                      </v-col>
                    </v-row>
                    <v-row class="mt-n4">
                      <v-col cols="12" md="6">
                        <v-text-field
                          color="info"
                          label="Email"
                          v-model="collaborateur.email"
                          prepend-inner-icon="mdi-email-outline"
                          disabled
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          :disabled="changePassword == false"
                          color="info"
                          label="Modification password"
                          v-model="collaborateur.password"
                          prepend-inner-icon="mdi-lock-outline"
                          clearable
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          hint="*Attention, cela risque de changer le mot de passe définitivement"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="mt-n4">
                      <v-col cols="12" md="6">
                        <v-text-field
                          color="info"
                          label="Site Web"
                          v-model="collaborateur.website"
                          prepend-inner-icon="mdi-web"
                          clearable
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-select
                          color="info"
                          prepend-inner-icon="mdi-format-list-bulleted-type"
                          v-model="collaborateur.sexe"
                          :items="items_Sexe"
                          label="Sexe"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="info"
                          v-model="collaborateur.date_naissance"
                          label="Date de naissance"
                          prepend-icon="mdi-calendar-outline"
                          maxlength="10"
                          hint="AAAA/MM/JJ"
                          @click:prepend="isDialogDateNaissanceOpen = true"
                        />
                      </v-col>
                    </v-row>
                    <v-row class="mt-n4">
                      <v-col cols="12" md="6">
                        <v-text-field
                          color="info"
                          label="Poste"
                          v-model="collaborateur.poste"
                          prepend-inner-icon="mdi-badge-account-outline"
                          clearable
                        />
                      </v-col>

                      <v-col cols="12" md="3">
                        <v-text-field
                          color="info"
                          label="Numéro de téléphone"
                          v-model="collaborateur.phone"
                          prepend-inner-icon="mdi-deskphone"
                          clearable
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="info"
                          label="Personne à contacter"
                          v-model="collaborateur.personne_contacter"
                          prepend-inner-icon="mdi-deskphone"
                          clearable
                        />
                      </v-col>
                    </v-row>
                    <v-row class="mt-n4">
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="info"
                          label="Rue"
                          v-model="collaborateur.rue"
                          prepend-inner-icon="mdi-walk"
                          clearable
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="info"
                          label="Ville"
                          v-model="collaborateur.ville"
                          prepend-inner-icon="mdi-walk"
                          clearable
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="info"
                          label="Code Postal"
                          v-model="collaborateur.codePostal"
                          prepend-inner-icon="mdi-walk"
                          clearable
                        />
                      </v-col>
                      <v-col cols="12" md="3">
                        <v-text-field
                          color="info"
                          label="Pays"
                          v-model="collaborateur.pays"
                          prepend-inner-icon="mdi-walk"
                          clearable
                        />
                      </v-col>
                    </v-row>
                  </div>
                  <v-row>
                    <v-col cols="12" md="9">
                      <v-switch
                        class="my-n2"
                        v-model="collaborateur.isAdmin"
                        label="Super Admin ?"
                        :color="collaborateur.isAdmin ? 'info' : 'error'"
                      ></v-switch>
                    </v-col>
                    <v-col cols="12" md="3">
                      <v-btn
                        @click="changePassword = !changePassword"
                        color="secondary"
                        text
                        outlined
                        small
                      >
                        <v-icon left>mdi-cog-outline</v-icon>Modifier le password
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-col cols="12" class="text-right">
                    <v-btn class="mr-1" outlined color="error" text to="/collaborateurs">
                      <v-icon left>mdi-close-circle-outline</v-icon>Retour
                    </v-btn>
                    <v-btn outlined color="success" text @click="modificationProfile">
                      <v-icon left>mdi-content-save-outline</v-icon>Sauvegarder
                    </v-btn>
                  </v-col>
                </v-col>
              </v-row>
            </div>
          </div>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table"></v-skeleton-loader>
        <div v-else>
          <base-material-card
            class="v-card-profile"
            avatar="https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg"
          >
            <v-row v-if="$route.params.isEdit === false">
              <v-col cols="12">
                <h4
                  class="display-3 font-weight-light mb-2 text-md-center info--text"
                >{{ collaborateur.firstname }} {{ collaborateur.lastname }}</h4>
              </v-col>
              <v-card-text>
                <v-col cols="12">
                  <h6 class="display-2 mb- grey--text">
                    <v-icon large left color="info">mdi-web</v-icon>Site Web:
                    <a href="collaborateur.site_web">{{ collaborateur.site_web }}</a>
                  </h6>
                </v-col>
                <v-col cols="12">
                  <p class="font-weight-light mb-n3 grey--text">
                    <v-icon large left color="blue">mdi-skype</v-icon>
                    Skype: {{ collaborateur.firstname }}.skype
                  </p>
                </v-col>
                <v-col cols="12">
                  <p class="font-weight-light mb-n3 grey--text">
                    <v-icon large left color="indigo">mdi-linkedin</v-icon>
                    Linkedin: {{ collaborateur.firstname }}.linkedin
                  </p>
                </v-col>
                <v-col cols="12">
                  <p class="font-weight-light mb-n3 grey--text">
                    <v-icon large left color="indigo">mdi-facebook</v-icon>
                    Facebook: {{ collaborateur.firstname }}.facebook
                  </p>
                </v-col>
                <v-col cols="12">
                  <p class="font-weight-light grey--text">
                    <v-icon large left color="blue">mdi-twitter</v-icon>
                    Twitter: {{ collaborateur.firstname }}.twitter
                  </p>
                </v-col>
              </v-card-text>
            </v-row>
            <v-row v-else>
              <v-skeleton-loader :loading="loading" type="table"></v-skeleton-loader>
            </v-row>
          </base-material-card>
        </div>
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
  name: "InfosCollaborateur",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    loading: true,
    firstLoad: true,
    showPassword: false,
    changePassword: false,
    isDialogDateNaissanceOpen: false,
    items_Sexe: ["Homme", "Femme"],
    collaborateur: {},
    menuDate: false
  }),
  computed: {
    id_user() {
      return this.$store.state.id_user;
    }
  },
  mounted() {
    //id_user de l'utilisateur connecter
    if (this.id_user != undefined && this.id_user !== 0) {
      console.log("idUser: " + this.id_user);
    } else return this.$router.push({ name: "Connexion" });
    /*--------------------------------------------------- */

    //modification du collaborateur choisi
    if (
      this.$route.params.infos_collaborateur != null &&
      this.$route.params.infos_collaborateur != 0
    ) {
      this.collaborateur = this.$route.params.infos_collaborateur;

      setTimeout(() => {
        this.loading = false;
        this.firstLoad = false;
      }, 1000);
    } else return this.$router.push({ name: "Collaborateurs" });
  },
  methods: {
    modificationProfile: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let collaborateurDateNaissance = this.collaborateur.date_naissance;
      this.collaborateur.date_naissance =
        this.collaborateur.date_naissance.substring(8, 10) +
        "-" +
        this.collaborateur.date_naissance.substring(5, 7) +
        "-" +
        this.collaborateur.date_naissance.substring(0, 4);

      if (this.collaborateur.isAdmin == true) this.collaborateur.isAdmin = 1;
      else this.collaborateur.isAdmin = 0;
      
      let payload = this.collaborateur;

      axios
        .put(
          "http://localhost:3000/user/" + this.collaborateur.id,
          qs.stringify(payload),
          config
        ) //update du collaborateur
        .then(response => {
          if (this.verifyResponseOk(response.data)) {
            if (response.data.error == false)
              this.successMessage("Sauvegarde des modifications effectuée !");
            setTimeout(() => {
              this.$router.push({
                name: "Collaborateurs"
              });
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
          this.collaborateur.date_naissance = collaborateurDateNaissance;
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
