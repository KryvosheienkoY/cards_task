import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import {ORDER_COMMENTS, ORDER_LIKES, API_KEY, ORDER_DESCENDING} from "../myConstants";


Vue.use(Vuex)

type Card = {
    id: number,
    tags: string,
    likes: number,
    comments: number
};
type SortingObj = {
    sortingMethod: string,
    sortingOrder: string
};

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
            const cards: Card[] = state.tags.length
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
            // const tags = new Set();
            let tags: string[] = [];
            state.cards.forEach((card) => {
                card.tags.split(',').forEach(elem => {
                    //tags.add(elem.trim());
                    tags.push(elem.trim());
                });
            });
            return [...tags];
        },

        cardById: state => (id: number) => {
            return state.mapOfCards.get(id);
        },
    },
    actions: {

        async loadCards({commit}, additionalParams: { query: string, per_page: number, page: number }) {
            const response = await axios.get(`https://pixabay.com/api/`, {
                params: {
                    key: API_KEY,
                    q: additionalParams.query,
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

        async loadCardByIdAsync({commit, state}, id: number) {
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

        setTags({commit}, tags: string) {
            commit("SET_TAGS", tags);
        },

        clearTags({commit}) {
            commit("SET_TAGS", []);
        },

        setSorting({commit}, value:SortingObj= undefined) {
            commit('SET_SORTING', value);
        },

        editTag({commit}, card: { id: number, tag: string }) {
            commit('EDIT_TAG', card);
        },
    },
    mutations: {
        SET_CARDS(state, cards: Card[]) {
            //update cards
            state.cards.length = 0;
            state.cards.push(...cards);
            cards.forEach(elem => state.mapOfCards.set(elem.id, elem));
        },

        SET_CARD_MAP(state, cards: Card[]) {
            cards.forEach(elem => state.mapOfCards.set(elem.id, elem));
        },

        SET_TAGS(state, tags: string[]) {
            //update tags
            state.tags.length = 0;
            state.tags.push(...tags);
        },

        EDIT_TAG(state, card: { id: number, tag: string }): void {
            state.cards.forEach((elem, index) => {
                if (elem.id === card.id) {
                    let edited_card: { tags: string } = {tags: ''};
                    for (let k in elem)
                        edited_card[k] = elem[k];
                    edited_card.tags = elem.tags.replace(card.tag, 'editedTag');
                    state.cards.splice(index, 1, edited_card);
                }
            });
        },

        SET_SORTING(state, sortingObj:SortingObj) {
            //update SORTING
            state.sorting.sortingMethod = sortingObj.sortingMethod;
            state.sorting.sortingOrder = sortingObj.sortingOrder;

        }
    }
})