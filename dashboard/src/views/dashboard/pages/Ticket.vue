<template>
  <v-container id="ticket" fluid tag="section">
    <v-dialog v-model="isDialogNewTicket" persistent max-width="1000px" overlay-opacity="0.8">
      <v-card class="px-6" outlined>
        <v-card-title class="pink--text">
          Création d'un ticket
          <v-icon aria-label="Close" @click="isDialogNewTicket = false">mdi-close</v-icon>
        </v-card-title>
        <v-col cols="12">
          <div class="text-center">
            <v-divider class="mb-5" />
            <v-row class="mt-n3">
              <v-col cols="12" md="6">
                <v-text-field
                  color="pink"
                  label="Sujet"
                  v-model="newTicket.sujet"
                  prepend-icon="mdi-clipboard-text-multiple"
                  maxlength="25"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  color="pink"
                  outlined
                  v-model="newTicket.theme"
                  prepend-inner-icon="mdi-format-list-bulleted-type"
                  :items="items_theme"
                  label="Theme"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  outlined
                  color="pink"
                  class="mt-n3"
                  label="Contenu"
                  v-model="newTicket.contenu"
                  hint="Description du ticket"
                  prepend-icon="mdi-ballot-outline"
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" class="text-right">
          <v-divider class="my-4" />
          <v-btn class="mr-1" outlined color="error" text @click="isDialogNewTicket = false">Fermer</v-btn>
          <v-btn outlined color="success" text @click="saveNewTicket(newTicket)">Sauvegarder</v-btn>
        </v-col>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogCloreTicket" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Cloturer le ticket {{ ticketToClore.sujet }} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogCloreTicket=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="cloreTicket(ticketToClore)" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-material-card color="pink" icon="mdi-text-box" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Tickets</div>
      </template>
      <v-row class="mt-8 mr-1">
        <v-btn color="pink" @click="isDialogNewTicket=true" class="ml-3">
          <v-icon left>mdi-text-box-plus-outline</v-icon>Nouveau Ticket
        </v-btn>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          class="ml-auto"
          label="Recherche"
          color="pink"
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
        :sort-by="['sujet']"
        :sort-desc="[false]"
        show-expand
        single-expand
        item-key="id"
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="py-4">
            <v-row>
              <v-col cols="12" class="mb-n6">
                <v-textarea label="Contenu ticket" v-model="item.contenu" outlined disabled></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="mb-n6">
                <v-textarea label="Réponse support" v-model="item.reponseSupport" outlined disabled></v-textarea>
              </v-col>
            </v-row>
            <v-divider class="my-2" />
            <v-col cols="12">
              <v-row>
                <div class="text-left">
                  <v-btn
                    small
                    color="orange"
                    outlined
                    :disabled="id_user != item.id_user"
                    v-if="item.status != 'Résolu'"
                    @click="dialogCloreTicket(item)"
                  >
                    <v-icon left>mdi-close-box-multiple-outline</v-icon>
                    Clore le ticket {{ item.sujet }} ?
                  </v-btn>
                </div>
              </v-row>
            </v-col>
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
  name: "Ticket",
  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    newTicket: {
      sujet: "",
      theme: "",
      contenu: "",
      reponseSupport: "",
      status: "En attente support",
      id_user: null,
      id_entreprise: null
    },
    items_theme: ["Bug", "Amélioration", "Incohérence", "Autres"],
    search: undefined,
    isDialogNewTicket: false,
    headers: [
      {
        text: "Sujet",
        value: "sujet"
      },
      {
        text: "Thème",
        value: "theme"
      },
      {
        text: "Date de création",
        value: "dateTicket"
      },
      {
        text: "Statut",
        value: "status"
      },
      {
        text: "Collaborateur M/Mme",
        value: "lastname"
      }
    ],
    items: [],
    loading: true,
    firstLoad: true,
    isDialogCloreTicket: false,
    ticketToClore: [],
    expanded: []
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
    if (this.id_entreprise == null || this.id_entreprise == undefined) return;

    axios
      .get("http://localhost:3000/tickets/" + this.id_entreprise) //tous les users de l entreprise
      .then(response => {
        response.data.tickets.forEach(ticket => {
          this.items.push(ticket);
        });
        setTimeout(() => {
          this.loading = false;
          this.firstLoad = false;
        }, 1000);
      })
      .catch(error => {
        console.log("ERROR " + error);
        this.errorMessage("ERROR " + error);
      });
  },
  methods: {
    saveNewTicket: function(newTicket = null) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      newTicket.id_entreprise = this.id_entreprise; //id_entreprise provenant du store
      newTicket.id_user = this.id_user; //id_user provenant du store
      //return console.log(newTicket)
      axios
        .post(
          "http://localhost:3000/addTicket",
          qs.stringify(newTicket),
          config
        )
        .then(response => {
          this.successMessage("Le ticket a bien été ajouté !");
          console.log("Le ticket a bien été ajouté !");
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
        });
    },
    dialogCloreTicket: function(infos_ticket = null) {
      this.isDialogCloreTicket = true;
      this.ticketToClore = infos_ticket;
    },
    cloreTicket: function(ticketToClore = null) {

      axios
        .get("http://localhost:3000/cloreTicket/" + this.ticketToClore.id)
        .then(response => {
            this.successMessage("Le ticket a été Résolu ou Fermé avec succès");
            setTimeout(() => {
              document.location.reload(true);
            }, 1000);
        })
        .catch(error => {
          console.log("ERROR " + error);
          this.errorMessage("ERROR " + error);
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
