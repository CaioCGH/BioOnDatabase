<template>
  <b-card border-variant="info" class="m-1">
    <b-card-header>
      <h4>Filtrar resultados</h4>
    </b-card-header>
    <b-button :pressed.sync="showFilters" class="m-2">
      <div v-if="!showFilters">Expandir filtros</div>
      <div v-else>Esconder filtros</div>
    </b-button>
    <div v-show="showFilters">
      <b-card v-for="category in Object.keys(filterDict)" :key="category.id">
        <h4>{{ category }}</h4>
        <BioOnlineInnerFilter
          :innerKeys="Object.keys(filterDict[category])"
          :innerMap="filterDict[category]"
          :category="category"
        />
      </b-card>
    </div>
  </b-card>
</template>

<script>
import { getBioOnlineFilterDict } from "./BioOnlineService";
import BioOnlineInnerFilter from "./BioOnlineInnerFilter.vue";

export default {
  components: {
    BioOnlineInnerFilter,
  },
  data() {
    return {
      showFilters: false,
      loadingColumns: true,
    };
  },
  methods: {
    feedCompleteOptions() {
      getBioOnlineFilterDict().then((value) => {
        this.$store.state.filterDict = value;
      });
    },
  },
  created() {
    this.feedCompleteOptions();
    this.loadingColumns = false;
  },
  computed: {
    filterDict: {
      get() {
        return this.$store.state.filterDict;
      },
    },
    conservationStatusDict: {
      get() {
        return this.$store.state.conservationStatusDict;
      },
    },
  },
};
</script>
