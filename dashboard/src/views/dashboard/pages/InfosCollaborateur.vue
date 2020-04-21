<template>
  <v-container id="collaborateurs" fluid tag="section">
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-twitter"
          title="Followers"
          value="+245"
          sub-icon="mdi-clock"
          sub-text="Just Updated"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="orange"
          icon="mdi-poll"
          title="Website Visits"
          value="75.521"
          sub-icon="mdi-tag"
          sub-text="Tracked from Google Analytics"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="success"
          icon="mdi-store"
          title="Revenue"
          value="$ 34,245"
          sub-icon="mdi-calendar"
          sub-text="Last 24 Hours"
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="red"
          icon="mdi-sofa"
          title="Bookings"
          value="184"
          sub-icon="mdi-alert"
          sub-icon-color="red"
          sub-text="Get More Space..."
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <base-material-card color="info">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">{{ collaborateur.firstname }} {{ collaborateur.lastname }}</div>
            <div class="subtitle-1 font-weight-light">{{ collaborateur.id }}</div>
          </template>
          <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table"></v-skeleton-loader>
          <v-simple-table dense v-else>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Nom de l'entreprise</td>
                  <td>{{ collaborateur.id_entreprise }}</td>
                </tr>
                <tr>
                  <td>Personne à contacter</td>
                  <td>{{ collaborateur.personne_contacter }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ collaborateur.email }}</td>
                </tr>
                <tr>
                  <td>Numéro de téléphone</td>
                  <td>{{ collaborateur.phone }}</td>
                </tr>
                <tr>
                  <td>Sexe</td>
                  <td>{{ collaborateur.sexe }}</td>
                </tr>
                <tr>
                  <td>Date de naissance</td>
                  <td>{{ collaborateur.date_naissance }}</td>
                </tr>
                <tr>
                  <td>Poste</td>
                  <td>{{ collaborateur.poste }}</td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>{{ collaborateur.rue }}, {{ collaborateur.ville }}</td>
                </tr>
                <tr>
                  <td>Code postal</td>
                  <td>{{ collaborateur.codePostal }}</td>
                </tr>
                <tr>
                  <td>Pays</td>
                  <td>{{ collaborateur.pays }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="4">
        <base-material-card
          class="v-card-profile"
          avatar="https://upload.wikimedia.org/wikipedia/commons/a/a6/Anonymous_emblem.svg"
        >
          <v-row>
            <v-col cols="12">
              <h4
                class="display-3 font-weight-light mb-2 text-md-center info--text"
              >{{ collaborateur.firstname }} {{ collaborateur.lastname }}</h4>
            </v-col>
            <v-card-text>
              <v-col cols="12">
                <h6 class="display-2 mb- grey--text">
                  <v-icon large left color="info">mdi-web</v-icon>Site Web:
                  <a href="collaborateur.site_web">{{ collaborateur.site_web }}</a>
                </h6>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="blue">mdi-skype</v-icon>
                  Skype: {{ collaborateur.firstname }}.skype
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="indigo">mdi-linkedin</v-icon>
                  Linkedin: {{ collaborateur.firstname }}.linkedin
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="indigo">mdi-facebook</v-icon>
                  Facebook: {{ collaborateur.firstname }}.facebook
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light grey--text">
                  <v-icon large left color="blue">mdi-twitter</v-icon>
                  Twitter: {{ collaborateur.firstname }}.twitter
                </p>
              </v-col>
            </v-card-text>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
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
  name: "InfosClient",

  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    loading: true,
    firstLoad: true,
    collaborateur:{}
  }),
  mounted() {
    if (this.$route.params.infos_collaborateur != null && this.$route.params.infos_collaborateur != 0) {
      //console.log("UserID: " + this.$route.params.infos_collaborateur.id);
      this.collaborateur = this.$route.params.infos_collaborateur;
      var userId = this.collaborateur.id;
      /*recuperation du nom de l entreprise */
      //console.log(JSON.stringify(this.collaborateur))
      setTimeout(() => {
        this.loading = false;
        this.firstLoad = false;
      }, 1000);
      console.log("OK");
    } else return this.$router.push({ name: "Collaborateurs" });

    
    /*axios
      .get("https://jsonplaceholder.typicode.com/users/" + userId)
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          //this.person.push(response.data);
          //this.person.splice(0, 1, response.data);

        }
      })
      .catch(error => this.errorMessage("Network ERROR: " + error))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
          this.firstLoad = false;
        }, 1000);
        console.log("OK");
      });*/
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
