<template>
  <v-container id="clients" fluid tag="section">
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
        <base-material-card color="indigo">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">{{ person[0].name }}</div>
            <div class="subtitle-1 font-weight-light">{{ person[0].username }}</div>
          </template>
          <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table"></v-skeleton-loader>
          <v-simple-table dense v-else>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Nom de l'entreprise</td>
                  <td>{{ person[0].company.name }}</td>
                </tr>
                <tr>
                  <td>Personne à contacter</td>
                  <td>06.06.06.06.06</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ person[0].email }}</td>
                </tr>
                <tr>
                  <td>Numéro de téléphone</td>
                  <td>{{ person[0].phone }}</td>
                </tr>
                <tr>
                  <td>Fax</td>
                  <td>01.02.03.04.05</td>
                </tr>
                <tr>
                  <td>Adresse</td>
                  <td>{{ person[0].address.street }}, {{ person[0].address.suite }}</td>
                </tr>
                <tr>
                  <td>Ville</td>
                  <td>{{ person[0].address.city }}</td>
                </tr>
                <tr>
                  <td>Code postal</td>
                  <td>{{ person[0].address.zipcode }}</td>
                </tr>
                <tr>
                  <td>Pays</td>
                  <td>Unknown</td>
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
                class="display-3 font-weight-light mb-2 text-md-center indigo--text"
              >{{ person[0].name }}</h4>
            </v-col>
            <v-card-text>
              <v-col cols="12">
                <h6 class="display-2 mb- grey--text">
                  <v-icon large left color="info">mdi-web</v-icon>Site Web:
                  <a href="person[0].website">{{ person[0].website }}</a>
                </h6>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="blue">mdi-skype</v-icon>
                  Skype: {{ person[0].username }}.skype
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="indigo">mdi-linkedin</v-icon>
                  Linkedin: {{ person[0].username }}.linkedin
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light mb-n3 grey--text">
                  <v-icon large left color="indigo">mdi-facebook</v-icon>
                  Facebook: {{ person[0].username }}.facebook
                </p>
              </v-col>
              <v-col cols="12">
                <p class="font-weight-light grey--text">
                  <v-icon large left color="blue">mdi-twitter</v-icon>
                  Twitter: {{ person[0].username }}.twitter
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
    person: [
      {
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
          geo: {
            lat: "",
            lng: ""
          }
        },
        phone: "",
        website: "",
        company: {
          name: "",
          catchPhrase: "",
          bs: ""
        }
      }
    ]
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
    
    //userId du client choisi
    if (this.$route.params.userId != null && this.$route.params.userId != 0) {
      console.log("UserID: " + this.$route.params.userId);
      var userId = this.$route.params.userId;
    } else return this.$router.push({ name: "Clients" });

    axios
      .get("https://jsonplaceholder.typicode.com/users/" + userId)
      .then(response => {
        if (this.verifyResponseOk(response.data)) {
          //this.person.push(response.data);
          this.person.splice(0, 1, response.data);
        }
      })
      .catch(error => this.errorMessage("Network ERROR: " + error))
      .finally(() => {
        setTimeout(() => {
          this.loading = false;
          this.firstLoad = false;
        }, 1000);
        console.log("OK");
      });
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
