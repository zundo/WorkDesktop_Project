<template>
  <v-container id="register" fluid tag="section">
    <v-dialog v-model="isDialogDateNaissanceOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="blue lighten-1"
        v-model="user.date_naissance"
        reactive
        show-current
      >
        <v-btn
          class="ml-auto"
          outlined
          color="info"
          text
          @click="isDialogDateNaissanceOpen = false"
        >Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-row justify="center">
      <v-col cols="11">
        <v-slide-y-transition appear>
          <base-material-card color="info" max-width="100%" class="pa-3 pa-md-5 mx-auto" dark>
            <template v-slot:heading>
              <div class="text-center">
                <h1 class="display-3 font-weight-bold mb-2">
                  <v-icon large left>mdi-account-plus</v-icon>Inscription
                </h1>
              </div>
            </template>
            <v-stepper v-model="etape" vertical>
              <v-stepper-step :complete="etape > 1" step="1" color="info">Informations utilisateur</v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="mt-0" height="auto">
                  <v-col cols="12">
                    <div class="text-center">
                      <!--<v-btn
                        v-for="(social, i) in socials"
                        :key="i"
                        :color="social.iconColor"
                        class="mb-2 mr-1"
                        depressed
                        fab
                        small
                      >
                        <v-icon v-text="social.icon" />
                      </v-btn>
                      <v-divider />-->
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            color="info"
                            label="Nom*"
                            v-model="user.lastname"
                            prepend-inner-icon="mdi-face"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            color="info"
                            label="Prénom*"
                            v-model="user.firstname"
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
                            v-model="user.email"
                            prepend-inner-icon="mdi-email-outline"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            color="info"
                            label="Password*"
                            v-model="user.password"
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
                            v-model="user.website"
                            prepend-inner-icon="mdi-web"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            color="info"
                            prepend-inner-icon="mdi-format-list-bulleted-type"
                            v-model="user.sexe"
                            :items="items_Sexe"
                            label="Sexe*"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
                            v-model="user.date_naissance"
                            label="Date de naissance*"
                            prepend-icon="mdi-calendar-outline"
                            maxlength="10"
                            @click:prepend="isDialogDateNaissanceOpen = true"
                          />
                        </v-col>
                      </v-row>
                      <v-row class="mt-n4">
                        <v-col cols="12" md="6">
                          <v-text-field
                            color="info"
                            label="Poste*"
                            v-model="user.poste"
                            prepend-inner-icon="mdi-badge-account-outline"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
                            label="Numéro de téléphone*"
                            v-model="user.phone"
                            prepend-inner-icon="mdi-deskphone"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
                            label="Personne à contacter"
                            v-model="user.personne_contacter"
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
                            v-model="user.rue"
                            prepend-inner-icon="mdi-walk"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
                            label="Ville*"
                            v-model="user.ville"
                            prepend-inner-icon="mdi-walk"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
                            label="Code Postal*"
                            v-model="user.codePostal"
                            prepend-inner-icon="mdi-walk"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
                            label="Pays*"
                            v-model="user.pays"
                            prepend-inner-icon="mdi-walk"
                            clearable
                          />
                        </v-col>
                      </v-row>
                    </div>
                    <small>*Veuillez remplir les champs</small>
                  </v-col>
                </v-card>
                <v-btn color="info" @click="etape++" text outlined>
                  <v-icon left>mdi-check-circle-outline</v-icon>Continuer
                </v-btn>
              </v-stepper-content>
              <v-stepper-step :complete="etape > 2" step="2" color="info">Informations entreprise</v-stepper-step>
              <v-stepper-content step="2">
                <v-card class="mt-0" height="auto" v-if="!isDataCompagny">
                  <div class="text-center">
                    <v-row>
                      <v-col cols="11">
                        <v-text-field
                          color="info"
                          label="Numéro de Siret*"
                          v-model="entreprise.numSiret_ent"
                          prepend-inner-icon="mdi-sort-numeric-variant"
                          clearable
                          outlined
                          class="ml-5 mt-6"
                          maxlength="14"
                          hint="Numéro de SIRET entreprise"
                        />
                      </v-col>
                      <v-col cols="1">
                        <v-btn class="mt-8 mr-5" color="success" @click="getDataCompagny(entreprise.numSiret_ent)" depressed fab small>
                          <v-icon>mdi-check-circle-outline</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
                <v-card class="mt-0" height="auto" v-else>
                  <v-col cols="12">
                    <div class="text-center">
                      <v-row class="mt-n3">
                        <v-col cols="12" md="6">
                          <v-text-field
                            color="info"
                            label="Nom de l'entreprise*"
                            v-model="entreprise.nom_ent"
                            prepend-inner-icon="mdi-face"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            color="info"
                            label="Numéro de Siret*"
                            v-model="entreprise.numSiret_ent"
                            prepend-inner-icon="mdi-sort-numeric-variant"
                            clearable
                            maxlength="14"
                            hint="Numéro de SIRET entreprise"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            color="info"
                            label="Email de l'entreprise*"
                            v-model="entreprise.email_ent"
                            prepend-inner-icon="mdi-email-outline"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            color="info"
                            label="Téléphone de l'entreprise*"
                            v-model="entreprise.telephone_ent"
                            prepend-inner-icon="mdi-deskphone"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            color="info"
                            label="Site web entreprise"
                            v-model="entreprise.website_ent"
                            prepend-inner-icon="mdi-web"
                            clearable
                          />
                        </v-col>
                      </v-row>
                      <v-row class="mt-n4">
                        <v-col cols="12" md="4">
                          <v-text-field
                            color="info"
                            label="Rue*"
                            v-model="entreprise.rue_ent"
                            prepend-inner-icon="mdi-walk"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
                            label="Ville*"
                            v-model="entreprise.ville_ent"
                            prepend-inner-icon="mdi-walk"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-text-field
                            color="info"
                            label="Code Postal*"
                            v-model="entreprise.codePostal_ent"
                            prepend-inner-icon="mdi-walk"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-text-field
                            color="info"
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
                <v-btn class="mr-2" v-if="isNotFound==true && isDataCompagny==false" color="red lighten-1" @click="isDataCompagny=true" outlined>
                  <v-icon left>mdi-help-circle-outline</v-icon>SIRET Introuvable ?
                </v-btn>
                <v-btn class="mr-2" :disabled="!isDataCompagny" color="info" @click="etape++" text outlined>
                  <v-icon left>mdi-check-circle-outline</v-icon>Continuer
                </v-btn>
                <v-btn text color="error" @click="etape--" outlined>
                  <v-icon left>mdi-arrow-left-circle-outline</v-icon>Retour
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="etape > 3" step="3" color="info">Autres</v-stepper-step>

              <v-stepper-content step="3">
                <v-card
                  color="primary"
                  dark
                  v-if="loading === true"
                >
                  <v-card-text>
                    Chargement
                    <v-progress-linear
                      indeterminate
                      color="white"
                      class="mb-0"
                    ></v-progress-linear>
                  </v-card-text>
                </v-card>
                <v-card class="mt-0" height="auto" v-else>
                  <v-card-title>Merci pour toutes ces informations</v-card-title>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        color="info"
                        class="mx-3"
                        label="Comment avez-vous connu notre site ?"
                      />
                    </v-col>
                    <v-col cols="12">
                      <small class="mx-3">Une erreur ? revenez en arrière</small>
                    </v-col>
                  </v-row>
                </v-card>
                <v-btn class="mr-2" text outlined color="success" @click="registerPage">
                  <v-icon left>mdi-content-save-outline</v-icon>Inscription
                </v-btn>
                <v-btn text color="error" @click="etape--" outlined>
                  <v-icon left>mdi-arrow-left-circle-outline</v-icon>Retour
                </v-btn>
              </v-stepper-content>
            </v-stepper>
          </base-material-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
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
  name: "PagesRegister",

  components: {},

  data: () => ({
    etape: 1,
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    loading:false,
    isDialogDateNaissanceOpen: false,
    showPassword: false,
    items_Sexe: ["Homme", "Femme"],
    user: {
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
      isAdmin: ""
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
    /*socials: [
      {
        href: "#",
        icon: "mdi-facebook",
        iconColor: "#3B5998"
      },
      {
        href: "#",
        icon: "mdi-twitter",
        iconColor: "#1DA1F2"
      },
      {
        href: "#",
        icon: "mdi-google",
        iconColor: "#ea4c89"
      }
    ]*/
    isDataCompagny:false,
    isNotFound:false,
  }),
  methods: {
    getDataCompagny: function(siret = null){
      if(siret === null || siret === 0 || siret.length === 0) return this.errorMessage("Le SIRET ne peut pas être vide !");
      if(siret.length !== 14) return this.errorMessage("Le SIRET doit contenir 14 chiffres !")
      if(siret.match(/^[0-9]*$/gm) == null) return this.errorMessage("Le SIRET doit contenir seulement des chiffres !")

      axios
        .get('https://entreprise.data.gouv.fr/api/sirene/v3/etablissements/' + siret)
        .then(response => {
            if(response !== undefined || response !== null){
              this.entreprise.nom_ent=response.data.etablissement.unite_legale.denomination;
              this.entreprise.rue_ent=response.data.etablissement.geo_l4;
              this.entreprise.ville_ent=response.data.etablissement.libelle_commune;
              this.entreprise.codePostal_ent=response.data.etablissement.code_postal;
              this.entreprise.pays_ent="";
              this.entreprise.website_ent="";
              this.entreprise.email_ent="";
              this.entreprise.telephone_ent="";
              this.isDataCompagny = true;
            }
        })
        .catch(error => { console.log(error); this.errorMessage("Le SIRET est introuvable ou inconnu, réessayer !"); this.isNotFound=true;});
        //.finally(() => {});
    },
    registerPage: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let userDateNaissance = this.user.date_naissance;
      this.user.date_naissance = this.user.date_naissance.substring(8, 10) +'-' + this.user.date_naissance.substring(5, 7) +'-'+this.user.date_naissance.substring(0, 4);
      let payload = Object.assign(this.user, this.entreprise);
      var email = null;
      
      axios
        .post("http://localhost:3000/register", qs.stringify(payload), config)
        .then(response => {
          email = response.data.email;
          this.user.date_naissance = userDateNaissance;
          if ((email == undefined || email.length == 0 || email == null)) 
            return this.errorMessage("Erreur !")
          else{
            this.loading=true
            this.$router.push({
              name: "Connexion",
              params: { email: email }
            });  
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
          //throw error;
          this.user.date_naissance = userDateNaissance;
        })
        //.finally(() => {});
    },
    /*------------------------------------------------------ */
    infoMessage: function(message) {
      this.snackbarMessage = message;
      this.isinfo = true;
      this.isSnackbarOpened = true;
    },
    errorMessage: function(message) {
      this.snackbarMessage = message;
      this.isinfo = false;
      this.isSnackbarOpened = true;
    }
  }
};
</script>

<style lang="sass">
#register
  .v-list-item__subtitle
    -webkic-line-clamp: initial
    -webkit-box-orient: initial
</style>
