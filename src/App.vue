<template>
  <v-app>
    <div id="app">
      <CardsList></CardsList>
    </div>
  </v-app>
</template>

<script>
import CardsList from "../views/CardsListView";

export default {
  name: 'App',
  components: {
    CardsList,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
