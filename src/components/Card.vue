<template>
  <v-card class="card mx-auto my-6"
          height="350px"
  >
    <v-img
        :src="`${card.webformatURL}`"
        height="250px"
        class="card-img"
        @click="$router.push({ name: 'CardInfoView', params: {id: card.id }})"
    ></v-img>
    <v-card-title>
      <v-row>
        <span class="mr-auto ml-1">{{ card.comments }}
             <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-comment</v-icon>
        </span>
        <span class="ml-auto mr-1">{{ card.likes }}
          <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-thumb-up</v-icon>
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

export default {
  name: "Card",
  props: {
    card: {
      type: Object,
      required: true,
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.card {
  overflow: hidden;

  .card-img:hover {
    cursor: pointer;
  }
}


</style>