import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

new Vuex.Store({

    state:{
        cards:[]
    },

    getters:{

        cardsCount(){

        }
    },
    actions:{
        fetchCards(){

        }
    },
    mutations:{
        setCards(){}
    }
})