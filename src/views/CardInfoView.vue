<template>
  <v-container>
    <v-row class="my-1">
      <v-col cols="8">
        <v-img
            :src="`${card.webformatURL}`"
        ></v-img>
      </v-col>
      <v-col cols="4" class="my-1">
        <v-row>
          <span>Id: {{ card.id }}</span>
        </v-row>
        <v-row>
          <span> {{ card.likes }}
             <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-thumb-up</v-icon></span>
        </v-row>
        <v-row>
          <span> {{ card.comments }}
             <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-comment</v-icon></span>
        </v-row>
        <v-row>
          <span>Views: {{ card.views }}</span>
        </v-row>
        <v-row>
          <v-chip
              class="chip my-4 ml-2"
              color="primary"
              v-for="tag in (card.tags.split(',').map(elem=>elem.trim()))" :key="tag"
          > {{ tag }}
          </v-chip>
        </v-row>
        <v-row>
          <span>Downloads: {{ card.downloads }}</span>
        </v-row>
        <v-row>
          <span>PageURL: <a :href="`${card.pageURL}`"></a></span>
        </v-row>
        <v-row>
          <span>ImageWidth: {{ card.imageWidth }}</span>
        </v-row>
        <v-row>
          <span>ImageHeight: {{ card.imageHeight }}</span>
        </v-row>
        <v-row>
          <span>ImageSize: {{ card.imageSize }}</span>
        </v-row>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CardInfoView",

  data() {
    return {card: null}
  },
  created() {
    if (this.$route.params.card !== undefined) {
      this.card = this.$route.params.card;
    }
  },
}
</script>

<style scoped>

</style>