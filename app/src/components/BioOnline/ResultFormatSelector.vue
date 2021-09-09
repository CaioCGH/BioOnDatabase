<template>
  <b-card
  border-variant="info"
      class="m-1"
    >
    <b-card-header>
          <h4>Formato do resultado</h4>
      </b-card-header>
    <form>
      <div class="row">
        <div class="form-group col-md-9">
          <b-form-group
            label="Formato do resultado:"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio
              v-model="displayType"
              :aria-describedby="ariaDescribedby"
              value="display_cards"
              >Lista de cartões</b-form-radio
            >
            <b-form-radio
              v-model="displayType"
              :aria-describedby="ariaDescribedby"
              value="display_table"
              >Tabela</b-form-radio
            >

            <b-form-radio
              v-model="displayType"
              :aria-describedby="ariaDescribedby"
              value="display_tree"
              >Árvore taxonômica</b-form-radio
            >
          </b-form-group>
        </div>
      </div>
    </form>
  </b-card>
</template>
<script>
export default {
  computed: {
    displayType: {
      get() {
        return this.$store.state.displayType;
      },
      set(value) {
        this.$store.commit("updateDisplayType", value);
      },
    },
    animalRows: {
      get() {
        return this.$store.state.animalRows;
      },
      set(value) {
        this.$store.commit("updateAnimalRows", value);
      },
    },
  },
};
</script>