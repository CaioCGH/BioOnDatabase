<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Gerenciador de localidades</h1>
    <b-button
                  variant="success"
                  class="m-2"
                  v-b-modal="'modal-new-locality'"
                  @click.prevent="populateEmptyModel()"
                  >Criar nova localidade</b-button>
    <b-alert :show="loading" variant="info">Carregando...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome Banco de Dados</th>
              <th>Nome Completo</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="locality in localities" :key="locality.id">
              <td>{{ locality['Nome Banco de Dados'] }}</td>
              <td>{{ locality['Nome Completo'] }}</td>
              <td class="text-right">
                <b-button
                  class="m-2"
                  v-b-modal="'modal-observations'"
                  @click.prevent="populatePropsToObservations(locality)"
                  >Observações</b-button>
                <b-button
                  class="m-2"
                  v-b-modal="'modal-new-locality'"
                  @click.prevent="populateLocalityToEdit(locality)"
                  >Editar</b-button>
                <b-button  class="m-2"
                variant="danger"
                @click.prevent="deleteLocality(locality._id)">
                Deletar</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <ObservationsModal :locality_id="locality_id" :observations="observations"/>
    <NewLocalityModal :model="model"/>
  </div>
</template>

<script>
import {
  getAllLocalities,
  deleteLocality
} from "../components/BioOnline/BioOnlineService";

import NewLocalityModal  from "../components/BioOnline/NewLocalityModal.vue";
import ObservationsModal  from "../components/BioOnline/ObservationsModal.vue";

export default {
  components:{
    NewLocalityModal, ObservationsModal
  },
  data () {
    return {
      loading: false,
      localities: [],
      observations: [],
      model: {},
      locality_id: ''
    }
  },
  async created () {
    this.refreshLocalities()
  },
  methods: {
    async refreshLocalities () {
      this.loading = true
      this.localities = await getAllLocalities()
      this.loading = false
    },
    async populateLocalityToEdit (locality) {
      this.model = Object.assign({}, locality)
    },
    async populatePropsToObservations (locality) {
      this.locality_id = locality._id;
      this.observations = locality['Observações Registradas'];
    },
    async populateEmptyModel () {
      var locality = this.localities[0];
      var outerKeys = Object.keys(locality);
      var emptyModel = {}
      for(let i = 0; i < outerKeys.length; i++){
        var outerKey = outerKeys[i];
        if(['_id', '__v', 'Observações Registradas'].includes(outerKey)){
          console.log("continuing")
          continue;
        }
        emptyModel[outerKey] = '';
      }
      this.model = Object.assign({}, emptyModel)
    },
    async deleteLocality (_id) {
      if (confirm('Tem certeza que deseja deletar esta localidade?')) {
        if (this.model._id === _id) {
          this.model = {}
        }
        await deleteLocality(_id)
        await this.refreshLocalities()
      }
    }
  }
}
</script>