<template>
  <v-container
    id="upgrade"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col  cols="12" md="4">      
        <base-material-card color="info">
          <template v-slot:heading>
            <div class="display-3 font-weight-light mb-4">
              Equipe Inglorius
            </div>

            <div class="subtitle-1 font-weight-light ">
          Le formulaire ci-contre est à votre disposition pour toutes demandes d’informations. 
          De la simple demande de renseignements ou pour une question technique, ce formulaire est fait pour vous.            
          </div>
          </template>
          <v-col cols="12">
            <div class="display-2 font-weight-light mb-3 mt-3">
              <v-chip color="secondary">ADRESSE</v-chip>
            </div>
           
            <div class="subtitle-1 font-weight-light ">
              17 rue Inglorius 75000 Paris, France
            </div>
          </v-col>
          <v-col cols="12">
            <div class="display-2 font-weight-light mb-3 mt-3">
              <v-chip color="secondary">TÉLÉPHONE</v-chip>
            </div>
           
            <div class="subtitle-1 font-weight-light ">
              01.23.45.67.78
            </div>
          </v-col>
          <v-col cols="12">
            <div class="display-2 font-weight-light mb-3 mt-3">
              <v-chip color="secondary">Support</v-chip>
            </div>
           
            <div class="subtitle-1 font-weight-light ">
              support@inglorius.fr
            </div>
          </v-col>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="8">
        <base-material-card color="success">
          <template v-slot:heading>
            <div class="display-3 font-weight-light mb-5">
              Contactez le support
            </div>

            <div class="subtitle-1 font-weight-light mb-4">
          Le formulaire ci-contre est à votre disposition pour toutes demandes d’informations. 
          De la simple demande de renseignements ou pour une question technique, ce formulaire est fait pour vous. 
            </div>
          </template>
 <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field class="purple-input" label="Nom*" />
                </v-col>

                 <v-col cols="12" md="6">
                  <v-text-field label="Prénom*" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Adresse E-mail*" class="purple-input"/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Numero de téléphone*" class="purple-input"/>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Société" class="purple-input"/>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Poste occupé" class="purple-input"/>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Objet*" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Comment pouvons-nous vous aider ?*"
                    value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="success" class="mr-0">
                    Envoyer
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',
  }
</script>

<style lang="sass">
  #upgrade
    .v-data-table
      th, td
        border: none !important
</style>
