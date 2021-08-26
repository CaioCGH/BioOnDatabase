<template>
  <div>
    <div v-for="selector in selectors" :key="selector.id">
      <b-row>
        <b-col>
          <b-form-select
            v-model="selector.selectedKey"
            :options="Object.keys(filterDict[category])"
          ></b-form-select>
        </b-col>
        <b-col>
          <b-form-select
            v-if="selector.selectedKey"
            v-model="selector.selectedValue"
            :options="filterDict[category][selector.selectedKey]['domain']"
            @change="updateFilterDictOnAdd(selector)"
          ></b-form-select>
        </b-col>
      </b-row>
    </div>

    <div class="mb-4 mt-2">
      <b-button
        @click="selectors.push({ selectedKey: '' })"
        variant="success"
        class="mr-2"
      >
        <span>Adicionar mais um filtro</span>
      </b-button>
      <b-button
        @click="
          var removed = selectors.pop();
          updateFilterDictOnRemoval(removed);
        "
        variant="danger"
        class="mr-2"
      >
        <span v-show="!loading">Remover filtro</span>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["innerMap", "innerKeys", "category"],
  data() {
    return {
      loading: false,
      selectors: [{ selectedKey: "", selectedValue: "" }],
    };
  },
  methods: {
    updateFilterDictOnRemoval(removedSelector) {
      removedSelector;
      this.$store.state.selectedFilters.pop();
      // this.$store.state.selectedFilters =
      //   this.$store.state.selectedFilters.filter((x) => {
      //     x.selectedKey != removedSelector.selectedKey;
      //   });
    },
    updateFilterDictOnAdd(selector) {
      var newSelector = { selectedKey: this.$props.category + '.' + selector.selectedKey, selectedValue: selector.selectedValue};
      this.$store.state.selectedFilters.push(newSelector);
    },
  },
  computed: {
    filterDict: {
      get() {
        return this.$store.state.filterDict;
      },
    },
    selectedFilters: {
      get() {
        return this.$store.state.selectedFilters;
      },
    },
  },
};
</script>