<template>
  <div>
    <b-container>
      <b-row>
      <b-col class="m-4">
        <div >
          <TaxonomySearch />
        </div>
        <div>
          <BiologySearch />
        </div>
      </b-col>
      <b-col class="m-4">
        <div>
          <LocalitySearch />
        </div>
        <div>
          <img
            class="m-4"
            style="width: 100%"
            src="../assets/ibirapuera.jpg"
            alt=""
          />
        </div>
      </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row>
        <Node :dataNode="this.$store.state.globalTree" />
      </b-row>
      <b-row>
        <BioOnlinetableRows :rows="this.$store.state.animalRows" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import BioOnlinetableRows from "../components/BioOnline/BioOnlineTableRows.vue";
import TaxonomySearch from "../components/Search/TaxonomySearch.vue";
import LocalitySearch from "../components/Search/LocalitySearch.vue";
import BiologySearch from "../components/Search/BiologySearch.vue";
import  Node from "../components/TreeView/Node.vue";

export default {
  components: {
    BioOnlinetableRows,
    TaxonomySearch,
    LocalitySearch,
    BiologySearch,
    Node
  },
};
</script>