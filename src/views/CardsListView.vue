<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="pb-0">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                    :items="availableTags"
                    outlined
                    chips
                    small-chips
                    label="Tags"
                    multiple
                    dense
                    clearable
                    hide-details
                    @change="setTags"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                    :items="sortings"
                    v-model="selectedSort"
                    label="Sort by"
                    dense
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
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6" lg="3" v-for="card in currentCards" v-bind:key="card.id">
            <Card :card="card"></Card>
          </v-col>
        </v-row>
        <div class="text-center mt-8">
          <!--          <v-pagination-->
          <!--              v-model="page"-->
          <!--              :length="3"-->
          <!--              @input="cards"-->
          <!--          ></v-pagination>-->
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ORDER_COMMENTS, ORDER_LIKES, ORDER_ASCENDING, ORDER_DESCENDING} from "@/constants";
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
    }
  },
  created() {
    this.loadCards();
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
    sortCards(){
      this.setSorting({sortingMethod: this.selectedSort, sortingOrder: this.orderMethod});
    }
  }
}
</script>

<style scoped>

</style>