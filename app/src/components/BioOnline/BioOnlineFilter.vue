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

      <b-form-group
            label="Tipo de combinação de filtros:"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio
              v-model="filterCompositionType"
              :aria-describedby="ariaDescribedby"
              value="AND"
              >E</b-form-radio
            >
            <b-form-radio
              v-model="filterCompositionType"
              :aria-describedby="ariaDescribedby"
              value="OR"
              >OU</b-form-radio
            >
          </b-form-group>
      <b-card v-for="category in Object.keys(filterDict)" :key="category.id">
        <h4>{{ category }}</h4>
        <BioOnlineInnerFilter
          :innerKeys="Object.keys(filterDict[category])"
          :innerMap="filterDict[category]"
          :category="category"
        />
      </b-card>
      <b-alert :show="errorOnANDFilter()" variant="danger">Há mais de um 
            campo especificado para um filtro do tipo E, o que não faz sentido.
            Por favor, utilize apenas um campo por vez ou faça uma combinação de
            filtros do tipo OU</b-alert>
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
      loadingColumns: true
    };
  },
  methods: {
    feedCompleteOptions() {
      getBioOnlineFilterDict().then((value) => {
        this.$store.state.filterDict = value;
      });
    },
    errorOnANDFilter(){
      var keySet = new Set();
      for(var i = 0; i < this.$store.state.selectedFilters.length; i++){
        keySet.add(this.$store.state.selectedFilters['selectedKey']);
      }
      return keySet.size < this.$store.state.selectedFilters.length && this.$store.state.filterCompositionType == 'AND';
    }
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
    filterCompositionType: {
      get() {
        return this.$store.state.filterCompositionType;
      },
      set(value) {
        this.$store.commit("updatefilterCompositionType", value);
      },
    },
  },
};
</script>
