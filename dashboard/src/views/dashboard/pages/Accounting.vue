<template>
  <v-container id="accounting" tag="section" fluid>
    <v-dialog v-model="isDialogNewDateOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="orange lighten-1"
        v-model="newFacture.date"
        reactive
        show-current
      >
        <v-btn class="ml-auto" outlined color="orange" text @click="isDialogNewDateOpen = false">Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogDateOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="orange lighten-1"
        v-model="facture.date"
        reactive
        show-current
      >
        <v-btn class="ml-auto" outlined color="orange" text @click="isDialogDateOpen = false">Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogNewFacture" persistent max-width="1000px">
      <v-card class="px-6">
        <v-card-title class="orange--text">
          Créer une facture
          <v-divider class="my-5" />
          <v-icon aria-label="Close" @click="isDialogNewFacture = false">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  v-model="newFacture.titre"
                  label="Titre"
                  class="mt-n3"
                  color="orange"
                  prepend-icon="mdi-alphabetical"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="listeClients"
                  prepend-icon="mdi-magnify"
                  color="white"
                  item-text="lastname"
                  item-value="id"
                  v-model="newFacture.id_client"
                  hide-no-data
                  hide-details
                  item-color
                  class="mt-n3"
                  label="Client M/Mme"
                  outlined
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="newFacture.montant"
                  label="Montant(€)"
                  class="mt-n3"
                  color="orange"
                  hint="Exemple: 127.52"
                  prepend-icon="mdi-cash"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  class="mt-n3"
                  color="orange"
                  v-model="newFacture.date"
                  label="Date"
                  prepend-icon="mdi-calendar-outline"
                  maxlength="10"
                  hint="AAAA/MM/JJ"
                  outlined
                  @click:prepend="isDialogNewDateOpen = true"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="newFacture.statut"
                  label="Statut"
                  class="mt-n3"
                  color="orange"
                  disabled
                  prepend-icon="mdi-alpha-s-circle-outline"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  outlined
                  color="orange"
                  class="mt-n3"
                  label="Description"
                  v-model="newFacture.description"
                  prepend-icon="mdi-ballot-outline"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  class="mr-1"
                  outlined
                  color="error"
                  text
                  @click="isDialogNewFacture = false"
                >Fermer</v-btn>
                <v-btn outlined color="success" text @click="saveNewFacture">Sauvegarder</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogFacture" persistent max-width="1000px">
      <v-card class="px-6">
        <v-card-title class="orange--text">
          Information Facture
          <v-divider class="my-5" />
          <v-icon aria-label="Close" @click="isEdit=false;isDialogFacture = false;">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  outlined
                  v-model="facture.titre"
                  label="Titre"
                  class="mt-n3"
                  color="orange"
                  prepend-icon="mdi-alphabetical"
                  :disabled="!isEdit"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="listeClients"
                  prepend-icon="mdi-magnify"
                  color="white"
                  item-text="lastname"
                  item-value="id"
                  v-model="facture.id_client"
                  hide-no-data
                  hide-details
                  item-color="orange"
                  class="mt-n3"
                  label="Client M/Mme"
                  outlined
                  :disabled="!isEdit"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="facture.montant"
                  label="Montant(€)"
                  class="mt-n3"
                  color="orange"
                  hint="Exemple: 127.52"
                  prepend-icon="mdi-cash"
                  :disabled="!isEdit"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  class="mt-n3"
                  color="orange"
                  v-model="facture.date"
                  label="Date"
                  prepend-icon="mdi-calendar-outline"
                  maxlength="10"
                  hint="AAAA/MM/JJ"
                  outlined
                  @click:prepend="isDialogDateOpen = true"
                  :disabled="!isEdit"
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="facture.statut"
                  label="Statut"
                  class="mt-n3"
                  color="orange"
                  disabled
                  prepend-icon="mdi-alpha-s-circle-outline"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  outlined
                  color="orange"
                  class="mt-n3"
                  label="Description"
                  v-model="facture.description"
                  prepend-icon="mdi-ballot-outline"
                  :disabled="!isEdit"
                />
              </v-col>
              <v-col cols="12">
                <span v-if="isEdit" class="red--text">
                  <li><u><strong>Note: N'oubliez pas d'enregistrer vos modifications</strong></u></li>
                </span>
                <v-divider class="my-4"/>
                <v-row>
                  <div class="text-left">
                    <v-btn
                      v-if="facture.statut == 'En attente'"
                      outlined
                      color="purple"
                      text
                      @click="isDialogStatutFacture = true"
                    >Facture Payé ?</v-btn>
                  </div>
                  <v-spacer />
                  <div class="text-right">
                    <v-btn
                      class="mr-1"
                      outlined
                      color="error"
                      text
                      @click="isEdit=false;isDialogFacture = false;"
                    >Fermer</v-btn>
                    <v-btn
                      class="mr-1"
                      outlined
                      color="orange"
                      text
                      @click="isEdit =!isEdit"
                      v-if="!isEdit"
                    >Modification</v-btn>
                    <v-btn
                      class="mr-1"
                      outlined
                      color="yellow"
                      text
                      @click="isEdit =!isEdit"
                      v-else
                    >Annuler modification</v-btn>
                    <v-btn
                      v-if="isEdit"
                      outlined
                      color="success"
                      text
                      @click="updateFacture"
                    >Sauvegarder</v-btn>
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogDeleteFacture" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Supprimer la facture {{ factureToDelete.titre }} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogDeleteFacture=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="deleteFacture" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogStatutFacture" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Voulez-vous changé le statut de la facture {{ facture.titre }} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogStatutFacture=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="saveStatutFacture(facture.id_f)" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-material-card color="orange" icon="mdi-bank" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Factures personnelle</div>
      </template>

      <v-row class="mt-8 mr-1">
        <v-btn color="orange" @click="openDialogNewFacture" class="ml-3" :disabled="!isAdmin">
          <v-icon left>mdi-bank-plus</v-icon>Créer une facture
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
        :sort-by="['titre']"
        :sort-desc="[false]"
        show-expand
        single-expand
        item-key="id_f"
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-btn
              :disabled="item.statut != 'En attente'"
              small
              color="purple"
              outlined
              @click="isDialogStatutFacture = true;facture.id_f=item.id_f;"
            ><v-icon left>mdi-help-circle-outline</v-icon>
            Facture Payé ?</v-btn>
            <v-btn small color="info" outlined class="ml-3" @click="pageInfosFacture(item)">
              <v-icon left>mdi-information-outline</v-icon>
              Informations {{ item.titre }}
            </v-btn>
            <v-btn small color="orange" outlined @click="pageInfosFacture(item,true)" class="ml-3">
              <v-icon left>mdi-pencil-outline</v-icon>
              Modifier {{ item.titre }}
            </v-btn>
            <v-btn small color="red" outlined @click="dialogDeleteFacture(item)" class="ml-3">
              <v-icon left>mdi-delete-circle-outline</v-icon>
              Supprimer {{ item.titre }}
            </v-btn>
          </td>
        </template>
        <div
          slot="no-results"
          :value="true"
          icon="warning"
          class="error--text"
        >La recherche "{{ search }}" inconnu.</div>
      </v-data-table>
    </base-material-card>
    <v-snackbar v-model="isSnackbarOpened" :color="isSuccess ? 'success' : 'error'">
      <div class="text-center display-1">
        <v-icon v-if="!isSuccess" color="white">mdi-alert-outline</v-icon>
        <v-icon v-else color="white">mdi-checkbox-marked-circle-outline</v-icon>
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
  name: "Comptabilité",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    newFacture: {
      titre: "",
      statut: "En attente",
      date: new Date().toISOString().substr(0, 10),
      montant: "",
      description: "",
      id_entreprise_utilisateur: "",
      id_client: ""
    },
    facture: {
      titre: "",
      statut: "En attente",
      date: new Date().toISOString().substr(0, 10),
      montant: "",
      description: "",
      id_entreprise_utilisateur: "",
      id_client: ""
    },
    isDialogNewDateOpen: false,
    isDialogDateOpen: false,
    isDialogNewFacture: false,
    isDialogDeleteFacture: false,
    isDialogFacture: false,
    factureToDelete: [],
    expanded: [],
    loading: true,
    firstLoad: true,
    headers: [
      {
        text: "Nom facture",
        value: "titre"
      },
      {
        text: "Statut",
        value: "statut"
      },
      {
        text: "Date",
        value: "date"
      },
      {
        text: "Montant(€)",
        value: "montant"
      },
      {
        text: "Client M/Mme",
        value: "lastname"
      }
    ],
    items: [],
    listeClients: [],
    isEdit: false,
    search: undefined,
    isDialogStatutFacture: false
  }),
  computed: {
    id_user() {
      return this.$store.state.id_user;
    },
    id_entreprise() {
      return this.$store.state.id_entreprise;
    },
    isAdmin() {
      return this.$store.state.isAdmin;
    }
  },
  mounted() {
    this.verifUserConnected();
    if (this.id_user == null || this.id_user == undefined) return;

    /*----------------------*/
    const requestFactures = axios.get(
      "http://localhost:3000/factures/" + this.id_user
    );
    const requestClients = axios.get(
      "http://localhost:3000/clients/" + this.id_entreprise
    );

    axios
      .all([requestFactures, requestClients])
      .then(
        axios.spread((responseFactures, responseClients) => {
          responseFactures.data.factures.forEach(facture => {
            this.items.push(facture);
          });

          responseClients.data.clients.forEach(client => {
            this.listeClients.push(client);
          });
          setTimeout(() => {
            this.loading = false;
            this.firstLoad = false;
          }, 1000);
        })
      )
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
    saveNewFacture: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let newFactureDate = this.newFacture.date;

      this.newFacture.date =
        this.newFacture.date.substring(8, 10) +
        "-" +
        this.newFacture.date.substring(5, 7) +
        "-" +
        this.newFacture.date.substring(0, 4);

      this.newFacture.id_utilisateur = this.id_user; //id_user provenant du store

      axios
        .post(
          "http://localhost:3000/addFacture",
          qs.stringify(this.newFacture),
          config
        )
        .then(response => {
          this.successMessage("La facture a bien été ajouté !");
          this.isDialogNewFacture = false;
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
          this.newFacture.date = newFactureDate;
        });
    },
    updateFacture: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let factureDate = this.facture.date;
      this.facture.date =
        this.facture.date.substring(8, 10) +
        "-" +
        this.facture.date.substring(5, 7) +
        "-" +
        this.facture.date.substring(0, 4);

      let payload = this.facture;
      //return console.log(payload)
      axios
        .put(
          "http://localhost:3000/updateFacture/" + this.facture.id_f,
          qs.stringify(payload),
          config
        ) //update du collaborateur
        .then(response => {
          if (this.verifyResponseOk(response.data)) {
            if (response.data.error == false)
              this.successMessage("Sauvegarde des modifications effectuée !");
            setTimeout(() => {
              document.location.reload(true);
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
          this.facture.date = factureDate;
        });
    },
    openDialogNewFacture: function() {
      this.isDialogNewFacture = true;
    },
    deleteFacture: function() {
      this.isDialogDeleteFacture = false;

      axios
        .delete(
          "http://localhost:3000/deleteFacture/" + this.factureToDelete.id_f
        )
        .then(response => {
          if (response.data.error == false) {
            console.log(
              "La facture " + this.factureToDelete.titre + " a été supprimé"
            );
            this.successMessage(
              "La facture " +
                this.factureToDelete.titre +
                " a été supprimé avec succès"
            );
            setTimeout(() => {
              document.location.reload(true);
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
    dialogDeleteFacture: function(infos_facture) {
      this.isDialogDeleteFacture = true;
      this.factureToDelete = infos_facture;
    },
    pageInfosFacture: function(infos_facture, isEdit = false) {
      this.isEdit = isEdit;
      this.facture = infos_facture;
      this.isDialogFacture = true;
    },
    saveStatutFacture: function(id_facture = null) {
      
      axios
        .get("http://localhost:3000/statutFacture/" + id_facture)
        .then(response => {
            this.isDialogStatutFacture= false;
            this.successMessage("Le statut de la facture a été modifié avec succès");
            setTimeout(() => {
              document.location.reload(true);
            }, 1000);
        })
        .catch(error => {
          console.log("ERROR " +error);
          this.errorMessage("ERROR " +error);
        })
    },
    /*------------------------------------------------------ */
    verifUserConnected: function() {
      if (
        (this.id_user != undefined && this.id_user !== 0) ||
        (this.isAdmin != undefined && this.isAdmin !== 0) ||
        (this.id_entreprise != undefined && this.id_entreprise !== 0)
      ) {
        //console.log(this.isAdmin)
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
