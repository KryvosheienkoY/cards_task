import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {ORDER_COMMENTS, ORDER_LIKES, API_KEY, ORDER_DESCENDING} from "@/constants";

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        cards: [],
        tags: [],
        sorting: {
            sortingMethod: undefined,
            sortingOrder: undefined
        },
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
            if (state.sorting.sortingMethod === ORDER_LIKES) {
                cards.sort((a, b) => a.likes - b.likes);
            } else if (state.sorting.sortingMethod === ORDER_COMMENTS) {
                cards.sort((a, b) => a.comments - b.comments);
            }
            if (state.sorting.sortingOrder === ORDER_DESCENDING) {
                cards.reverse();
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
            return state.mapOfCards.get(id);
        },
    },
    actions: {

        async loadCards({commit}, additionalParams) {
            const response = await axios.get(`https://pixabay.com/api/`, {
                params: {
                    key: API_KEY,
                    q: 'gold fish',
                    image_type: 'all',
                    per_page: additionalParams.per_page,
                    page: additionalParams.page,
                }
            }).catch(err => {
                throw ('Error: ' + err);
            });
            commit("SET_CARDS", response.data.hits);
            return Math.ceil(response.data.totalHits / additionalParams.per_page);
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
                        throw ('Error: ' + err);
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

        SET_SORTING(state, sortingObj) {
            //update SORTING
            state.sorting.sortingMethod = sortingObj.sortingMethod;
            state.sorting.sortingOrder = sortingObj.sortingOrder;

        }
    }
})