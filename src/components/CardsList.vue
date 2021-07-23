<template>
  <div>
    <h1>Cards List</h1>
    <ul>
      <li v-for="card in cards" v-bind:key="card.id">
      <v-img
          :src="`${card.webformatURL}`"
          max-width="350px"
          height="220px"
          class="align-self-center"
      ></v-img>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
name: "CardsList",
  data() {
    return {
      cards: [],
    }
  },
  created() {
    this.getContent()
  },
  methods: {
    getContent() {

      axios.get(`https://pixabay.com/api/?key=22618300-37dce439110119651c92e1365&q=cats&image_type=all&per_page=5`)
          .then(response => {
            this.cards = response.data.hits
            console.log(response.data.hits)
          })
    },
  }
}
</script>

<style scoped>

</style>