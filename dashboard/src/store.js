import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
        drawer: null,
        id_user: 2, //mettre a null plus tard //id_user: null
        isAdmin: true //mettre a null plus tard //isAdmin: null
    },
    //plugins: [createPersistedState()], //plugin permettant d'utiliser le localstorage
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