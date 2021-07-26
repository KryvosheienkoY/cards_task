<template>
  <v-container>
    <v-row
        align="center"
        justify="space-around"
        class="my-3"
    >
      <v-btn
          depressed
          outlined
          color="primary"
          @click="$router.go(-1)"
      >
        Go Back
      </v-btn>
    </v-row>

    <CardDetails v-if="card" :card="card"></CardDetails>
  </v-container>
</template>

<script>
import CardDetails from "@/components/CardDetails";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CardInfoView",
  components: {CardDetails},
  props: {
    id: {
      type: Number,
    },
  },

  data() {
    return {
      card: null,
    };
  },
  created() {

    this.$store.dispatch('loadCardByIdAsync', this.id).then(() => {
      this.card = this.cardById(+this.id);
    });
  },
  computed: {
    ...mapGetters([
      'cardById',
    ]),
  },
  methods: {
    ...mapActions([
      'loadCardById',
    ]),
  }
}
</script>

<style scoped>

</style>