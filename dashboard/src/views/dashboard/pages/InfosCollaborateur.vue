<template>
  <v-container id="collaborateurs" fluid tag="section">
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
            <div v-else>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-menu
                    ref="menu"
                    v-model="menuDate"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="Picker in menu"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDate = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
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
  name: "InfosCollaborateur",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    loading: true,
    firstLoad: true,
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

    //infos du collaborateur choisi
    if (
      this.$route.params.infos_collaborateur != null &&
      this.$route.params.infos_collaborateur != 0
    ) {
      this.collaborateur = this.$route.params.infos_collaborateur;
      //var userId = this.collaborateur.id;
      setTimeout(() => {
        this.loading = false;
        this.firstLoad = false;
      }, 1000);
    } else return this.$router.push({ name: "Collaborateurs" });
  },
  methods: {
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
