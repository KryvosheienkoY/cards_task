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
                    :items="sortings"
                    label="Sort by"
                    dense
                    hide-details
                    outlined
                    clearable
                    @change="(sorting)=> $store.dispatch('setSorting', sorting)"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
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
import {ORDER_COMMENTS, ORDER_LIKES} from "@/constants";
import Card from "@/components/Card";

export default {
  name: "CardsList",
  components: {Card},
  data() {
    return {}
  },
  computed: {
    sortings() {
      return [{text: "Likes", value: ORDER_LIKES}, {text: "Comments", value: ORDER_COMMENTS}];
    },
  },

  methods: {}
}
</script>

<style scoped>

</style>