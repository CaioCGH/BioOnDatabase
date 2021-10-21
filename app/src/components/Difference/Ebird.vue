<template>
  <div class="container">
    <div>
    </div>
    <b-form-checkbox
      id="checkbox-2"
      v-model="ignoreSubspecies"
      name="checkbox-2"
      value=true
      unchecked-value=false
    >
      Ignorar subspécies
    </b-form-checkbox>
    <b-button variant="success"
    @click="getDifference(ignoreSubspecies)">
    Procurar por diferenças
    </b-button>
    <Table :lists="{intersection, onlyOnExternalDatabase, onlyOnBioOnline}"
    :externalDatabaseName="'Somente no Ebird'"/>
  </div>
</template>

<script>
import Table  from "./Table.vue";
import {getDifferenceFromEbird }  from "./differenceService.js";

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
      getDifferenceFromEbird(payload).then((value) => {
        console.log(value);
        this.intersection = value.intersection;
        this.onlyOnExternalDatabase = value.onlyOnExternalDatabase;
        this.onlyOnBioOnline = value.onlyOnBioOnline;
      });
    }
  },
};
</script>