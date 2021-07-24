<template>
  <v-card class="card mx-auto my-6"
          height="350px"
  >
    <!--    <v-row class="d-flex">-->
    <v-img
        :src="`${card.webformatURL}`"
        height="250px"
    ></v-img>
    <v-card-title>
      <v-row>
        <span class="mr-auto">{{ card.comments }}
             <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-comment</v-icon>
        </span>
        <span class="ml-auto">{{ card.likes }}
          <v-icon left color="primary"  class="d-none d-sm-inline-flex">mdi-thumb-up</v-icon>
       </span>
      </v-row>
    </v-card-title>
    <v-card-text class="my-2">
      <v-row>
        <v-chip

            class="chip my-4 ml-2"
            color="primary"
            v-for="tag in (card.tags.split(',').map(elem=>elem.trim()))" :key="tag"
        > {{ tag }}
        </v-chip>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
// import {mapMutations} from "vuex";

export default {
  name: "Card",

  props: [
    'card'
  ],
  methods: {
    //
    // ...mapMutations([
    //   'storageRemoveMutation',
    // ]),
    // removecard() {
    //   this.storageRemoveMutation({card: this.card})
    // },
  }
}
</script>

<style scoped>
.card {
  overflow: hidden;
}


</style>