<template>
  <v-row class="my-1">
    <v-col cols="12" md="8">
      <v-img
          :src="`${card.webformatURL}`"
      ></v-img>
    </v-col>
    <v-col cols="12" md="4" class="my-1 details-col">
      <v-row
          align-content="center"
          class="container-user">
        <v-avatar>
          <v-img
              :src="`${card.userImageURL}`"
              contain
              height="40"
              width="40"
          ></v-img>
        </v-avatar>
        <div class="container-centered">
          <span> {{ card.user }}</span>
        </div>
      </v-row>
      <v-row class="container-social">
          <span> {{ card.likes }}
             <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-thumb-up</v-icon></span>
        <span> {{ card.comments }}
             <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-comment</v-icon></span>
        <span> {{ card.views }}
         <v-icon left color="primary" class="d-none d-sm-inline-flex">mdi-eye</v-icon></span>
      </v-row>
      <v-row class="container-tags">
        <v-chip
            small
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
        <span>PageURL: <a :href="card.pageURL">link</a></span>
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
</template>

<script>
export default {
  name: "CardDetails",
  props: {
    card: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style scoped lang="scss">
.container-centered {
  display: flex;
  align-items: center;
}

.details-col {
  .container-user, .container-social, .container-tags {
    justify-content: center;
  }
}

.container-user {
  font-size: 20px;
  margin: 5px 0;
}
</style>