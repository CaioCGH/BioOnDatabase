<template>
  <div>
    <div v-if="showLists()" class="container">
      <b-card-group deck>
        <b-card border-variant="info" class="m-1" title="Total">
          {{ total }}
        </b-card>
      </b-card-group>

      <b-card-group deck>
        <b-card border-variant="info" class="m-1" :title="externalDatabaseName">
          <div>registros: {{ lists.onlyOnExternalDatabase.length }}</div>
          <b-table
            striped
            hover
            :items="lists.onlyOnExternalDatabase"
            :fields="['Nome Científico', 'actions']"
            thead-class="d-none"
          >
            <template #cell(actions)="row">
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? "Esconder" : "Mostrar" }} links
              </b-button>
            </template>
            <template id="table-wrapper" #row-details="row">
              <b-table :items="row.item['Fontes']" thead-class="d-none">
              </b-table>
            </template>
          </b-table>
        </b-card>
        <b-card border-variant="info" class="m-1" title="Intersecção">
          <div>registros: {{ lists.intersection.length }}</div>
          <b-table striped hover :items="lists.intersection"
          :fields="['Nome Científico', 'actions']"
            thead-class="d-none"
          >
            <template #cell(actions)="row">
              <b-button size="sm" @click="row.toggleDetails">
                {{ row.detailsShowing ? "Esconder" : "Mostrar" }} links
              </b-button>
            </template>
            <template id="table-wrapper" #row-details="row">
              <b-table :items="row.item['Fontes']" thead-class="d-none">
              </b-table>
            </template>
          </b-table>
        </b-card>
        <b-card border-variant="info" class="m-1" title="Somente no BioOnline">
          <div>registros: {{ lists.onlyOnBioOnline.length }}</div>
          <b-table striped hover :items="lists.onlyOnBioOnline"> </b-table>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lists", "externalDatabaseName"],
  components: {},
  data() {
    return {};
  },
  methods: {
    showLists() {
      if (!this.$props.lists.onlyOnExternalDatabase) {
        return false;
      }
      let total =
        this.$props.lists.onlyOnExternalDatabase.length +
        this.$props.lists.intersection.length;
      this.$props.lists.onlyOnBioOnline.length;
      return total > 0;
    },
  },
  computed: {
    total() {
      return (
        this.$props.lists.onlyOnExternalDatabase.length +
        this.$props.lists.intersection.length +
        this.$props.lists.onlyOnBioOnline.length
      );
    },
  },
};
</script>