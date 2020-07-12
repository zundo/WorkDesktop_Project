<template>
  <v-container id="parametresE" fluid tag="section">
    <v-dialog v-model="isDialogSearchInfosEnt" persistent max-width="1000px">
      <v-card class="px-6">
        <v-card-title class="teal--text">
          Rechercher des informations entreprise en ligne
          <v-divider class="mt-5" />
          <v-icon aria-label="Close" @click="isDialogSearchInfosEnt = false">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-container>
            <div class="text-center">
              <v-row>
                <v-col cols="11">
                  <v-text-field
                    color="indigo"
                    label="Numéro de Siret*"
                    prepend-inner-icon="mdi-sort-numeric-variant"
                    clearable
                    outlined
                    v-model="searchSiret"
                    class="ml-5 mt-6"
                    maxlength="14"
                    hint="Numéro de SIRET entreprise"
                  />
                </v-col>
                <v-col cols="1">
                  <v-btn
                    class="mt-8 mr-5"
                    color="success"
                    @click="getDataCompagny(searchSiret)"
                    depressed
                    fab
                    small
                  >
                    <v-icon>mdi-check-circle-outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <v-row>
              <span v-if="isNotFound" class="red--text">
                <li>
                  <u>
                    <strong>Les informations de l'entreprise sont introuvable, veuillez les remplir manuellement</strong>
                  </u>
                </li>
              </span>
            </v-row>
            <v-divider class="my-4" />
            <v-row>
              <v-col cols="12" class="text-right">
                <v-btn
                  class="mr-1"
                  outlined
                  color="error"
                  text
                  @click="isDialogSearchInfosEnt = false"
                >Fermer</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="12">
        <base-material-card color="teal" class="mx-5">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <v-icon left>mdi-cog</v-icon>Paramètres entreprise
            </div>
            <div class="subtitle-1 font-weight-light">
              <v-icon left>mdi-cogs</v-icon>Complete les infos
            </div>
          </template>
          <v-card>
            <v-form>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      color="teal"
                      label="Nom de l'entreprise*"
                      v-model="entreprise.nom"
                      prepend-inner-icon="mdi-face"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      color="teal"
                      label="Numéro de Siret*"
                      v-model="entreprise.numSiret"
                      prepend-inner-icon="mdi-sort-numeric-variant"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                      maxlength="14"
                      hint="Numéro de SIRET entreprise"
                    />
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col cols="12" md="4">
                    <v-text-field
                      color="teal"
                      label="Email de l'entreprise*"
                      v-model="entreprise.email_entreprise"
                      prepend-inner-icon="mdi-email-outline"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      color="teal"
                      label="Téléphone de l'entreprise*"
                      v-model="entreprise.telephone"
                      prepend-inner-icon="mdi-deskphone"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      color="teal"
                      label="Site web entreprise"
                      v-model="entreprise.site_web"
                      prepend-inner-icon="mdi-web"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                </v-row>
                <v-row class="mt-n4">
                  <v-col cols="12" md="3">
                    <v-text-field
                      color="teal"
                      label="Rue*"
                      v-model="entreprise.rue"
                      prepend-inner-icon="mdi-walk"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      color="teal"
                      label="Ville*"
                      v-model="entreprise.ville"
                      prepend-inner-icon="mdi-walk"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      color="teal"
                      label="Code Postal*"
                      v-model="entreprise.codePostal"
                      prepend-inner-icon="mdi-walk"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      color="teal"
                      label="Pays*"
                      v-model="entreprise.pays"
                      prepend-inner-icon="mdi-walk"
                      :clearable="isEdit"
                      :disabled="!isEdit"
                    />
                  </v-col>
                  <v-col cols="12">
                    <span v-if="isEdit" class="red--text">
                      <li>
                        <u>
                          <strong>Note: N'oubliez pas d'enregistrer vos modifications</strong>
                        </u>
                      </li>
                    </span>
                    <v-divider class="my-4" />
                    <v-row>
                      <div class="text-left">
                        <v-btn
                          outlined
                          color="purple"
                          text
                          :disabled="!isAdmin"
                          v-if="isEdit"
                          @click="isDialogSearchInfosEnt = true"
                        >
                          <v-icon left>mdi-file-question-outline</v-icon>Rechercher les informations en ligne ?
                        </v-btn>
                      </div>
                      <v-spacer />
                      <div class="text-right">
                        <v-btn
                          class="mr-1"
                          outlined
                          color="orange"
                          text
                          :disabled="!isAdmin"
                          @click="isEdit =!isEdit"
                          v-if="!isEdit"
                        >
                          <v-icon left>mdi-pencil-outline</v-icon>Modification
                        </v-btn>
                        <v-btn
                          class="mr-1"
                          outlined
                          color="yellow"
                          text
                          @click="isEdit =!isEdit"
                          :disabled="!isAdmin"
                          v-else
                        >
                          <v-icon left>mdi-pencil-off-outline</v-icon>Annuler modification
                        </v-btn>
                        <v-btn
                          v-if="isEdit"
                          outlined
                          color="success"
                          text
                          @click="updateEntreprise"
                          :disabled="!isAdmin"
                        >
                          <v-icon left>mdi-content-save-outline</v-icon>Sauvegarder
                        </v-btn>
                      </div>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card>
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
  name: "Parametres-entreprise",
  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    entreprise: {},
    isEdit: false,
    isDialogSearchInfosEnt: false,
    searchSiret: null,
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

    if (this.id_entreprise == null || this.id_entreprise == undefined) return;

    axios
      .get("http://localhost:3000/entreprise/" + this.id_entreprise) //infos de l'entreprise
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          this.entreprise = response.data.entreprise[0];
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
    updateEntreprise: function() {
      this.isEdit = false;
      /*--------------------------------------------------- */
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let payload = {
        numSiret_ent: this.entreprise.numSiret,
        nom_ent: this.entreprise.nom,
        rue_ent: this.entreprise.rue,
        codePostal_ent: this.entreprise.codePostal,
        ville_ent: this.entreprise.ville,
        pays_ent: this.entreprise.pays,
        email_ent: this.entreprise.email_entreprise,
        telephone_ent: this.entreprise.telephone,
        website_ent: this.entreprise.site_web
      };
      //return console.log(payload)

      axios
        .put(
          "http://localhost:3000/updateEntreprise/" + this.id_entreprise,
          qs.stringify(payload),
          config
        ) //update de l'entreprise
        .then(response => {
          if (this.verifyResponseOk(response.data)) {
            if (response.data.error == false)
              this.successMessage("Sauvegarde des modifications effectuée !");
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
    getDataCompagny: function(siret = null) {
      if (
        siret === null ||
        siret === 0 ||
        siret.length === 0 ||
        siret === undefined
      )
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
            this.entreprise.numSiret = siret;
            this.entreprise.nom =
              response.data.etablissement.unite_legale.denomination;
            this.entreprise.rue = response.data.etablissement.geo_l4;
            this.entreprise.ville = response.data.etablissement.libelle_commune;
            this.entreprise.codePostal =
              response.data.etablissement.code_postal;
            this.isDialogSearchInfosEnt = false;
          }
        })
        .catch(error => {
          console.log(error);
          this.errorMessage("Le SIRET est introuvable ou inconnu, réessayer !");
          this.isNotFound = true;
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
