<template>
  <v-container id="upgrade" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="display-3 font-weight-light mb-4">
              <v-icon left large>mdi-account-group</v-icon>L' équipe Inglorius
            </div>

            <div class="subtitle-1 font-weight-light">
              Le formulaire ci-contre est à votre disposition pour toutes demandes d’informations.
              De la simple demande de renseignements ou pour une question technique, ce formulaire est fait pour vous.
            </div>
          </template>
          <v-col cols="12">
            <div class="font-weight-light mb-3 mt-3">
              <v-chip color="primary">
                <v-icon left>mdi-walk</v-icon>ADRESSE
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              <base-card class="pa-1">17 rue Inglorius 75000 Paris, France</base-card>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="font-weight-light mb-3 mt-3">
              <v-chip color="primary">
                <v-icon left>mdi-deskphone</v-icon>TÉLÉPHONE
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              <base-card class="pa-1">01.23.45.67.89</base-card>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="font-weight-light mb-3 mt-3">
              <v-chip color="primary">
                <v-icon left>mdi-account-check</v-icon>SUPPORT
              </v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              <base-card class="pa-1">support@inglorius.fr</base-card>
            </div>
          </v-col>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="8">
        <base-material-card icon="mdi-clipboard-text" title="Contactez le support" color="primary">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="contact.nom" label="Nom*" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field clearable v-model="contact.prenom" label="Prénom*" />
                </v-col>

                <v-col cols="12" md="6" class="mt-n5">
                  <v-text-field clearable v-model="contact.email" label="Adresse E-mail*" />
                </v-col>

                <v-col cols="12" md="6" class="mt-n5">
                  <v-text-field clearable v-model="contact.numero_tel" label="Numero de téléphone*" />
                </v-col>

                <v-col cols="12" class="mt-n5">
                  <v-text-field clearable v-model="contact.objet" label="Objet*" />
                </v-col>

                <v-col cols="12" class="mt-n5">
                  <v-textarea clearable v-model="contact.message" label="Comment pouvons-nous vous aider ?*" />
                </v-col>
                <small>*Veuillez remplir les champs</small>

                <v-col cols="12" class="text-right">
                  <v-btn color="primary" class="mr-0" @click="sendMailSupport(contact)"><v-icon color="white" left>mdi-checkbox-marked-circle-outline</v-icon>Envoyer</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
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
  name: "DashboardDashboard",
  data() {
    return {
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
      contact:{
        nom:"",
        prenom:"",
        email:"",
        numero_tel:"",
        objet:"",
        message:""
      }
    };
  },
  mounted() {
    if (this.id_user != undefined && this.id_user !== 0) {
      console.log("idUser: " + this.id_user);
    } else return this.$router.push({ name: "Connexion" });
  },
  computed: {
    id_user() {
      return this.$store.state.id_user;
    }
  },
  methods: {
    sendMailSupport: function(contact){
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };
      return this.errorMessage("IN PROGRESS");
      axios
        .post(
          "http://localhost:3000/mailSupport",
          qs.stringify(contact),
          config
        )
        .then(response => {
          this.successMessage("Le mail au support a bien été envoyer !");
          console.log("Le mail au support a bien été envoyer !");
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
  },
};
</script>

<style lang="sass">
#upgrade
  .v-data-table
    th, td
      border: none !important
</style>
