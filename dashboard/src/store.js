import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const dataGlobal = new createPersistedState({
    paths: ['id_user', 'id_entreprise', 'isAdmin'],
})

export default new Vuex.Store({
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-3.jpg',
        drawer: null,
        /*id_entreprise: null, //mettre a null plus tard //id_entreprise: null (8)
        id_user: null, //mettre a null plus tard //id_user: null (2)
        isAdmin: true //mettre a null plus tard //isAdmin: null (true)*/
    },
    //plugins: [createPersistedState()], //plugin permettant d'utiliser le localstorage pour toutes les states
    plugins: [dataGlobal], //plugin permettant d'utiliser le localstorage pour une state en particulier
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },
        SET_SCRIM(state, payload) {
            state.barColor = payload
        },
        SET_ID_ENTREPRISE(state, payload) {
            state.id_entreprise = payload
        },
        SET_ID_USER(state, payload) {
            state.id_user = payload
        },
        SET_IS_ADMIN(state, payload) {
            state.isAdmin = payload
        }
    },
    actions: {

    },
})