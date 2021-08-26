<template>
  <div>
    <b-modal id="modalId">
      <b-container fluid>
        Selecione o formato do arquivo para baixar:
        <div>
          <b-form-select
            v-model="selectedFormat"
            :options="options"
          ></b-form-select>
        </div>
      </b-container>
      <template #modal-footer="{ cancel }">
        <b-button
          size="sm"
          variant="primary"
          @click="
            download();
            cancel();
          "
        >
          <span v-show="!loading">Baixar lista</span>
          <b-spinner
            v-show="loading"
            small
            variant="primary"
            label="Spinning"
          ></b-spinner>
          <span v-show="loading">Aguarde, carregando</span>
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancelar
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { downloadFromLocalities } from "./BioOnlineService";

export default {
  props: ['timesOpened'],
  data() {
    return {
      loading: false,
      selectedFormat: ".xls",
      options: [
        { text: ".xls", value: ".xls", disabled: false },
        { text: ".csv (em breve)", disabled: true },
        { text: ".pdf (em breve)", disabled: true },
        { text: ".json (em breve)", disabled: true },
      ],
    };
  },
  methods: {
    download() {
      this.loading = true;
      const payload = {
        localities: this.$store.state.localitiesWrapper.map(e => e.chosenLocality),
        selectedArray: this.$store.state.selectedArrayToTable,
        filters: this.$store.state.selectedFilters};
      downloadFromLocalities(payload ).then((value) => {
        value;
      });
      this.loading = false;
    }
  },
  created(){
    console.log(this.selectedFormat);
  },
  computed: {
    localitiesWrapper: {
      get() {
        return this.$store.state.localitiesWrapper;
      }
    }
  }
};
</script>
