<template>
  <div class="container">
    <div>
    </div>
    <b-form-checkbox
      id="checkbox-1"
      v-model="ignoreSubspecies"
      name="checkbox-1"
      value=true
      unchecked-value=false
    >
      Ignorar subspécies
    </b-form-checkbox>
    <b-button variant="success"
    @click="getDifference(ignoreSubspecies)">
    
    <span v-show="!loading">Procurar por diferenças</span>
                <b-spinner v-show="loading" small variant="primary" label="Spinning"></b-spinner>
                <span v-show="loading">Aguarde, procurando</span>
    </b-button>
    <Table :lists="{intersection, onlyOnExternalDatabase, onlyOnBioOnline}"
    :externalDatabaseName="'Somente no Wikiaves'"/>
  </div>
</template>

<script>
import Table  from "./Table.vue";
import {getDifferenceFromWikiaves }  from "./differenceService.js";

export default {
  components: {
    Table
  },
  data() {
    return {
        loading: false,
        ignoreSubspecies: false,
        intersection: [],
        onlyOnExternalDatabase: [],
        onlyOnBioOnline: []
    };
  },
  methods: {
    getDifference(ignoreSubspecies) {
      this.loading = true;
      const payload = {
        cityName: "São Paulo",
        ignoreSubspecies: ignoreSubspecies
      };
      getDifferenceFromWikiaves(payload).then((value) => {
        console.log(value);
        this.intersection = value.intersection;
        this.onlyOnExternalDatabase = value.onlyOnWikiaves;
        this.onlyOnBioOnline = value.onlyOnBioOnline;
        this.loading = false;
      });
    }
  },
};
</script>