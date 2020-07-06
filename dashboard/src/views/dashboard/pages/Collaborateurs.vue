<template>
  <v-container id="collaborateurs" tag="section" fluid>
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
    <v-dialog
      v-model="isDialogNewCollaborateur"
      persistent
      max-width="1000px"
      overlay-opacity="0.8"
    >
      <v-card class="px-6" outlined>
        <v-card-title class="info--text">
          Nouveau Collaborateur
          <v-icon aria-label="Close" @click="isDialogNewCollaborateur = false">mdi-close</v-icon>
        </v-card-title>
        <v-col cols="12">
          <div class="text-center">
            <v-divider />
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  color="info"
                  label="Nom*"
                  v-model="collaborateur.lastname"
                  prepend-inner-icon="mdi-face"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  color="info"
                  label="Prénom*"
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
                  label="Email*"
                  v-model="collaborateur.email"
                  prepend-inner-icon="mdi-email-outline"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  color="info"
                  label="Password*"
                  v-model="collaborateur.password"
                  prepend-inner-icon="mdi-lock-outline"
                  clearable
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
                  label="Sexe*"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  color="info"
                  v-model="collaborateur.date_naissance"
                  label="Date de naissance*"
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
                  label="Poste*"
                  v-model="collaborateur.poste"
                  prepend-inner-icon="mdi-badge-account-outline"
                  clearable
                />
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  color="info"
                  label="Numéro de téléphone*"
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
                  label="Rue*"
                  v-model="collaborateur.rue"
                  prepend-inner-icon="mdi-walk"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  color="info"
                  label="Ville*"
                  v-model="collaborateur.ville"
                  prepend-inner-icon="mdi-walk"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  color="info"
                  label="Code Postal*"
                  v-model="collaborateur.codePostal"
                  prepend-inner-icon="mdi-walk"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  color="info"
                  label="Pays*"
                  v-model="collaborateur.pays"
                  prepend-inner-icon="mdi-walk"
                  clearable
                />
              </v-col>
            </v-row>
          </div>
          <v-col cols="12">
            <!--<v-switch
            v-model="switch1"
            :label="`Switch 1: ${switch1.toString()}`"
            ></v-switch>-->
            <v-switch
              class="ml-n3 my-n2"
              v-model="collaborateur.isAdmin"
              label="Super Admin ?"
              :color="collaborateur.isAdmin ? 'info' : 'error'"
            ></v-switch>
          </v-col>
          <small>*Veuillez remplir les champs</small>
          <v-col cols="12" class="text-right">
            <v-btn
              class="mr-1"
              outlined
              color="error"
              text
              @click="isDialogNewCollaborateur = false"
            >Fermer</v-btn>
            <v-btn outlined color="success" text @click="saveNewCollaborateur">Sauvegarder</v-btn>
          </v-col>
        </v-col>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogDeleteCollaborateur" width="500" overlay-opacity="0.8">
      <v-card outlined>
        <v-card-title>
          Supprimer le collaborateur {{ collaborateurToDelete.firstname }} {{ collaborateurToDelete.lastname }} ?
          <v-divider class="my-2" />
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogDeleteCollaborateur=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="deleteCollaborateur" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-material-card color="info" icon="mdi-account-group-outline" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Collaborateurs</div>
      </template>

      <v-row class="mt-8 mr-1">
        <v-btn color="info" @click="openDialogNewCollaborateur" class="ml-3" :disabled="!isAdmin">
          <v-icon left>mdi-account-plus-outline</v-icon>Nouveau Collaborateur
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
        :sort-by="['lastname']"
        :sort-desc="[false]"
        show-expand
        single-expand
        item-key="email"
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <th class="pr-1">
            <v-chip color="purple lighten-1" v-if="item.isAdmin">Admin</v-chip>
          </th>
          <td :colspan="headers.length">
            <v-btn small color="blue" @click="PageInfosCollaborateur(item)">
              <v-icon left>mdi-card-account-details-outline</v-icon>
              Informations {{ item.firstname }}
            </v-btn>
            <v-btn
              :disabled="!isAdmin || item.isAdmin == 1"
              small
              color="red"
              @click="dialogDeleteCollaborateur(item)"
              class="ml-3"
            >
              <v-icon left>mdi-account-remove-outline</v-icon>
              Supprimer {{ item.firstname }}
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
  name: "Collaborateurs",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    isDialogDateNaissanceOpen: false,
    showPassword: false,
    items_Sexe: ["Homme", "Femme"],
    collaborateur: {
      email: "",
      password: "",
      lastname: "",
      firstname: "",
      date_naissance: new Date().toISOString().substr(0, 10),
      sexe: "",
      rue: "",
      ville: "",
      codePostal: "",
      pays: "",
      website: "",
      personne_contacter: "",
      phone: "",
      poste: "",
      isAdmin: false,
      id_entreprise: ""
    },
    isDialogNewCollaborateur: false,
    isDialogDeleteCollaborateur: false,
    collaborateurToDelete: [],
    expanded: [],
    loading: true,
    firstLoad: true,
    headers: [
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
    //https://jsonplaceholder.typicode.com/users
    
    if(this.id_entreprise == null || this.id_entreprise == undefined) return

    axios
      .get("http://localhost:3000/users/" + this.id_entreprise) //tous les users de l entreprise
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          //console.log(response.data);
          var users = response.data.users;
          users.forEach(user => {
            this.items.push(user);
          });
          //console.log("data: "+JSON.stringify(this.items))
          setTimeout(() => {
            this.loading = false;
            this.firstLoad = false;
          }, 1000);
          console.log("OK");
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
        //this.collaborateur.date_naissance = collaborateurDateNaissance;
      });
  },
  methods: {
    saveNewCollaborateur: function() {
      //this.isDialogNewCollaborateur = false;
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

      this.collaborateur.id_entreprise = this.id_entreprise; //id_entreprise provenant du store
      let payload = this.collaborateur;
      //return console.log(JSON.stringify(payload));

      axios
        .post(
          "http://localhost:3000/addCollaborateur",
          qs.stringify(payload),
          config
        )
        .then(response => {
          this.successMessage("Le collaborateur a bien été ajouté !");
          console.log("Le collaborateur a bien été ajouté !");
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
          this.collaborateur.date_naissance = collaborateurDateNaissance;
        });
    },
    openDialogNewCollaborateur: function() {
      this.isDialogNewCollaborateur = true;
      //mettre les valeurs des inputs du dialog a vide
    },
    deleteCollaborateur: function() {
      this.isDialogDeleteCollaborateur = false;

      axios
        .delete(
          "http://localhost:3000/deleteCollaborateur/" +
            this.collaborateurToDelete.id
        )
        .then(response => {
          if (response.data.error == false) {
            console.log(response.data.message);
            this.successMessage(
              "Le collaborateur " +
                this.collaborateurToDelete.firstname +
                " " +
                this.collaborateurToDelete.lastname +
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
    dialogDeleteCollaborateur: function(infos_collaborateur) {
      this.isDialogDeleteCollaborateur = true;
      this.collaborateurToDelete = infos_collaborateur;
    },
    PageInfosCollaborateur: function(infos_collaborateur) {
      this.$router.push({
        name: "Informations-Collaborateur",
        params: { infos_collaborateur: infos_collaborateur }
      });
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
