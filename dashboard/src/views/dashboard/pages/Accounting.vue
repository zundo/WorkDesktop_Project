<template>
  <v-container id="accounting" tag="section" fluid>
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
                <v-text-field outlined label="Nom" class="mt-n3" color="orange" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Prénom" class="mt-n3" color="orange" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Adresse E-mail" class="mt-n3" color="orange" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Numero de téléphone" class="mt-n3" color="orange" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Société" class="mt-n3" color="orange" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field outlined label="Poste occupé" class="mt-n3" color="orange" />
              </v-col>

              <v-col cols="12">
                <v-text-field outlined label="Objet" class="mt-n3" color="orange" />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  outlined
                  color="orange"
                  class="mt-n3"
                  label="Comment pouvons-nous vous aider ?*"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  class="mr-1"
                  outlined
                  color="error"
                  text
                  @click="isDialogNewFacture = false"
                >Close</v-btn>
                <v-btn outlined color="success" text @click="saveNewFacture">Sauvegarder</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogDeleteFacture" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Supprimer la facture {{ factureToDelete.name }} ?</v-card-title>
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
    <base-material-card color="orange" icon="mdi-bank" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Factures</div>
      </template>

      <v-row class="mt-8 mr-1">
        <v-btn color="orange" @click="openDialogNewFacture" class="ml-3">
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
        :sort-by="['name']"
        :sort-desc="[false]"
        multi-sort
        show-expand
        single-expand
        item-key="name"
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-btn small color="info" @click="PageInfosFacture(item)">
              <v-icon left>mdi-information-outline</v-icon>
              Informations {{ item.name }}
            </v-btn>
            <v-btn small color="red" @click="dialogDeleteFacture(item)" class="ml-3">
              <v-icon left>mdi-delete-circle-outline</v-icon>
              Supprimer {{ item.name }}
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
  name: "Comptabilité",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    isDialogNewFacture: false,
    isDialogDeleteFacture: false,
    factureToDelete: [],
    expanded: [],
    loading: true,
    firstLoad: true,
    headers: [
      {
        text: "Facture",
        value: "name"
      },
      {
        text: "Nom Client",
        value: "username"
      },
      {
        text: "Statut",
        value: "email"
      },
      {
        text: "Date d'échéance",
        value: "phone"
      },
      {
        text: "Montant",
        value: "website"
      },
    ],
    items: [],
    search: undefined
  }),
  computed: {
    id_user() {
        return this.$store.state.id_user
    },
  },
  mounted() {
    if(this.id_user != undefined && this.id_user !== 0){
      console.log('idUser: '+this.id_user)
    }else return this.$router.push({ name: "Connexion" });

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          var users = response.data;
          console.log(users);
          //console.log(JSON.stringify(users))
          users.forEach(user => {
            this.items.push(user);
          });
        }
      })
      .catch(error => this.errorMessage("Network ERROR: " + error))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
          this.firstLoad = false;
        }, 1000);
        console.log("OK");
      });
  },
  methods: {
    saveNewFacture: function() {
      this.isDialogNewFacture = false;
      console.log("Sauvegarder new facture");
    },
    openDialogNewFacture: function() {
      this.isDialogNewFacture = true;
      //mettre les valeurs des inputs du dialog a vide
    },
    deleteFacture: function() {
      this.isDialogDeleteFacture = false;
      console.log("La facture " + this.factureToDelete.name + " a été supprimé");
    },
    dialogDeleteFacture: function(infos_facture) {
      this.isDialogDeleteFacture = true;
      this.factureToDelete = infos_facture;
    },
    PageInfosFacture: function(infos_facture) {
      this.$router.push({
        name: "Informations-Facture",
        params: { userId: infos_facture.id }
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
