<template>
  <div>
    <div v-if="mixedAnimalRows.length > 0">
      <h2 v-if="mixedAnimalRows.length === 1">
        {{ mixedAnimalRows.length }} resultado
      </h2>
      <h2 v-else>{{ mixedAnimalRows.length }} resultados</h2>
      <b-card v-for="animalRow in mixedAnimalRows" :key="animalRow.id">
        <b-card bg-variant="light">
          <h2>BioOnline</h2>
          <BioOnlineAnimalCard :animalInfo="animalRow.animalRow"
          :key="Date.now() /*key para forçar o componente a recarregar*/"/>
        </b-card>
        <b-card bg-variant="light">
          <h2>Wikiaves</h2>
          <WikiavesAnimal
            v-if="animalRow.wikiavesResult"
            :animalData="animalRow.wikiavesResult"
          />
          <b-card v-else border-variant="danger"
            >Nenhum resultado encontrado para "{{
              animalRow.animalRow["Nome Científico"]
            }}" <br />
            Talvez não seja uma ave?
          </b-card>
          </b-card>
            <b-card bg-variant="light">
                <h2>EBird</h2>
          <EbirdObservations v-if="animalRow.ebirdResult.errors == undefined" :observationDataList="animalRow.ebirdResult" />
          <b-card v-else border-variant="danger">
              Nenhum resultado encontrado para "{{animalRow.animalRow["Nome Científico"]
            }}" <br />
            Talvez não seja uma ave?
          </b-card>
          </b-card>
<b-card bg-variant="light">
                <h2>iNaturalist</h2>
          <InaturalistObservations v-if="animalRow.inaturalistResult.length > 0"
            :observationDataList="animalRow.inaturalistResult"
          />
          <b-card v-else border-variant="danger">
              Nenhum resultado encontrado para "{{animalRow.animalRow["Nome Científico"]
            }}"
          </b-card>
        </b-card>
      </b-card>
    </div>
  </div>
</template>

<script>
import BioOnlineAnimalCard from "../BioOnline/BioOnlineAnimalCard.vue";
import WikiavesAnimal from "../Wikiaves/WikiavesAnimal.vue";
import EbirdObservations from "../Ebird/EbirdObservations.vue";
import InaturalistObservations from "../Inaturalist/InaturalistObservations.vue";

export default {
  components: {
    BioOnlineAnimalCard,
    WikiavesAnimal,
    EbirdObservations,
    InaturalistObservations,
  },
  data() {
    return {};
  },
  methods: {
  },
  computed: {
    mixedAnimalRows: {
      get() {
        return this.$store.state.mixedAnimalRows;
      },
      set(value) {
        this.$store.commit("updateMixedAnimalRows", value);
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