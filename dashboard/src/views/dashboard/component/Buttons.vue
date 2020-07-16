<template>
  <v-container
    id="buttons"
    fluid
    tag="section"
  >
  <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day'],
      mode: 'column',
      weekday: [1, 2, 3, 4, 5, 6, 0],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    }),
  mounted() {
    this.verifUserConnected();

    axios
      .get("http://localhost:3000/evenements/"+this.id_entreprise)//tous les users de l entreprise
      .then(response => {
        this.getEvents(response.data.evenements)
        /*response.data.evenements.forEach(evenement => {
          //delete evenement.id
          this.events.push(evenement)
        });*/

      })
      .catch(error => {
        console.log("ERROR " +error);
        this.errorMessage("ERROR " +error);
      })
  },
  computed: {
    id_user() {
      return this.$store.state.id_user;
    },
    id_entreprise() {
      return this.$store.state.id_entreprise
    },
  },
    methods: {
      getEvents (/*{ start, end }*/ evenements = null) {
        if (evenements === null) return this.errorMessage("Aucun Evénéments !")

        const events = []
        /*const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)*/
        for (let i = 0; i < evenements.length; i++) {
          const start = new Date(evenements[i].start)
          const end = new Date(evenements[i].end)

          console.log('start: '+start)
          console.log('end: '+end)

         // const allDay = this.rnd(0, 3) === 0

         // const firstTimestamp = evenements[i].start.getTime()
         // console.log(firstTimestamp)
         // const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          
          //const secondTimestamp = evenements[i].end.getTime()
          //const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: evenements[i].name,
            start: start,
            end: end,
            color: this.colors[this.rnd(0, this.colors.length - 1)],
            //timed: !allDay,
          })
        }
        console.log(events)
        this.events = events
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      /*------------------------------------------------------ */
      verifUserConnected: function(){
        if((this.id_user != undefined && this.id_user !== 0) || (this.id_entreprise != undefined && this.id_entreprise !== 0)){
          //console.log(this.isAdmin)
        }else return this.$router.push({ name: "Connexion" });
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
    },
  }
</script>