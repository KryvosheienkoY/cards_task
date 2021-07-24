<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pb-0">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                    :items="$store.getters.availableTags"
                    outlined
                    chips
                    small-chips
                    label="Tags"
                    multiple
                    dense
                    clearable
                    hide-details
                    @change="(tags) => $store.dispatch('setTags', tags)"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                    v-model="selectedSortingMethod"
                    :items="sortingMethods"
                    label="Sort by:"
                    dense
                    hide-details
                    outlined
                    clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12 col-md-9 col-lg-10">
        <v-row>
          <v-col cols="12" md="6" lg="3" v-for="card in $store.getters.currentCards" v-bind:key="card.id">
            <Card :card="card"></Card>
          </v-col>
        </v-row>
        <div class="text-center mt-8">
          <v-pagination
              v-model="page"
              :length="3"
              @input="cards"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";


import Card from "@/components/Card";

export default {
  name: "CardsList",
  components: {Card},
  data() {
    return {
      sortingMethods: ["Likes", "Comments"],
      selectedSortingMethod: '',
      tags: [],
      selectedTags: [],
      page: 1,
      totalPages: 1,

    }
  },
  created() {
    // this.getContent()
    this.$store.dispatch('loadCards').then(() => {
      this.getAvailableTags();
    });

  },
  computed: {
    cards() {
      return this.$store.getters.allCards
    }
  },

  methods: {
    getAvailableTags() {
      console.log("getAvailableTags");
      this.cards.map(card => card.tags.split(',').map(elem => {
        elem.trim();
        if (!this.tags.includes(elem))
          this.tags.push(elem);
        console.log("push - elem -  " + elem);
      }))
    },
    clearFilters() {
      this.selectedSortingMethod = '';
      this.selectedTags = [];

      // this.getContent()
    },
    showLog(...args) {
      console.log(args);
    },
    // getContent() {
    //
    //   axios.get(`https://pixabay.com/api/?key=22618300-37dce439110119651c92e1365&q=cats&image_type=all&per_page=3`)
    //       .then(response => {
    //         // this.cards = response.data.hits
    //         console.log(response.data.hits)
    //         this.$store.commit('setCards', response.data.hits)
    //       })
    // },

    getFilteredCards() {
      return this.$store.getters.filteredByTagsCardsGetter(this.tags);
    }
  }
}
</script>

<style scoped>

</style>