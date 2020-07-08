<template>
  <v-container id="clients" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="indigo" >
          <template v-slot:heading>
            <div
              class="display-2 font-weight-light"
            ><v-icon large>mdi-account-box-outline</v-icon> {{ client.firstname }} {{ client.lastname }}</div>
          </template>
          <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table"></v-skeleton-loader>
          <v-simple-table dense v-else>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Nom de l'entreprise</td>
                  <td>{{ client.nom }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ client.email }}</td>
                </tr>
                <tr>
                  <td>Numéro de téléphone</td>
                  <td>{{ client.phone }}</td>
                </tr>
                <tr>
                  <td>Sexe</td>
                  <td>{{ client.sexe }}</td>
                </tr>
                <tr>
                  <td>Date de naissance</td>
                  <td>{{ client.date_naissance }}</td>
                </tr>
                <tr>
                  <td>Poste</td>
                  <td>{{ client.poste }}</td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>{{ client.rue }}, {{ client.ville }}</td>
                </tr>
                <tr>
                  <td>Code postal</td>
                  <td><span v-if="client.codePostal !== 0">{{ client.codePostal }}</span><span v-else>Inconnu</span></td>
                </tr>
                <tr>
                  <td>Pays</td>
                  <td>{{ client.pays }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table"></v-skeleton-loader>
        <base-material-card
          v-else
          icon="mdi-domain" 
          title="Infos Entreprise"
          color="indigo"
        >
          <v-row>
            <v-card-text>
              <v-col cols="12">
                <h6 class="display-2 mb-n3 grey--text">
                  <v-icon large left color="info">mdi-office-building</v-icon>
                  <span>Entreprise : {{ client.nom }}</span><!--nom de l entreprise-->
                </h6>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="orange darken-2">mdi-email-outline</v-icon>
                  Email entreprise : {{ client.email_entreprise }}
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="indigo lighten-1">mdi-deskphone</v-icon>
                  Numéro entreprise : {{ client.telephone }}
                </p>
              </v-col>
            </v-card-text>
          </v-row>
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
export default {
  name: "InfosClient",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    loading: true,
    firstLoad: true,
    client: {}
  }),
  computed: {
    id_user() {
        return this.$store.state.id_user
    },
  },
  mounted() {
    //id_user de l'utilisateur connecter
    if(this.id_user != undefined && this.id_user !== 0){
      console.log('idUser: '+this.id_user)
    }else return this.$router.push({ name: "Connexion" });
    /*--------------------------------------------------- */
    
    //infos du client choisi
    if (
      this.$route.params.infos_client != null &&
      this.$route.params.infos_client != 0
    ) {
      this.client = this.$route.params.infos_client;
      setTimeout(() => {
        this.loading = false;
        this.firstLoad = false;
      }, 1000);
    }else return this.$router.push({ name: "Clients" });
  },
  methods: {
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
