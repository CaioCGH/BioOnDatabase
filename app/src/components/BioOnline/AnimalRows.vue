<template>
  <div v-if="displayType === 'display_cards'">
    <div class="container" v-if="this.$store.state.animalRows.length > 0">
      <h2 v-if="animalRows.length === 1">{{ animalRows.length }} resultado</h2>
      <h2 v-else>{{ animalRows.length }} resultados</h2>
      <div v-for="animalRow in animalRows" :key="animalRow.id">
        <BioOnlineAnimalCard
          :animalInfo="animalRow"
          :key="Date.now() /*key para forçar o componente a recarregar*/"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BioOnlineAnimalCard from "./BioOnlineAnimalCard.vue";

export default {
  components: {
    BioOnlineAnimalCard,
  },
  data() {
    return {};
  },
  methods: {
  },
  computed: {
    animalRows: {
      get() {
        return this.$store.state.animalRows;
      },
      set(value) {
        this.$store.commit("updateAnimalRows", value);
      },
    },
    displayType: {
      get() {
        return this.$store.state.displayType;
      },
    },
  },
};
</script>