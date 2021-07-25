import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {ORDER_COMMENTS, ORDER_LIKES, API_KEY} from "@/constants";

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        cards: [],
        tags: [],
        sorting: undefined,
        mapOfCards: new Map(),
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

        cardById: state => id => {
            console.log("(id) - ", id);
            console.log("state.mapOfCards.get(id) - ", state.mapOfCards.get(id));
            console.log("state.mapOfCards.has(id) - ", state.mapOfCards.has(id));
            console.log("state.mapOfCards() - ", state.mapOfCards);
            return state.mapOfCards.get(id);
        },
    },
    actions: {

        loadCards({commit}) {
            axios.get(`https://pixabay.com/api/`, {
                params: {
                    key: API_KEY,
                    q: 'cats',
                    image_type: 'all',
                    per_page: 5,
                }
            })
                .then(response => {
                    commit("SET_CARDS", response.data.hits);
                })
        },
        loadCardById({commit}, id) {
            //check if card was already loaded, if not - get it by api
            if (!this.state.mapOfCards.has(id)) {
                axios.get(`https://pixabay.com/api/`, {
                    params: {
                        key: API_KEY,
                        id: id,
                    }
                })
                    .then(response => {
                        commit("SET_CARD_MAP", response.data.hits);
                    })


            }
        },

        async loadCardByIdAsync({commit, state}, id) {
            if (state.mapOfCards.has(id)) {
                console.log('Got cached by id=' + id);
            } else {
                console.log('Getting from API by id=' + id);
                const response = await axios
                    .get(`https://pixabay.com/api/`, {
                        params: {
                            key: API_KEY,
                            id: id,
                        }
                    })
                    .catch(err => {
                        throw ('Anus sebe rejectni pes ' + err);
                    });
                commit("SET_CARD_MAP", response.data.hits);
            }
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
            cards.forEach(elem => state.mapOfCards.set(elem.id, elem));
        },

        SET_CARD_MAP(state, cards) {
            cards.forEach(elem => state.mapOfCards.set(elem.id, elem));
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