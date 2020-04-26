<template>
  <v-container id="upgrade" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="4">
        <base-material-card color="primary">
          <template v-slot:heading>
            <div class="display-3 font-weight-light mb-4"><v-icon large>mdi-account-group</v-icon> L' équipe Inglorius</div>

            <div class="subtitle-1 font-weight-light">
              Le formulaire ci-contre est à votre disposition pour toutes demandes d’informations.
              De la simple demande de renseignements ou pour une question technique, ce formulaire est fait pour vous.
            </div>
          </template>
          <v-col cols="12">
            <div class="font-weight-light mb-3 mt-3">
              <v-chip color="primary"><v-icon left>mdi-walk</v-icon>ADRESSE</v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              <base-card class="pa-1">17 rue Inglorius 75000 Paris, France</base-card>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="font-weight-light mb-3 mt-3">
              <v-chip color="primary"><v-icon left>mdi-deskphone</v-icon>TÉLÉPHONE</v-chip>
            </div>

            <div class="subtitle-1 font-weight-light">
              <base-card class="pa-1">01.23.45.67.78</base-card>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="font-weight-light mb-3 mt-3">
              <v-chip color="primary"><v-icon left>mdi-account-check</v-icon>SUPPORT</v-chip>
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
                  <v-text-field class="purple-input" label="Nom*" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Prénom*" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Adresse E-mail*" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Numero de téléphone*" class="purple-input" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Société" class="purple-input" />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Poste occupé" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Objet*" class="purple-input" />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="Comment pouvons-nous vous aider ?*"
                    v-model="content"
                  />
                </v-col>

                <v-col cols="12" class="text-right">
                  <v-btn color="primary" class="mr-0">Envoyer</v-btn>
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
  name: "DashboardDashboard",
  data() {
    return {
      content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
  },
  mounted() {
    if(this.id_user != undefined && this.id_user !== 0){
      console.log('idUser: '+this.id_user)
    }else return this.$router.push({ name: "Connexion" });
  },
  computed: {
    id_user() {
        return this.$store.state.id_user
    },
  },
};
</script>

<style lang="sass">
#upgrade
  .v-data-table
    th, td
      border: none !important
</style>
