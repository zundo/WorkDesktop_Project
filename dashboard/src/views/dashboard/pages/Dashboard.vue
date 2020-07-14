<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12" lg="6" md="6">
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <h4 class="card-title font-weight-light mt-2 ml-2">Données Gestionnaire</h4>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">Entreprise</p>
          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">Updated</span>
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col cols="12" lg="6" md="6">
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="success"
          type="Line"
        >
          <h3 class="card-title font-weight-light mt-2 ml-2">Données Gestionnaire</h3>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">Entreprise</p>
          <template v-slot:actions>
            <v-icon class="mr-1" small>mdi-clock-outline</v-icon>
            <span class="caption grey--text font-weight-light">Updated</span>
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col cols="12" md="6">
        <collaborateur></collaborateur>
      </v-col>
      <v-col cols="12" md="6">
        <facture></facture>
      </v-col>
      <v-col cols="12" md="6">
        <client></client>
      </v-col>
      <v-col cols="12" md="6">
        <projet></projet>
      </v-col>
      <v-col cols="12" md="12">
        <callendrier></callendrier>
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
import collaborateur from "./Collaborateurs";
import callendrier from "./Calendar";
import facture from "./Accounting";
import client from "./Clients";
import projet from "./Project";

export default {
  name: "DashboardDashboard",
  components: {
    collaborateur,
    callendrier,
    facture,
    client,
    projet
  },
  data() {
    return {
      isSuccess: false,
      isSnackbarOpened: false,
      snackbarMessage: "",
      /*-------------------------- */
      pie: {
        data: {
          series: [62, 32, 6]
        },
        options: {
          labelInterpolationFnc: value => `${value}%`
        }
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["Collaborateurs", "Clients", "Factures", "Projets"],
          series: [[9, 4, 8, 6]]
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0
          }),
          low: 0,
          high: 20,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      emailsSubscriptionChart: {
        data: {
          labels: ["Collaborateurs", "Clients", "Factures", "Projets"],
          series: [[9, 4, 8, 6]]
        },
        options: {
          axisX: {
            showGrid: false
          },
          low: 0,
          high: 20,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      }
    };
  },
  mounted() {
    if (
      this.id_user != undefined &&
      this.id_user !== 0 /*localStorage.getItem("token") != null*/
    ) {
      console.log("idUser: " + this.id_user);
    } else return this.$router.push({ name: "Connexion" });
  },
  computed: {
    id_user() {
      return this.$store.state.id_user;
    }
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
