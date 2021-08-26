<template>
  <div>
    <b-modal id="modal-new-observation">
      <b-card
        :title="
          model['_id']
            ? 'Editar Observação ' + model['Nome Científico']
            : 'Criar observação'
        "
      >
        <form
          @submit.prevent="saveObservation(model._id)"
        >
          <div v-for="(value, key) in model" :key="key.id">
            <b-form-group v-if="!['_id', '__v'].includes(key)">
              <h5>{{ key }}</h5>
              <div v-if="key == 'Localidade'">
                <b-form-select
                    v-model="model[key]"
                    :options="localityNames"
                  ></b-form-select>
              </div>
              <div v-else-if="isObject(model[key])">
                <div
                  v-for="(innerValue, innerKey) in model[key]"
                  :key="innerKey.id"
                >
                  {{ innerKey + 1 }}° observador(a)
                  <b-form-select
                    v-model="model[key][innerKey]"
                    :options="observersNames"
                  ></b-form-select>
                </div>
                <div class="mb-4 mt-2">
                  <b-button
                    @click="model[key].push('')"
                    variant="success"
                    class="mr-2"
                  >
                    <span>Adicionar</span>
                  </b-button>
                  <b-button
                    @click="
                      model[key].pop();
                      update();
                    "
                    variant="danger"
                    class="mr-2"
                  >
                    <span >Remover</span>
                  </b-button>
                </div>
              </div>
              <div v-else>
                <b-form-input type="text" v-model="model[key]"></b-form-input>
              </div>
            </b-form-group>
          </div>
          <div>
            <b-button v-b-modal="'ok-modal-2'" type="submit" variant="success"
              >Salvar</b-button
            >
          </div>
        </form>
      </b-card>
      <OkModal2 :message="saveMessage" />
    </b-modal>
  </div>
</template>
<script>
import {
  findAllObservers,
  getBioOnlineLocalities,
  updateObservation
} from "./BioOnlineService";
import { createObservation } from "./BioOnlineService";
import OkModal2 from "../Geral/OkModal2.vue";

export default {
  props: ["model"],
  components: {
    OkModal2,
  },
  data() {
    return {
      saveMessage: "Aconteceu alguma coisa de errado",
      observers: {},
      observersNames: [],
      localityNames: []
    };
  },
  created() {
    this.feedObservers();
    this.feedLocalities();
  },
  methods: {
    isObject(subject) {
      return typeof subject === "object";
    },
    feedObservers() {
      findAllObservers().then((value) => {
        this.observersNames = Object.keys(value);
      });
    },
    feedLocalities() {
      getBioOnlineLocalities().then((value) => {
        this.localityNames = value;
      });
    },
    async saveObservation() {
      var newModel = this.model;
      if (this.model._id) {
        newModel = await updateObservation(this.model._id, this.model);
      } else {
        newModel = await createObservation(this.model);
      }

      if (newModel == this.model) {
        this.saveMessage = "Nenhuma propriedade foi alterada";
      } else if (!newModel.species) {
        this.saveMessage = "Erro ao salvar observação na espécie";
      } else if (!newModel.locality) {
        this.saveMessage = "Erro ao salvar observação na localidade";
      } else {
        this.saveMessage = "Observação salva com sucesso";
      }
      this.$emit('savedObservation')
    },
    refreshModel(newModel) {
      this.model = newModel;
    },
  },
};
</script>