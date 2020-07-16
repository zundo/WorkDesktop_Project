<template>
  <v-container id="project" tag="section" fluid>
    <v-dialog v-model="isDialogNewDateDebutOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="success lighten-1"
        v-model="newProjet.date_debutProjet"
        reactive
        show-current
      >
        <v-btn
          class="ml-auto"
          outlined
          color="red"
          text
          @click="isDialogNewDateDebutOpen = false"
        >Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogNewDateFinOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="success lighten-1"
        v-model="newProjet.date_finProjet"
        reactive
        show-current
      >
        <v-btn class="ml-auto" outlined color="red" text @click="isDialogNewDateFinOpen = false">Ok</v-btn>
      </v-date-picker>
    </v-dialog>

    <v-dialog v-model="isDialogNewProjet" persistent max-width="1000px">
      <v-card class="px-6">
        <v-card-title class="success--text">
          Créer un projet
          <v-divider class="my-5" />
          <v-icon aria-label="Close" @click="isDialogNewProjet = false">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  outlined
                  v-model="newProjet.nomProjet"
                  label="Nom du projet"
                  class="mt-n3"
                  color="success"
                  prepend-icon="mdi-alphabetical"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  class="mt-n3"
                  color="success"
                  v-model="newProjet.date_debutProjet"
                  label="Date de debut"
                  prepend-icon="mdi-calendar-outline"
                  maxlength="10"
                  hint="AAAA/MM/JJ"
                  outlined
                  @click:prepend="isDialogNewDateDebutOpen = true"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  class="mt-n3"
                  color="success"
                  v-model="newProjet.date_finProjet"
                  label="Date de fin"
                  prepend-icon="mdi-calendar-outline"
                  maxlength="10"
                  hint="AAAA/MM/JJ"
                  outlined
                  @click:prepend="isDialogNewDateFinOpen = true"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  outlined
                  color="success"
                  class="mt-n3"
                  label="Description"
                  v-model="newProjet.descriptionProjet"
                  prepend-icon="mdi-ballot-outline"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  class="mr-1"
                  outlined
                  color="error"
                  text
                  @click="isDialogNewProjet = false"
                >Fermer</v-btn>
                <v-btn outlined color="success" text @click="saveNewProjet">Sauvegarder</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogDeleteProjet" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Supprimer le projet {{ projetToDelete.nomProjet }} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogDeleteProjet=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="deleteProjet" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <base-material-card color="success" icon="mdi-clipboard-text-multiple" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Projets</div>
      </template>

      <v-row class="mt-8 mr-1">
        <v-btn color="success" @click="isDialogNewProjet = true;" class="ml-3">
          <v-icon left>mdi-clipboard-plus-outline</v-icon>Créer un projet
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
        :sort-by="['nomProjet']"
        :sort-desc="[false]"
        show-expand
        single-expand
        item-key="id"
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="py-4">
            <v-row v-if="isEdit">
              <v-col cols="12" md="4">
                <v-text-field
                  outlined
                  v-model="item.nomProjet"
                  label="Nom du projet"
                  class="mt-n3"
                  color="success"
                  append-icon="mdi-alphabetical"
                  :disabled="!isEdit || item.id_user != id_user"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  class="mt-n3"
                  color="success"
                  v-model="item.date_debutProjet"
                  label="Date de debut"
                  append-icon="mdi-calendar-outline"
                  maxlength="10"
                  hint="AAAA/MM/JJ"
                  :disabled="!isEdit || item.id_user != id_user"
                  outlined
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  class="mt-n3"
                  color="success"
                  v-model="item.date_finProjet"
                  label="Date de fin"
                  append-icon="mdi-calendar-outline"
                  maxlength="10"
                  hint="AAAA/MM/JJ"
                  :disabled="!isEdit || item.id_user != id_user "
                  outlined
                />
              </v-col>
            </v-row>
            <v-textarea
              label="Description"
              outlined
              v-model="item.descriptionProjet"
              :disabled="!isEdit || item.id_user != id_user"
            ></v-textarea>
            <span v-if="isEdit && item.id_user == id_user" class="red--text">
              <li>
                <u>
                  <strong>Note: N'oubliez pas d'enregistrer vos modifications</strong>
                </u>
              </li>
            </span>
            <v-divider class="my-2" />
            <v-col cols="12">
              <v-row>
                <div class="text-left">
                  <v-btn
                    small
                    class="ml-1"
                    outlined
                    color="orange"
                    text
                    :disabled="id_user != item.id_user"
                    @click="isEdit =!isEdit"
                    v-if="!isEdit"
                  >
                    <v-icon left>mdi-pencil-outline</v-icon>
                    Modifier {{ item.nomProjet }}
                  </v-btn>
                  <v-btn
                    :disabled="id_user != item.id_user"
                    small
                    outlined
                    color="yellow"
                    text
                    @click="isEdit =!isEdit"
                    v-else
                  >
                    <v-icon left>mdi-pencil-off-outline</v-icon>Annuler modification
                  </v-btn>
                  <v-btn
                    small
                    v-if="isEdit"
                    outlined
                    color="success"
                    text
                    class="ml-1"
                    :disabled="id_user != item.id_user"
                    @click="updateProjet(item)"
                  >
                    <v-icon left>mdi-content-save-outline</v-icon>Sauvegarder
                  </v-btn>
                </div>
                <v-spacer />

                <div class="text-right">
                  <v-btn
                    small
                    color="red"
                    outlined
                    :disabled="id_user != item.id_user"
                    @click="dialogDeleteProjet(item)"
                    class="ml-3"
                  >
                    <v-icon left>mdi-delete-outline</v-icon>
                    Supprimer {{ item.nomProjet }}
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
  name: "Project",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    newProjet: {
      nomProjet: "",
      descriptionProjet: "",
      date_debutProjet: new Date().toISOString().substr(0, 10),
      date_finProjet: new Date().toISOString().substr(0, 10),
      id_user: null,
      id_entreprise: null
    },
    isDialogNewDateDebutOpen: false,
    isDialogNewDateFinOpen: false,
    isDialogDateDebutOpen: false,
    isDialogDateFinOpen: false,
    isDialogNewProjet: false,
    isDialogDeleteProjet: false,
    isDialogFacture: false,
    projetToDelete: [],
    expanded: [],
    loading: true,
    firstLoad: true,
    headers: [
      {
        text: "Nom projet",
        value: "nomProjet"
      },
      {
        text: "Date début",
        value: "date_debutProjet"
      },
      {
        text: "Date fin",
        value: "date_finProjet"
      },
      {
        text: "Collaborateur M/Mme",
        value: "lastname"
      }
    ],
    items: [],
    listeClients: [],
    isEdit: false,
    search: undefined
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
    /*----------------------*/
    if (this.id_entreprise == null || this.id_entreprise == undefined) return;

    axios
      .get("http://localhost:3000/projets/" + this.id_entreprise)
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          //console.log(response.data)
          var projets = response.data.projets;
          projets.forEach(projet => {
            this.items.push(projet);
          });
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
    saveNewProjet: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      this.newProjet.id_user = this.id_user;
      this.newProjet.id_entreprise = this.id_entreprise;

      axios
        .post(
          "http://localhost:3000/addProjet",
          qs.stringify(this.newProjet),
          config
        )
        .then(response => {
          this.successMessage("Le projet a bien été ajouté !");
          this.isDialogNewProjet = false;
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
    updateProjet: function(item = null) {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };
      //return console.log(item)

      axios
        .put(
          "http://localhost:3000/updateProjet/" + item.id,
          qs.stringify(item), //update du projet choisis
          config
        )
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
        });
    },
    deleteProjet: function() {
      this.isDialogDeleteProjet = false;
      axios
        .delete("http://localhost:3000/deleteProjet/" + this.projetToDelete.id)
        .then(response => {
          if (response.data.error == false) {
            console.log(
              "Le projet " + this.projetToDelete.nomProjet + " a été supprimé"
            );
            this.successMessage(
              "Le projet " +
                this.projetToDelete.nomProjet +
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
    dialogDeleteProjet: function(infos_projet = null) {
      this.isDialogDeleteProjet = true;
      this.projetToDelete = infos_projet;
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
