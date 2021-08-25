<template>
  <div>
    <b-modal id="modal-observations">
        <h4>Observações Registradas</h4>
        <b-button
                  variant="success"
                  class="m-2"
                  v-b-modal="'modal-new-observation'"
                  @click.prevent="populateEmptyModel()"
                  >Inserir nova observação</b-button>
      <b-row>
        <b-col>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Nome Científico</th>
                <th>Nome Comum</th>
                <th>Localidade</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="observation in observations" :key="observation.id">
                <td>{{ observation["Nome Científico"] }}</td>
                <td>{{ observation["Nome Comum"] }}</td>
                <td>{{ observation["Localidade"] }}</td>
                <td class="text-right">
                  <b-button
                    class="m-2"
                    v-b-modal="'modal-new-observation'"
                    @click.prevent="populateObservationToEdit(observation)"
                    >Editar</b-button
                  >
                  <b-button
                    class="m-2"
                    variant="danger"
                    v-b-modal="'ok-modal'"
                    @click.prevent="deleteObservation(observation)"
                  >
                    Deletar</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <NewObservationModal :model="model" @savedObservation="refreshObservations" />
      <OkModal :message="modalMessage" />
    </b-modal>
  </div>
</template>
<script>
import {
  getObservationsOfSpecies,
  getObservationsOfLocality,
//   createObservations,
//   updateObservation,
  deleteObservation
} from "./BioOnlineService";

import NewObservationModal  from "./NewObservationModal.vue";
import OkModal from "../Geral/OkModal.vue"

export default {
  props: ['species_id', 'locality_id', 'observations'],
  components:{
    NewObservationModal,
    OkModal
  },
  data () {
    return {
      loading: false,
    //   observations: [],
      model: {},
      modalMessage : 'Algo de inesperado aconteceu'
    }
  },
  async created () {
    // this.refreshObservations()
  },
  methods: {
    async refreshObservations () {
      this.loading = true;
      console.log("REFRESHING!");
      if(this.$props.species_id){
          this.$props.observations = await getObservationsOfSpecies({_id :this.$props.species_id})
      }else if(this.$props.locality_id){
          this.$props.observations = await getObservationsOfLocality({_id: this.$props.locality_id})
      }
      this.loading = false
    },
    async populateObservationToEdit (observation) {
      this.model = Object.assign({}, observation)
    },
    async populateEmptyModel () {
      var emptyModel = {
        'Observadores':[''],
        'Nome Científico': this.$props.observations[0]['Nome Científico'],
        'Nome Comum': this.$props.observations[0]['Nome Comum'],
        'Localidade': '',
        'Registro Original': '',
        'Data': ''
      }
      this.model = emptyModel;
    },
    async deleteObservation (model) {
      if (confirm('Tem certeza que deseja deletar esta observação?')) {
        var result = await deleteObservation(model);
        console.log(result);
        if(!result.species){
            this.modalMessage = 'Problema ao deletar a observação na espécie'
        }else if(!result.locality){
            this.modalMessage = 'Problema ao deletar a observação na localidade'
        }else{
            this.modalMessage = 'Observação deletada com sucesso'
        }
        await this.refreshObservations()
      }
    }
  }
}
</script>