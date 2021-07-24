import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {ORDER_COMMENTS, ORDER_LIKES} from "@/constants";

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        cards: [],
        tags: [],
        sorting: undefined,
    },

    getters: {
        allCards: state => {
            return state.cards
        },

        currentCards: state => {
            const cards = state.tags.length
                ? state.cards.filter(card => card.tags.split(',').some(tag => state.tags.includes(tag.trim())))
                : [...state.cards];
            if (state.sorting === ORDER_LIKES) {
                cards.sort((a, b) => a.likes - b.likes);
            } else if (state.sorting === ORDER_COMMENTS) {
                cards.sort((a, b) => a.comments - b.comments);
            }
            return cards;
        },

        availableTags: state => {
            const tags = new Set();
            state.cards.forEach((card) => {
                card.tags.split(',').forEach(elem => {
                    tags.add(elem.trim());
                });
            });
            return [...tags];
        },
    },
    actions: {

        loadCards({commit}) {
            axios.get(`https://pixabay.com/api/?key=22618300-37dce439110119651c92e1365&q=cats&image_type=all&per_page=5`)
                .then(response => {
                    commit("SET_CARDS", response.data.hits);
                })
        },

        setTags({commit}, tags) {
            commit("SET_TAGS", tags);
        },

        clearTags({commit}) {
            commit("SET_TAGS", []);
        },

        setSorting({commit}, value = undefined) {
            commit('SET_SORTING', value);
        }
    },
    mutations: {
        SET_CARDS(state, cards) {
            //update cards
            state.cards.length = 0;
            state.cards.push(...cards);
        },

        SET_TAGS(state, tags) {
            //update tags
            state.tags.length = 0;
            state.tags.push(...tags);
        },

        SET_SORTING(state, sorting) {
            //update SORTING
            state.sorting = sorting;
        }
    }
})