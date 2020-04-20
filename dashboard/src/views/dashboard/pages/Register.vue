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
            <v-stepper v-model="strep" vertical>
              <v-stepper-step :complete="strep > 1" step="1" color="info">Informations utilisateur</v-stepper-step>

              <v-stepper-content step="1">
                <v-card class="mt-0" height="auto">
                  <v-col cols="12">
                    <div class="text-center">
                      <v-btn
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
                      <v-divider />

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
                        <v-col cols="12" md="4">
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
                        <v-col cols="12" md="2">
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
                <v-btn color="info" @click="strep++" text outlined>
                  <v-icon left>mdi-check-circle-outline</v-icon>Continuer
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="strep > 2" step="2" color="info">Informations entreprise</v-stepper-step>

              <v-stepper-content step="2">
                <v-card class="mt-0" height="auto">
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
                <v-btn class="mr-2" color="info" @click="strep++" text outlined>
                  <v-icon left>mdi-check-circle-outline</v-icon>Continuer
                </v-btn>
                <v-btn text color="error" @click="strep--" outlined>
                  <v-icon left>mdi-arrow-left-circle-outline</v-icon>Retour
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="strep > 3" step="3" color="info">Autres</v-stepper-step>

              <v-stepper-content step="3">
                <v-card class="mt-0" height="auto">
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
                <v-btn class="mr-2" text outlined color="success" @click="connexionPage">
                  <v-icon left>mdi-content-save-outline</v-icon>Inscription
                </v-btn>
                <v-btn text color="error" @click="strep--" outlined>
                  <v-icon left>mdi-arrow-left-circle-outline</v-icon>Retour
                </v-btn>
              </v-stepper-content>
            </v-stepper>
          </base-material-card>
        </v-slide-y-transition>
        <v-snackbar v-model="isSnackbarOpened" :color="isinfo ? 'info' : 'error'">
          <v-icon v-if="!isinfo" color="white">mdi-alert-outline</v-icon>
          {{snackbarMessage}}
          <v-btn dark icon @click="isSnackbarOpened = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import qs from "qs";

export default {
  name: "PagesRegister",

  components: {},

  data: () => ({
    isinfo: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    isDialogDateNaissanceOpen: false,
    showPassword: false,
    /*-------------------------- */
    strep: 1,
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
      poste: ""
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
    sections: [
      {
        icon: "mdi-chart-timeline-variant",
        iconColor: "info",
        title: "Marketing",
        text: `We've created the marketing campaign of the website. It was a very interesting collaboration.`
      },
      {
        icon: "mdi-code-tags",
        iconColor: "secondary",
        title: "Fully Coded in HTML5",
        text: `We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub.`
      },
      {
        icon: "mdi-account-multiple",
        iconColor: "cyan",
        title: "Built Audience",
        text:
          "There is also a Fully Customizable CMS Admin Dashboard for this product."
      }
    ],
    socials: [
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
    ]
  }),
  methods: {
    connexionPage: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      /*let payload={
          email:"mou24@mou24.mou27",
          password:"mou8",
          lastname:"nirkos8",
          firstname:"mounir8",
          date_naissance:"17-05-1998",
          sexe:"Homme",
          rue:"17 rue alexandre",
          ville:"Gonesse",
          codePostal:"95500",
          pays:"France",
          phone:"0614587425",
          poste:"Developpeur"
        };*/

      let userDateNaissance = this.user.date_naissance.substring(8, 10) +'-' + this.user.date_naissance.substring(5, 7) +'-'+this.user.date_naissance.substring(0, 4);
      this.user.date_naissance = this.user.date_naissance.substring(8, 10) +'-' + this.user.date_naissance.substring(5, 7) +'-'+this.user.date_naissance.substring(0, 4);

      let payload = Object.assign(this.user, this.entreprise);
      //return console.log(JSON.stringify(payload));

      let id_user;
      axios
        .post("http://localhost:3000/register", qs.stringify(payload), config)
        .then(response => {
          //if (this.verifyResponseOk(response.data)) {
          //console.log(JSON.stringify(response.data))
          id_user = response.data.id_user;
          //}
        })
        .catch(error => {
          console.log(
            "ERROR " +
              JSON.stringify(error.response.status) +
              " : " +
              JSON.stringify(error.response.data.message)
          );
          return this.errorMessage(
            "ERROR " +
              JSON.stringify(error.response.status) +
              " : " +
              JSON.stringify(error.response.data.message)
          );
          //throw error;
          this.user.date_naissance = userDateNaissance;
        })
        .then(() => {
          if (id_user != undefined && id_user.length != 0){
            return this.$router.push({
              name: "Accueil",
              params: { userId: id_user }
            });            
          }else{
            this.user.date_naissance = userDateNaissance;
          }
        });
    },
    /*------------------------------------------------------ */
    /*verifyResponseOk: function(responseData) {
      var tmpStr = JSON.stringify(responseData);
      if (tmpStr.startsWith('"Error:')) {
        this.errorMessage(responseData.substring(7)); // suppress "Error:
        return false;
      }
      return true;
    },*/
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
