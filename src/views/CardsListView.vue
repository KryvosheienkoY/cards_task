<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pb-0">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                    v-model="query"
                    label="Search"
                    hide-details="auto"
                    append-icon="mdi-magnify"
                    outlined
                    @click:append="searchQuery"
                    @keyup.enter="searchQuery"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                    :items="availableTags"
                    outlined
                    chips
                    small-chips
                    label="Tags"
                    multiple
                    clearable
                    hide-details
                    @change="setTags"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                    :items="sortings"
                    v-model="selectedSort"
                    label="Sort by"
                    hide-details
                    outlined
                    clearable
                    @change="sortCards"
                >
                  <template v-slot:append-outer>
                    <v-icon
                        left
                        color="primary"
                        class="d-none d-sm-inline-flex"
                        @click="changeSortingOrder">
                      {{ sortingIcon }}
                    </v-icon>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
          v-if="query!==undefined"
          cols="12">
        <v-row>
          <v-col cols="12" md="6" lg="3" v-for="card in currentCards" v-bind:key="card.id">
            <Card :card="card"></Card>
          </v-col>
        </v-row>
        <div class="text-center mt-8">
          <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="10"
              @input="getContent"
          ></v-pagination>
        </div>
      </v-col>
      <v-col
          v-else
          cols="12"
          class="my-8"
      >
        Type query to make a search
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ORDER_COMMENTS, ORDER_LIKES, ORDER_ASCENDING, ORDER_DESCENDING} from "@/myConstants";
import Card from "@/components/Card";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CardsList",
  components: {Card},
  data() {
    return {
      sortingIcon: 'mdi-sort-ascending',
      orderMethod: ORDER_ASCENDING,
      selectedSort: '',
      totalPages: 1,
      page: 1,
      per_page: 16,
      query: '',
    }
  },
  created() {
    this.page = +this.$route.query.page || 1;
    this.query = this.$route.query.searchQuery;
    this.getContent();
  },
  computed: {
    sortings() {
      return [{text: "Likes", value: ORDER_LIKES, order: this.orderMethod}, {
        text: "Comments",
        value: ORDER_COMMENTS,
        order: this.orderMethod
      }];
    },

    ...mapGetters([
      'currentCards',
      'availableTags'
    ]),
  },

  methods: {
    ...mapActions([
      'loadCards',
      'setTags',
      'setSorting'
    ]),
    changeSortingOrder() {
      if (this.orderMethod === ORDER_DESCENDING) {
        this.sortingIcon = 'mdi-sort-ascending';
        this.orderMethod = ORDER_ASCENDING;
      } else {
        this.sortingIcon = 'mdi-sort-descending';
        this.orderMethod = ORDER_DESCENDING;
      }
      this.sortCards();
    },
    sortCards() {
      this.setSorting({sortingMethod: this.selectedSort, sortingOrder: this.orderMethod});
    },
    searchQuery() {
      this.page = 1;
      this.getContent();
    },
    getContent() {
      if (this.query !== '' && this.query !== undefined) {
        this.$router.push({
          query:
              {
                searchQuery: this.query,
                page: this.page,
              }
        }).catch(()=>{});
        this.setTags([]);
        this.loadCards({
          query: this.query,
          page: this.page,
          per_page: this.per_page,
        }).then((pages) => {
          this.totalPages = pages;
          window.scrollTo(0, 0);
        });
      }
    }
  }
}
</script>

<style scoped>

</style>