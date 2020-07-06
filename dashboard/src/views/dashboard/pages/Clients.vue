<template>
  <v-container id="clients" tag="section" fluid>
    <v-dialog v-model="isDialogDateNaissanceOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="indigo lighten-1"
        v-model="client.date_naissance"
        reactive
        show-current
      >
        <v-btn
          class="ml-auto"
          outlined
          color="indigo"
          text
          @click="isDialogDateNaissanceOpen = false"
        >Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogNewClient" max-width="1000px" overlay-opacity="0.9">
      <v-card class="px-6">
        <v-card-title class="indigo--text">
          Nouveau Client
          <v-icon aria-label="Close" @click="isDialogNewClient = false">mdi-close</v-icon>
          <v-divider class="my-1" />
        </v-card-title>
        <v-row>
          <v-col cols="12">
            <v-stepper v-model="etape">
              <v-stepper-header class="px-10 mx-10 mt-3">
                <v-stepper-step :complete="etape > 1" step="1">Nouvelle entreprise</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="etape > 2" step="2">Nouveau client</v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card class="mb-5" color="grey darken-4" height="auto" v-if="!isDataCompagny">
                    <div class="text-center">
                      <v-row>
                        <v-col cols="11">
                          <v-text-field
                            color="indigo"
                            label="Numéro de Siret*"
                            prepend-inner-icon="mdi-sort-numeric-variant"
                            clearable
                            outlined
                            v-model="entreprise.numSiret_ent"
                            class="ml-5 mt-6"
                            maxlength="14"
                            hint="Numéro de SIRET entreprise"
                          />
                        </v-col>
                        <v-col cols="1">
                          <v-btn
                            class="mt-8 mr-5"
                            color="success"
                            @click="getDataCompagny(entreprise.numSiret_ent)"
                            depressed
                            fab
                            small
                          >
                            <v-icon>mdi-check-circle-outline</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card>
                  <v-card class="mb-5" color="grey darken-4" height="auto" v-else>
                    <v-col cols="12">
                      <div class="text-center">
                        <v-row class="mt-n3">
                          <v-col cols="12" md="6">
                            <v-text-field
                              color="indigo"
                              label="Nom de l'entreprise*"
                              v-model="entreprise.nom_ent"
                              prepend-inner-icon="mdi-face"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              color="indigo"
                              label="Numéro de Siret*"
                              v-model="entreprise.numSiret_ent"
                              prepend-inner-icon="mdi-sort-numeric-variant"
                              clearable
                              maxlength="14"
                              hint="Numéro de SIRET entreprise"
                            />
                          </v-col>
                        </v-row>
                        <v-row class="mt-n6">
                          <v-col cols="12" md="4">
                            <v-text-field
                              color="indigo"
                              label="Email de l'entreprise*"
                              v-model="entreprise.email_ent"
                              prepend-inner-icon="mdi-email-outline"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              color="indigo"
                              label="Téléphone de l'entreprise*"
                              v-model="entreprise.telephone_ent"
                              prepend-inner-icon="mdi-deskphone"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="4">
                            <v-text-field
                              color="indigo"
                              label="Site web entreprise"
                              v-model="entreprise.website_ent"
                              prepend-inner-icon="mdi-web"
                              clearable
                            />
                          </v-col>
                        </v-row>
                        <v-row class="mt-n4">
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Rue*"
                              v-model="entreprise.rue_ent"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Ville*"
                              v-model="entreprise.ville_ent"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Code Postal*"
                              v-model="entreprise.codePostal_ent"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              color="indigo"
                              label="Pays*"
                              v-model="entreprise.pays_ent"
                              prepend-inner-icon="mdi-walk"
                              clearable
                            />
                          </v-col>
                        </v-row>
                      </div>
                      <small>*Veuillez remplir les champs</small>
                    </v-col>
                  </v-card>
                  <v-btn
                    color="indigo"
                    class="mr-2"
                    :disabled="!isDataCompagny"
                    @click="etape++"
                    text
                    outlined
                  >
                    <v-icon left>mdi-check-circle-outline</v-icon>Suite
                  </v-btn>
                  <v-btn
                    class="mr-2"
                    v-if="isNotFound==true && isDataCompagny==false"
                    color="red lighten-1"
                    @click="isDataCompagny=true"
                    outlined
                  >
                    <v-icon left>mdi-help-circle-outline</v-icon>SIRET Introuvable ?
                  </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card class="mb-5" color="grey darken-4" height="auto">
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
                              v-model="client.website"
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
                    </v-col>
                  </v-card>
                  <v-btn color="indigo" class="mr-5" @click="saveNewClient" text outlined>
                    <v-icon left>mdi-check-circle-outline</v-icon>Sauvegarder
                  </v-btn>
                  <v-btn text color="error" @click="etape--" outlined>
                    <v-icon left>mdi-arrow-left-circle-outline</v-icon>Retour
                  </v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                  <v-card class="mb-5" color="primary lighten-1">
                    <v-card-text>
                      Chargement
                      <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogDeleteClient" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Supprimer le client {{ clientToDelete.firstname }} {{ clientToDelete.lastname }} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogDeleteClient=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="deleteClient" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-material-card color="indigo" icon="mdi-account-group-outline" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Clients</div>
      </template>

      <v-row class="mt-8 mr-1">
        <v-btn :disabled="!isAdmin" color="indigo" @click="openDialogNewClient" class="ml-3">
          <v-icon left>mdi-account-plus-outline</v-icon>Nouveau Client
        </v-btn>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          class="ml-auto"
          label="Recherche"
          color="primary"
          hide-details
          single-line
          style="max-width: 250px;"
          clearable
        />
      </v-row>
      <v-divider class="mt-6" />

      <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table"></v-skeleton-loader>
      <v-data-table
        v-else
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['nom']"
        :sort-desc="[false]"
        multi-sort
        show-expand
        single-expand
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-btn small color="blue" @click="PageInfosClient(item)">
              <v-icon left>mdi-card-account-details-outline</v-icon>
              Informations M/Mme {{ item.lastname }}
            </v-btn>
            <v-btn
              :disabled="!isAdmin"
              small
              color="red"
              @click="dialogDeleteClient(item)"
              class="ml-3"
            >
              <v-icon left>mdi-account-remove-outline</v-icon>
              Supprimer M/Mme {{ item.lastname }}
            </v-btn>
          </td>
        </template>
        <div
          slot="no-results"
          :value="true"
          icon="warning"
          class="error--text"
        >La recherche "{{ search }}" est inconnu.</div>
      </v-data-table>
    </base-material-card>
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
  name: "Clients",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    isDialogDateNaissanceOpen: false,
    items_Sexe: ["Homme", "Femme"],
    client: {
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
      phone: "",
      poste: "",
      id_entreprise_client: "",
      id_entreprise_utilisateur: ""
    },
    entreprise: {
      numSiret_ent: "",
      nom_ent: "",
      rue_ent: "",
      ville_ent: "",
      codePostal_ent: "",
      pays_ent: "",
      website_ent: "",
      email_ent: "",
      telephone_ent: ""
    },
    isDialogDateNaissanceOpen: false,
    isDialogNewClient: false,
    isDialogDeleteClient: false,
    clientToDelete: [],
    expanded: [],
    loading: true,
    firstLoad: true,
    headers: [
      {
        text: "Entreprise",
        value: "nom" //nom entreprise
      },
      {
        text: "Nom",
        value: "lastname"
      },
      {
        text: "Prénom",
        value: "firstname"
      },
      {
        text: "Email",
        value: "email"
      },
      {
        text: "Phone",
        value: "phone"
      },
      {
        //sortable: false,
        text: "Poste",
        value: "poste"
      }
    ],
    items: [],
    etape: 1,
    search: undefined,
    isDataCompagny: false,
    isNotFound: false
  }),
  computed: {
    id_user() {
      return this.$store.state.id_user;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    },
    id_entreprise() {
      return this.$store.state.id_entreprise;
    }
  },
  mounted() {
    this.verifUserConnected();
    /*----------------------*/
    
    if(this.id_entreprise == null || this.id_entreprise == undefined) return

    axios
      .get("http://localhost:3000/clients/" + this.id_entreprise)
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          //console.log(response.data)
          var clients = response.data.clients;
          clients.forEach(client => {
            this.items.push(client);
          });
          //console.log(this.items);
          setTimeout(() => {
            this.loading = false;
            this.firstLoad = false;
          }, 1000);
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
      });
  },
  methods: {
    getDataCompagny: function(siret = null) {
      if (siret === null || siret === 0 || siret.length === 0)
        return this.errorMessage("Le SIRET ne peut pas être vide !");
      if (siret.length !== 14)
        return this.errorMessage("Le SIRET doit contenir 14 chiffres !");
      if (siret.match(/^[0-9]*$/gm) == null)
        return this.errorMessage(
          "Le SIRET doit contenir seulement des chiffres !"
        );

      axios
        .get(
          "https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/" +
            siret
        )
        .then(response => {
          if (response !== undefined || response !== null) {
            this.entreprise.nom_ent =
              response.data.etablissement.unite_legale.denomination;
            this.entreprise.rue_ent = response.data.etablissement.geo_l4;
            this.entreprise.ville_ent =
              response.data.etablissement.libelle_commune;
            this.entreprise.codePostal_ent =
              response.data.etablissement.code_postal;
            this.entreprise.pays_ent = "";
            this.entreprise.website_ent = "";
            this.entreprise.email_ent = "";
            this.entreprise.telephone_ent = "";
            this.isDataCompagny = true;
          }
        })
        .catch(error => {
          console.log(error);
          this.errorMessage("Le SIRET est introuvable ou inconnu, réessayer !");
          this.isNotFound = true;
        });
    },
    saveNewClient: async function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let clientDateNaissance = this.client.date_naissance;
      /*console.log(clientDateNaissance)
            console.log(this.client.date_naissance)*/

      this.client.date_naissance =
        this.client.date_naissance.substring(8, 10) +
        "-" +
        this.client.date_naissance.substring(5, 7) +
        "-" +
        this.client.date_naissance.substring(0, 4);

        this.client.id_entreprise_utilisateur = this.id_entreprise; //id_entreprise provenant du store

      let payload = Object.assign(this.client, this.entreprise);

      axios
        .post(
          "http://localhost:3000/addClient",
          qs.stringify(payload),
          config
        )
        .then(response => {
          this.successMessage("Le client a bien été ajouté !");
          if (response.data.error == false) document.location.reload(true);
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
        })
    },
    openDialogNewClient: function() {
      this.isDialogNewClient = true;
      this.isDataCompagny = false;
      this.isNotFound = false;
    },
    deleteClient: function() {
      this.isDialogDeleteClient = false;

      axios
        .delete("http://localhost:3000/deleteClient/" + this.clientToDelete.id)
        .then(response => {
          if (response.data.error == false) {
            //console.log(response.data.message)
            this.successMessage(
              "Le client " +
                this.clientToDelete.firstname +
                " " +
                this.clientToDelete.lastname +
                " a été supprimé avec succès"
            );
            setTimeout(() => {
              document.location.reload(true);
            }, 1500);
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
        });
    },
    dialogDeleteClient: function(infos_client) {
      this.isDialogDeleteClient = true;
      this.clientToDelete = infos_client;
    },
    PageInfosClient: function(infos_client) {
      this.$router.push({
        name: "Informations-Client",
        params: { infos_client: infos_client }
      });
    },

    /*------------------------------------------------------ */
    verifUserConnected: function() {
      if (
        (this.id_user != undefined && this.id_user !== 0) ||
        (this.isAdmin != undefined && this.isAdmin !== 0) ||
        (this.id_entreprise != undefined && this.id_entreprise !== 0)
      ) {
        //console.log(this.id_user + " " + this.isAdmin)
      } else return this.$router.push({ name: "Connexion" });
    },
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
