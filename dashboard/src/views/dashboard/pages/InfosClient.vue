<template>
  <v-container id="clients" fluid tag="section">
    <v-dialog v-model="isDialogDateNaissanceOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="indigo"
        v-model="client.date_naissance"
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
        <base-material-card color="indigo" >
          <template v-slot:heading>
            <div v-if="$route.params.isEdit === false">
              <div
                class="display-3 white--text"
              >{{ client.firstname }} {{ client.lastname }}</div>
            </div>
            <div v-else>
              <div class="display-2 white--text mb-4">
                <v-icon large>mdi-account-edit-outline</v-icon>Modification client
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
                  <td>{{ client.nom }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ client.email }}</td>
                </tr>
                <tr>
                  <td>Numéro de téléphone</td>
                  <td>{{ client.phone }}</td>
                </tr>
                <tr>
                  <td>Sexe</td>
                  <td>{{ client.sexe }}</td>
                </tr>
                <tr>
                  <td>Date de naissance</td>
                  <td>{{ client.date_naissance }}</td>
                </tr>
                <tr>
                  <td>Poste</td>
                  <td>{{ client.poste }}</td>
                </tr>
                <tr>
                  <td>Site web</td>
                    <td>                    
                      <a href="client.site_web" v-if="client.site_web != ''">{{ client.site_web }}</a>
                      <span v-else>Inconnu</span>
                    </td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td v-if="client.ville != ''">
                    <span v-if="client.rue != ''">{{ client.rue }},</span> {{ client.ville }}
                  </td>
                  <td v-else>Inconnu</td>
                </tr>
                <tr>
                  <td>Code postal</td>
                  <td><span v-if="client.codePostal !== 0">{{ client.codePostal }}</span><span v-else>Inconnu</span></td>
                </tr>
                <tr>
                  <td>Pays</td>
                  <td v-if="client.pays != ''">{{ client.pays }}</td>
                  <td v-else>Inconnu</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="px-4" v-else>
            <v-row>
                <v-col cols="12">
                  <div class="text-center">
                        <v-row class="mt-n4">
                          <v-col cols="12" md="4">
                            <v-text-field
                              color="indigo"
                              label="Nom*"
                              v-model="client.lastname"
                              prepend-inner-icon="mdi-face"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              color="indigo"
                              label="Prénom*"
                              v-model="client.firstname"
                              prepend-inner-icon="mdi-face"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              color="indigo"
                              label="Numéro de téléphone*"
                              v-model="client.phone"
                              prepend-inner-icon="mdi-deskphone"
                              clearable
                            />
                          </v-col>
                        </v-row>
                        <v-row class="mt-n6">
                          <v-col cols="12" md="6">
                            <v-text-field
                              color="indigo"
                              label="Poste*"
                              v-model="client.poste"
                              prepend-inner-icon="mdi-badge-account-outline"
                              clearable
                            />
                          </v-col>

                          <v-col cols="12" md="6">
                            <v-text-field
                              color="indigo"
                              label="Email*"
                              v-model="client.email"
                              prepend-inner-icon="mdi-email-outline"
                              clearable
                            />
                          </v-col>
                        </v-row>
                        <v-row class="mt-n6">
                          <v-col cols="12" md="6">
                            <v-text-field
                              color="indigo"
                              label="Site Web"
                              v-model="client.site_web"
                              prepend-inner-icon="mdi-web"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-select
                              color="indigo"
                              prepend-inner-icon="mdi-format-list-bulleted-type"
                              v-model="client.sexe"
                              :items="items_Sexe"
                              label="Sexe*"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              v-model="client.date_naissance"
                              label="Date de naissance*"
                              prepend-icon="mdi-calendar-outline"
                              maxlength="10"
                              hint="AAAA/MM/JJ"
                              @click:prepend="isDialogDateNaissanceOpen = true"
                            />
                          </v-col>
                        </v-row>
                        <v-row class="mt-n6">
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Rue"
                              v-model="client.rue"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Ville"
                              v-model="client.ville"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Code Postal"
                              v-model="client.codePostal"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Pays"
                              v-model="client.pays"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                        </v-row>
                  </div>
                  <v-col cols="12" class="text-right">
                    <v-btn class="mr-1" outlined color="error" text to="/clients">
                      <v-icon left>mdi-close-circle-outline</v-icon>Retour
                    </v-btn>
                    <v-btn outlined color="success" text @click="saveModificationClient">
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
        <base-material-card
          v-else
          icon="mdi-domain" 
          title="Infos Entreprise"
          color="indigo"
        >
          <v-row>
            <v-card-text>
              <v-col cols="12">
                <h6 class="display-2 mb-n3 grey--text">
                  <v-icon large left color="indigo">mdi-office-building</v-icon>
                  <span>Entreprise : {{ client.nom }}</span><!--nom de l entreprise-->
                </h6>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="orange darken-2">mdi-email-outline</v-icon>
                  Email entreprise : {{ client.email_entreprise }}
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="indigo lighten-1">mdi-deskphone</v-icon>
                  Numéro entreprise : {{ client.telephone }}
                </p>
              </v-col>
            </v-card-text>
          </v-row>
        </base-material-card>
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
  name: "InfosClient",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    isDialogDateNaissanceOpen: false,
    items_Sexe: ["Homme", "Femme"],
    loading: true,
    firstLoad: true,
    client: {}
  }),
  computed: {
    id_user() {
        return this.$store.state.id_user
    },
  },
  mounted() {
    //id_user de l'utilisateur connecter
    if(this.id_user != undefined && this.id_user !== 0){
      console.log('idUser: '+this.id_user)
    }else return this.$router.push({ name: "Connexion" });
    /*--------------------------------------------------- */
    
    //infos du client choisi
    if (
      this.$route.params.infos_client != null &&
      this.$route.params.infos_client != 0
    ) {
      this.client = this.$route.params.infos_client;
      setTimeout(() => {
        this.loading = false;
        this.firstLoad = false;
      }, 1000);
    }else return this.$router.push({ name: "Clients" });
  },
  methods: {
    saveModificationClient: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let clientDateNaissance = this.client.date_naissance;
      this.client.date_naissance =
        this.client.date_naissance.substring(8, 10) +
        "-" +
        this.client.date_naissance.substring(5, 7) +
        "-" +
        this.client.date_naissance.substring(0, 4);
      
      //this.client.codePostal = this.client.codePostal == "Inconnu" ? 0 : this.client.codePostal;

      let payload = this.client;

      axios
        .put(
          "http://localhost:3000/updateClient/" + this.client.id,
          qs.stringify(payload),
          config
        ) //update du client
        .then(response => {
          if (this.verifyResponseOk(response.data)) {
            if (response.data.error == false)
              this.successMessage("Sauvegarde des modifications effectuée !");
            setTimeout(() => {
              this.$router.push({
                name: "Clients"
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
          this.client.date_naissance = clientDateNaissance;
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
