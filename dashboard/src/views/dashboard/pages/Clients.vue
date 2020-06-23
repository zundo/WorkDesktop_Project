<template>
  <v-container id="clients" tag="section" fluid>
    <v-dialog v-model="isDialogNewClient" persistent max-width="1000px">
      <v-card class="px-6">
        <v-card-title class="indigo--text">
          Nouveau Client
          <v-divider class="my-5" />
          <v-icon aria-label="Close" @click="isDialogNewClient = false">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-container>
            <v-row>

              <v-col cols="12" class="text-right">
                <v-btn
                  class="mr-1"
                  outlined
                  color="error"
                  text
                  @click="isDialogNewClient = false"
                >Fermer</v-btn>
                <v-btn outlined color="success" text @click="saveNewClient">Sauvegarder</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
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
            <v-btn :disabled="!isAdmin" small color="red" @click="dialogDeleteClient(item)" class="ml-3">
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
      personne_contacter: "",
      phone: "",
      poste: "",
      id_entreprise_client: "",
      id_entreprise_utilisateur: ""
    },
    isDialogNewClient: false,
    isDialogDeleteClient: false,
    clientToDelete: [],
    expanded: [],
    loading: true,
    firstLoad: true,
    headers: [
      {
        text: "Entreprise",
        value: "nom"//nom entreprise
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
    search: undefined
  }),
  computed: {
    id_user() {
        return this.$store.state.id_user
    },
    isAdmin() {
        return this.$store.state.isAdmin
    },
    id_entreprise() {
        return this.$store.state.id_entreprise
    },
  },
  mounted() {
    this.verifUserConnected();
    /*----------------------*/    
    axios
      .get("http://localhost:3000/clients/"+this.id_entreprise)
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          //console.log(response.data)
          var clients = response.data.clients
          clients.forEach(client => {
            this.items.push(client);
          });
          console.log(this.items)
          setTimeout(() => {
            this.loading = false;
            this.firstLoad = false;
          }, 1000);
        }
      })
      .catch(error => {
        console.log("ERROR " +JSON.stringify(error.response.status) +" : " +JSON.stringify(error.response.data.message));
        this.errorMessage("ERROR " +JSON.stringify(error.response.status) +" : " +JSON.stringify(error.response.data.message));
      });
  },
  methods: {
    saveNewClient: function() {
      this.isDialogNewClient = false;
      console.log("Sauvegarder new client");
    },
    openDialogNewClient: function() {
      this.isDialogNewClient = true;
      //mettre les valeurs des inputs du dialog a vide
    },
    deleteClient: function() {
      this.isDialogDeleteClient = false;

      axios
        .delete("http://localhost:3000/deleteClient/"+this.clientToDelete.id)
        .then(response => {
          if(response.data.error == false){
            //console.log(response.data.message)
            this.successMessage(
              "Le client " +
                this.clientToDelete.firstname +' '+this.clientToDelete.lastname+
                " a été supprimé avec succès"
            );
            setTimeout(() => {
              document.location.reload(true);            
            }, 1500);
          }
        })
        .catch(error => {
          console.log("ERROR " +JSON.stringify(error.response.status) +" : " +JSON.stringify(error.response.data.message));
          this.errorMessage("ERROR " +JSON.stringify(error.response.status) +" : " +JSON.stringify(error.response.data.message));
        })
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
    verifUserConnected: function(){
      if((this.id_user != undefined && this.id_user !== 0) || (this.isAdmin != undefined && this.isAdmin !== 0) || (this.id_entreprise != undefined && this.id_entreprise !== 0)){
        //console.log(this.id_user + " " + this.isAdmin)
      }else return this.$router.push({ name: "Connexion" });
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
