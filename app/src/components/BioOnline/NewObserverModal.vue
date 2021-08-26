<template>
  <div>
    <b-modal id="modal-new-observer">
      <b-card :title="(model['nome'] ? 'Editar Observador ' + model['nome'] : 'Criar observador')">
          <form @submit.prevent="saveObserver(model._id)" @submit="$parent.refreshObservers()">
            <div v-for="(value, key) in model" :key="key.id">
            <b-form-group v-if="!['_id', '__v', 'Observações Registradas'].includes(key)">
              <h5 >{{key}}</h5>
              <b-form-input v-if="!isObject(model[key])"  type="text" v-model="model[key]"></b-form-input>
              <div v-else>
                <div v-for="(innerValue, innerKey) in model[key]" :key="innerKey.id">
                  {{ innerKey }}
                  <b-form-input  type="text" v-model="model[key][innerKey]"></b-form-input>
                  </div>
              </div>
            </b-form-group>
            
            </div>
            <div>
              <b-button v-b-modal="'ok-modal'" type="submit" variant="success">Salvar</b-button>
            </div>
          </form>
        </b-card>
        <OkModal :message="saveMessage"/>
    </b-modal>
  </div>
</template>
<script>
import {
  updateObserver,
  createObserver
} from "./BioOnlineService";
import OkModal from "../Geral/OkModal.vue"


export default {
    props: ['model'],
  components:{
        OkModal,
  },
  data () {
    return {
      saveMessage: "Algo de inesperado aconteceu"
    }
  },
  methods: {
    isObject(subject){
      return typeof subject === 'object'
    },
    async saveObserver () {
      var newModel = this.model;

      if (this.model._id) {
        newModel = await updateObserver({_id: this.model._id, model: this.model})
      } else {
        newModel = await createObserver(this.model);
      }
      if(newModel == this.model){
        this.saveMessage = "Nenhuma propriedade foi alterada"
      }else if(!newModel._id){
        this.saveMessage = "Erro ao salvar observador"
      }else{
        this.saveMessage = "Observador salvo com sucesso"
      }
      this.refreshModel( this.model);
    },
    refreshModel(newModel){
      this.model = newModel;
    }
  }
}
</script>