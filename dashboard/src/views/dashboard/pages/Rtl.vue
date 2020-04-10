<template>
  <v-container
    id="rtl"
    fluid
    tag="section"
  >
    <base-material-wizard
      v-model="tab"
      :available-steps="availableSteps"
      :items="tabs"
      class="mx-auto"
      @click:next="next"
      @click:prev="tab--"
    >

    </base-material-wizard>
  </v-container>
</template>

<script>


  export default {
    name: 'Widgets',

    components: {
      //PagesPlanCard,
    },

    data: () => ({
      tab: 0,
      tabs: ['About', 'Account', 'Address']
    }),

    computed: {
      availableSteps () {
        const steps = [0]

        if (
          this.first &&
          this.last &&
          this.email
        ) steps.push(1)

        if (this.stringAccount && steps.includes(1)) steps.push(2)

        if (
          this.address &&
          this.street &&
          this.city &&
          this.state &&
          steps.includes(2)
        ) steps.push(3)

        return steps
      }
    },

    beforeDestroy () {

    },
  }
</script>

<style lang="sass">
  .v-card.v-card.v-card--account
    border-color: currentColor
    border-width: 4px

    .v-icon
      color: inherit

  .v-card--account,
  .v-card--account:before
    border-radius: 50%

</style>
