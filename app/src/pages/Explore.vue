<template>
  <div>
    <b-container>
      <b-row class="vh-60" align-v="center">
        <b-col class="m-4">
          <TaxonomySearch />
        </b-col>
        <b-col class="m-4">
          <LocalitySearch />
        </b-col>
      </b-row>
      <b-row>
        <b-col class="m-4">
          <BiologySearch />
        </b-col>
        <b-col class="m-4">
          <img
          class="m-4"
          style="width: 100%"
          src="../assets/ibirapuera.jpg"
          alt=""
        />
        </b-col>
      </b-row>
      <b-row>
          <BioOnlinetableRows />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BioOnlinetableRows from "../components/BioOnline/BioOnlineTableRows.vue";
import TaxonomySearch from "../components/Search/TaxonomySearch.vue";
import LocalitySearch from "../components/Search/LocalitySearch.vue";
import BiologySearch from "../components/Search/BiologySearch.vue";

export default {
  components: {
      BioOnlinetableRows,
    TaxonomySearch,
    LocalitySearch,
    BiologySearch,
  },
};
</script>