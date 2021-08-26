<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Gerenciador de observadores</h1>
    <b-button
                  variant="success"
                  class="m-2"
                  v-b-modal="'modal-new-observer'"
                  @click.prevent="populateEmptyModel()"
                  >Criar novo observador</b-button>
    <b-alert :show="loading" variant="info">Carregando...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>nome</th>
              <th>sigla</th>
              <th>vínculo</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="observer in observers" :key="observer.id">
              <td>{{ observer['nome'] }}</td>
              <td>{{ observer['sigla'] }}</td>
              <td>{{ observer['vínculo'] }}</td>
              <td class="text-right">
                <b-button
                  class="m-2"
                  v-b-modal="'modal-new-observer'"
                  @click.prevent="populateObserverToEdit(observer)"
                  >Editar</b-button>
                <b-button  class="m-2"
                variant="danger"
                @click.prevent="deleteObserver(observer._id)">
                Deletar</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <NewObserverModal :model="model"/>
  </div>
</template>

<script>
import {
  getAllObservers,
  deleteObserver
} from "../components/BioOnline/BioOnlineService";

import NewObserverModal  from "../components/BioOnline/NewObserverModal.vue";

export default {
  components:{
    NewObserverModal
  },
  data () {
    return {
      loading: false,
      observers: [],
      observations: [],
      model: {},
      observer_id: ''
    }
  },
  async created () {
    this.refreshObservers()
  },
  methods: {
    async refreshObservers () {
      this.loading = true
      this.observers = await getAllObservers()
      this.loading = false
    },
    async populateObserverToEdit (observer) {
      this.model = Object.assign({}, observer)
    },
    async populateEmptyModel () {
      var observer = this.observers[0];
      var outerKeys = Object.keys(observer);
      var emptyModel = {}
      for(let i = 0; i < outerKeys.length; i++){
        var outerKey = outerKeys[i];
        if(['_id', '__v', 'Observações Registradas'].includes(outerKey)){
          continue;
        }
        emptyModel[outerKey] = '';
      }
      this.model = Object.assign({}, emptyModel)
    },
    async deleteObserver (_id) {
      if (confirm('Tem certeza que deseja deletar este(a) observador?')) {
        if (this.model._id === _id) {
          this.model = {}
        }
        await deleteObserver(_id)
        await this.refreshObservers()
      }
    }
  }
}
</script>