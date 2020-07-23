<template>
  <v-container id="calendar" fluid tag="section">
    <v-dialog v-model="isDialogDateDebutOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="red lighten-1"
        v-model="evenement.dateDebut"
        reactive
        show-current
      >
        <v-btn class="ml-auto" outlined color="red" text @click="isDialogDateDebutOpen = false">Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogDateFinOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="red lighten-1"
        v-model="evenement.dateFin"
        reactive
        show-current
      >
        <v-btn class="ml-auto" outlined color="red" text @click="isDialogDateFinOpen = false">Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogEditDateDebutOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="red lighten-1"
        v-model="infoEvenement.start"
        reactive
        show-current
      >
        <v-btn
          class="ml-auto"
          outlined
          color="red"
          text
          @click="isDialogEditDateDebutOpen = false"
        >Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogEditDateFinOpen" width="300px" overlay-opacity="0.8">
      <v-date-picker
        scrollable
        color="red lighten-1"
        v-model="infoEvenement.end"
        reactive
        show-current
      >
        <v-btn class="ml-auto" outlined color="red" text @click="isDialogEditDateFinOpen = false">Ok</v-btn>
      </v-date-picker>
    </v-dialog>
    <v-dialog v-model="isDialogNewEvent" persistent max-width="1000px" overlay-opacity="0.8">
      <v-card class="px-6" outlined>
        <v-card-title class="red--text">
          Création d'un Evenement
          <v-icon aria-label="Close" @click="isDialogNewEvent = false">mdi-close</v-icon>
        </v-card-title>
        <v-col cols="12">
          <div class="text-center">
            <v-divider class="mb-5" />
            <v-row class="mt-n3">
              <v-col cols="12">
                <v-text-field
                  color="red"
                  v-model="evenement.nomEvent"
                  label="Nom"
                  prepend-icon="mdi-clipboard-text-multiple"
                  maxlength="20"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  outlined
                  color="red"
                  class="mt-n3"
                  label="Description"
                  v-model="evenement.description"
                  prepend-icon="mdi-ballot-outline"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="mt-n3">
                <v-text-field
                  color="red"
                  v-model="evenement.dateDebut"
                  label="Date de début"
                  prepend-icon="mdi-calendar-outline"
                  maxlength="10"
                  @click:prepend="isDialogDateDebutOpen = true"
                  hint="AAAA/MM/JJ"
                  outlined
                />
              </v-col>
            </v-row>
            <v-row class="mt-n3">
              <v-col cols="12">
                <v-text-field
                  color="red"
                  v-model="evenement.dateFin"
                  label="Date de fin"
                  prepend-icon="mdi-calendar-outline"
                  maxlength="10"
                  @click:prepend="isDialogDateFinOpen = true"
                  hint="AAAA/MM/JJ"
                  outlined
                />
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" class="text-right">
          <v-divider class="my-4" />

          <v-btn class="mr-1" outlined color="error" text @click="isDialogNewEvent = false">Fermer</v-btn>
          <v-btn outlined color="success" text @click="saveNewEvent">Sauvegarder</v-btn>
        </v-col>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isDialogEvenement" persistent max-width="1000px">
      <v-card class="px-6">
        <v-card-title class="red--text">
          Information Evenement
          <v-divider class="my-5" />
          <v-icon aria-label="Close" @click="isDialogEvenement = false">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-container>
            <v-col cols="12">
              <div class="text-center">
                <v-divider class="mb-5" />
                <v-row class="mt-n3">
                  <v-col cols="12">
                    <v-text-field
                      color="red"
                      v-model="infoEvenement.name"
                      label="Nom"
                      prepend-icon="mdi-clipboard-text-multiple"
                      maxlength="20"
                      :disabled="!isEdit"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      color="red"
                      class="mt-n3"
                      label="Description"
                      :disabled="!isEdit"
                      v-model="infoEvenement.description"
                      prepend-icon="mdi-ballot-outline"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="mt-n3">
                    <v-text-field
                      color="red"
                      v-model="infoEvenement.start"
                      label="Date de début"
                      prepend-icon="mdi-calendar-outline"
                      maxlength="10"
                      @click:prepend="isDialogEditDateDebutOpen = true"
                      hint="AAAA/MM/JJ"
                      :disabled="!isEdit"
                    />
                  </v-col>
                </v-row>
                <v-row class="mt-n3">
                  <v-col cols="12">
                    <v-text-field
                      color="red"
                      v-model="infoEvenement.end"
                      label="Date de fin"
                      prepend-icon="mdi-calendar-outline"
                      maxlength="10"
                      @click:prepend="isDialogEditDateFinOpen = true"
                      hint="AAAA/MM/JJ"
                      :disabled="!isEdit"
                    />
                  </v-col>
                </v-row>
              </div>
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
                    color="pink"
                    text
                    :disabled="(isAdmin != true && id_user != infoEvenement.id_user) && (isAdmin != true)"
                    @click="isDialogDeleteEvenement=true;"
                  >Supprimer ?</v-btn>
                </div>
                <v-spacer />
                <div class="text-right">
                  <v-btn
                    class="mr-1"
                    outlined
                    color="error"
                    text
                    @click="isEdit=false;isDialogEvenement = false"
                  >Fermer</v-btn>
                  <v-btn
                    class="mr-1"
                    outlined
                    color="orange"
                    text
                    :disabled="(isAdmin != true && id_user != infoEvenement.id_user) && (isAdmin != true)"
                    @click="isEdit = !isEdit"
                    v-if="!isEdit"
                  >Modification</v-btn>
                  <v-btn
                    class="mr-1"
                    outlined
                    color="yellow"
                    text
                    :disabled="(isAdmin != true && id_user != infoEvenement.id_user) && (isAdmin != true)"
                    @click="isEdit =!isEdit"
                    v-else
                  >Annuler modification</v-btn>
                  <v-btn
                    v-if="isEdit"
                    outlined
                    color="success"
                    text
                    :disabled="(isAdmin != true && id_user != infoEvenement.id_user) && (isAdmin != true)"
                    @click="saveModificationEvent"
                  >Sauvegarder</v-btn>
                </div>
              </v-row>
            </v-col>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogDeleteEvenement" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Supprimer l'evenement {{ infoEvenement.name.split(': ')[1] }} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogDeleteEvenement=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="deleteEvenement" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-material-card icon="mdi-calendar" title="Calendrier" color="red" inline class="px-5 py-3">
      <v-row>
        <v-col cols="12" md="10" class="mx-auto">
          <v-card>
            <v-toolbar flat>
              <v-toolbar-title>{{ dateDuJour }}</v-toolbar-title>
              <v-spacer />
              <v-btn color="red" class="mt-1" @click="isDialogNewEvent = true">
                <v-icon left>mdi-plus-circle-outline</v-icon>Ajouter un événement
              </v-btn>
              <v-spacer />
              <v-select
                v-model="type"
                :items="types"
                dense
                outlined
                hide-details
                label="Mode"
                class="ma-2"
              ></v-select>

              <v-spacer />

              <v-btn @click="$refs.calendar.prev()" fab dense color="red">
                <v-icon large>mdi-chevron-left</v-icon>
              </v-btn>
              <v-spacer />
              <v-btn @click="$refs.calendar.next()" fab dense color="red">
                <v-icon large>mdi-chevron-right</v-icon>
              </v-btn>
            </v-toolbar>

            <v-sheet height="600" flat class="mt-5">
              <v-calendar
                ref="calendar"
                v-model="calendar"
                :events="events"
                :type="type"
                event-overlap-mode="column"
                :event-color="getEventColor"
                :now="dateDuJour"
                @click:event="myEvent"
              />
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
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
// Components
//import { VBtn } from "vuetify/lib";
import qs from "qs";

export default {
  name: "DashboardCalendar",

  /* components: {
    CalendarBtn: {
      extends: VBtn,

      props: {
        color: {
          type: String,
          default: "red"
        },
        minWidth: {
          type: Number,
          default: 0
        },
        rounded: {
          type: Boolean,
          default: true
        }
      },

      computed: {
        classes() {
          return {
            ...VBtn.options.computed.classes.call(this),
            "mx-1": true,
            "text-lowercase": true
          };
        }
      }
    }
  },*/
  data: () => ({
    isSuccess: false,
    isSnackbarOpened: false,
    snackbarMessage: "",
    /*-------------------------- */
    isDialogNewEvent: false,
    isDialogDateDebutOpen: false,
    isDialogDateFinOpen: false,
    calendar: new Date().toISOString().substr(0, 10),
    dateDuJour: new Date().toISOString().substr(0, 10),
    evenement: {
      nomEvent: "",
      dateDebut: new Date().toISOString().substr(0, 10),
      dateFin: new Date().toISOString().substr(0, 10),
      id_entreprise: null,
      id_user: null
    },
    evenements: {},
    disabled: true,
    events: [
      {
        name: "Happy new year 2020",
        description: "lol",
        start: "2020-01-01",
        end: "2020-01-01",
        color: "Orange"
      }
    ],
    type: "month",
    types: ["month", "week", "day"],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "deep-orange",
      "pink",
      "red",
      "light-blue",
      "teal",
      "amber",
      "lime",
      "blue-grey",
      "brown"
    ],
    isDialogEvenement: false,
    infoEvenement: {
      name: ""
    },
    isDialogEditDateDebutOpen: false,
    isDialogEditDateFinOpen: false,
    isEdit: false,
    isDialogDeleteEvenement: false
  }),
  mounted() {
    this.verifUserConnected();
    if (this.id_entreprise == null || this.id_entreprise == undefined) return;

    axios
      .get("http://localhost:3000/evenements/" + this.id_entreprise) //tous les users de l entreprise
      .then(response => {
        response.data.evenements.forEach(evenement => {
          evenement.name =
            evenement.firstname +
            " " +
            evenement.lastname +
            " : " +
            evenement.name;
          evenement = Object.assign(evenement, {
            color: this.colors[this.rnd(0, this.colors.length - 1)]
          });
          this.events.push(evenement);
        });
      })
      .catch(error => {
        console.log("ERROR " + error);
        this.errorMessage("ERROR " + error);
      });
  },
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
  methods: {
    saveNewEvent: function() {
      this.isDialogNewEvent = true;

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      this.evenement.id_entreprise = this.id_entreprise; //id_entreprise provenant du store
      this.evenement.id_user = this.id_user; //id_user provenant du store

      let payload = this.evenement;

      axios
        .post(
          "http://localhost:3000/addEvenement",
          qs.stringify(payload),
          config
        )
        .then(response => {
          this.successMessage("L'evenement a bien été ajouté !");
          console.log("L'evenement a bien été ajouté !");
          this.isDialogNewEvent = false;
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
          /*this.evenement.dateDebut = eventDateDebut;
          this.evenement.dateFin = eventDateFin;*/
        });
    },
    getEventColor(event) {
      return event.color;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    myEvent(day) {
      this.infoEvenement = day.eventParsed.input;
      this.infoEvenement.name = this.infoEvenement.name.split(':')[1].trim();
      console.log(this.infoEvenement)
      this.isDialogEvenement = true;
    },
    saveModificationEvent: function() {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      };

      let payload = {
        nomEvent: this.infoEvenement.name,
        description: this.infoEvenement.description,
        dateDebut: this.infoEvenement.start,
        dateFin: this.infoEvenement.end
      };
      //return console.log(payload)

      axios
        .put(
          "http://localhost:3000/updateEvenement/" + this.infoEvenement.id,
          qs.stringify(payload),
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
    deleteEvenement: function() {
      this.isDialogDeleteEvenement = false;

      axios
        .delete(
          "http://localhost:3000/deleteEvenement/" + this.infoEvenement.id
        )
        .then(response => {
          if (response.data.error == false) {
            console.log(
              "L'evenement " +
                this.infoEvenement.name.split(":")[1].trim() +
                " a été supprimé"
            );
            this.successMessage(
              "L'evenement " +
                this.infoEvenement.name.split(":")[1].trim() +
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
    /*------------------------------------------------------ */
    verifUserConnected: function() {
      if (
        (this.id_user != undefined && this.id_user !== 0) ||
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

<style lang="sass">
#calendar
  .v-calendar-weekly__day:last-child,
  .v-calendar-weekly__head-weekday:last-child
    border-right: none

    .v-calendar-weekly__week:last-child .v-calendar-weekly__day
      border-bottom: none
</style>
