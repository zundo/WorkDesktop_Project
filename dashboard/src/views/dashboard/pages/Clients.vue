<template>
  <v-container id="clients" tag="section" fluid>
    <v-dialog v-model="isDialogNewClient" persistent max-width="1000px">
      <v-card class="px-6">
        <v-card-title class="blue--text">
          Nouveau Client
          <v-divider class="my-5" />
          <v-icon aria-label="Close" @click="isDialogNewClient = false">mdi-close</v-icon>
        </v-card-title>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field outlined label="Nom*" color="blue" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Prénom*" color="blue" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Adresse E-mail*" color="blue" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Numero de téléphone*" color="blue" />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field outlined label="Société" color="blue" />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field outlined label="Poste occupé" color="blue" />
              </v-col>

              <v-col cols="12">
                <v-text-field outlined label="Objet*" color="blue" />
              </v-col>

              <v-col cols="12">
                <v-textarea outlined color="blue" label="Comment pouvons-nous vous aider ?*" />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  class="mr-1"
                  outlined
                  color="error"
                  text
                  @click="isDialogNewClient = false"
                >Close</v-btn>
                <v-btn outlined color="success" text @click="saveNewClient">Sauvegarder</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog dark v-model="isDialogDeleteClient" width="500" overlay-opacity="0.8">
      <v-card>
        <v-card-title>Supprimer le client {{ clientToDelete.name }} ?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="isDialogDeleteClient=false" class="mx-2" fab dark>
            <v-icon dark>mdi-close</v-icon>
          </v-btn>
          <v-btn @click="deleteClient" class="mx-2" fab color="green darken-1">
            <v-icon dark>mdi-check-bold</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-material-card color="indigo" icon="mdi-account-outline" inline class="px-5 py-3">
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">Clients</div>
      </template>

      <v-row class="mt-8">
        <v-btn color="indigo" @click="openDialogNewClient" class="ml-3">
          <v-icon left>mdi-plus-circle-outline</v-icon>Nouveau Client
        </v-btn>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          class="ml-auto"
          label="Recherche"
          color="primary"
          hide-details
          single-line
          style="max-width: 250px;"
        />
      </v-row>
      <v-divider class="mt-6" />

      <!--show-select
      single-select-->
      <v-data-table
        :headers="headers"
        :items="items"
        :search.sync="search"
        :sort-by="['name']"
        :sort-desc="[false]"
        multi-sort
        show-expand
        single-expand
        item-key="name"
        :expanded.sync="expanded"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-btn small color="blue" @click="PageInfosClient(item)" >
              <v-icon left>mdi-card-account-details-outline</v-icon>Informations sur {{ item.name }}
            </v-btn>
            <v-btn small color="red" @click="dialogDeleteClient(item)" class="ml-3">
              <v-icon left>mdi-delete-circle-outline</v-icon>Supprimer le Client {{ item.name }}
            </v-btn>
          </td>
        </template>
        <div
          slot="no-results"
          :value="true"
          icon="warning"
          class="error--text"
        >La recherche "{{ search }}" inconnu.</div>
      </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
export default {
  name: "Clients",

  data: () => ({
    isDialogNewClient: false,
    isDialogDeleteClient: false,
    clientToDelete:[],
    expanded:[],
    headers: [
      {
        text: "Name",
        value: "name"
      },
      {
        text: "Username",
        value: "username"
      },
      {
        text: "Email",
        value: "email"
      },
      {
        text: "Phone",
        value: "phone"
      },
      {
        text: "Website",
        value: "website"
      },
      {
        sortable: false,
        text: "Actions",
        value: "actions"
      }
    ],
    items: [],
    search: undefined
  }),
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        var users = response.data;
        console.log(users);
        //console.log(JSON.stringify(users))
        users.forEach(user => {
          this.items.push(user);
        });
      })
      .catch(error => console.log(error))
      .finally(() => console.log("OK"));
  },
  methods: {
    saveNewClient: function() {
      this.isDialogNewClient = false;
      console.log("Sauvegarder new client");
    },
    openDialogNewClient: function() {
      this.isDialogNewClient = true;
      //mettre les valeurs des inputs du dialog a vide
    },
    deleteClient: function() {
      this.isDialogDeleteClient = false;
      console.log("Le client " + this.clientToDelete.name + " a été supprimé");
    },
    dialogDeleteClient: function(infos_client){
      this.isDialogDeleteClient = true;
      this.clientToDelete=infos_client;
    },
    PageInfosClient: function(infos_client){
      this.$router.push({ name: 'Informations', params: { userId: infos_client.id } });
    }
  }
};
</script>
