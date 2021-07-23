<template>
  <div id="app">
    <CardsList></CardsList>
  </div>
</template>

<script>
import CardsList from "@/components/CardsList";

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
  margin-top: 60px;
}
</style>
