<template>
  <b-card
  border-variant="info"
      class="m-1"
    >
    <b-card-header>
          <h4>Dados devolvidos</h4>
      </b-card-header>
    <b-tabs v-model="selectedTab" content-class="mt-4">
      <b-form-group v-slot="{ ariaDescribedby }">
        <b-spinner
          v-show="loadingColumns"
          small
          variant="primary"
          label="Spinning"
        ></b-spinner>
        <b-tab title="Básico" active>
          <b-form-checkbox-group
            :value="selectedArrayToCards"
            :options="returnedElementsObject['Básico'].innerOptions"
            :aria-describedby="ariaDescribedby"
            :checked="selectedArrayToCards"
            @change="update(selectedArrayToCards, $event)"
          ></b-form-checkbox-group>
        </b-tab>

        <b-tab v-b-tooltip.hover title="Completo">
          <b-card
            v-for="category in Object.keys(returnedElementsObject)"
            :key="category.id"
          >
            <b-form-checkbox
              size="lg"
              v-model="returnedElementsObject[category].selected"
              @change="
                toggleAll(returnedElementsObject[category].selected, category)
              "
              >{{ category }}</b-form-checkbox
            >
            <b-form-checkbox-group
              :value="selectedArrayToCards"
              :options="returnedElementsObject[category].innerOptions"
              :aria-describedby="ariaDescribedby"
              :checked="selectedArrayToCards"
              @change="update(selectedArrayToCards, $event)"
            ></b-form-checkbox-group>
          </b-card>
        </b-tab>
      </b-form-group>
    </b-tabs>
  </b-card>
</template>

<script>
import { getBioOnlineColumns } from "./BioOnlineService";

export default {
  components: {},
  data() {
    return {
      selectedTab: null,
      loadingColumns: true,
      returnedElementsObject: {
        Básico: { selected: false },
        Taxonomia: { selected: false },
        Biologia: { selected: false },
        "Estado de Conservação": { selected: false },
        "Observações Registradas": { selected: false },
        "Número De Localidades Com Registro": {selected: true}
      },
    };
  },
  methods: {
    feedCompleteOptions() {
      getBioOnlineColumns().then((value) => {
        this.returnedElementsObject = value;
        this.returnedElementsObject["Número De Localidades Com Registro"] = {selected: true};
      });
    },
    toggleAll(checked, category) {
      this.$store.state.selectedArrayToCards =
        this.$store.state.selectedArrayToCards.filter(
          (n) => !this.returnedElementsObject[category].innerOptions.includes(n)
        );
      if (checked) {
        for (
          var i = 0;
          i < this.returnedElementsObject[category].innerOptions.length;
          i++
        ) {
          this.$store.state.selectedArrayToCards.push(
            this.returnedElementsObject[category].innerOptions[i]
          );
        }
      }
      this.update("?", this.$store.state.selectedArrayToCards);
    },
    update(item, event) {
      this.$store.state.selectedArrayToCards = event;
      let selectionToCards = this.$store.state.selectedArrayToCards;
      let selectionToTable = selectionToCards.filter(
        (e) => e != "Observações Registradas"
      );
      if (selectionToCards.includes("Observações Registradas")) {
        selectionToTable.push(
          ...this.$store.state.localitiesWrapper.map((w) => w.chosenLocality)
        );
      }
      this.$store.commit("updateSelectedArrayToTable", selectionToTable);
    },
  },
  created() {
    this.feedCompleteOptions();
    this.loadingColumns = false;
  },
  computed: {
    selectedArrayToCards: {
      get() {
        return this.$store.state.selectedArrayToCards;
      },
      set(value) {
        this.$store.commit("updateSelectedArrayToCards", value);
      },
    },
    selectedArrayToTable: {
      get() {
        return this.$store.state.selectedArrayToTable;
      },
      set(value) {
        this.$store.commit("updateSelectedArrayToTable", value);
      },
    },
  },
};
</script>