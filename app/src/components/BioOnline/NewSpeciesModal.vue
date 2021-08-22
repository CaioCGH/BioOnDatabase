<template>
  <div>
    <b-modal id="modal-new-species">
      <b-card :title="(model['Nome Científico'] ? 'Editar Espécie ' + model['Nome Científico'] : 'Editar espécie')">
          <form @submit.prevent="saveSpecies(model._id)" @submit="$parent.refreshSpecies()">
            <div v-for="(value, key) in model" :key="key.id">
            <b-form-group v-if="!['_id', '__v', 'Observações Registradas', 'Observações Extras'].includes(key)">
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
  updateSpecies,
  createSpecies
} from "./BioOnlineService";
import OkModal from "../Geral/OkModal.vue"


export default {
    props: ['model'],
  components:{
        OkModal,
  },
  data () {
    return {
      saveMessage: ""
    }
  },
  methods: {
    isObject(subject){
      return typeof subject === 'object'
    },
    async saveSpecies () {
      var newModel = this.model;
      if (this.model._id) {
        newModel = await updateSpecies(this.model._id, this.model)
      } else {
        newModel = await createSpecies(this.model)
      }
      if(newModel == this.model){
        this.saveMessage = "Nenhuma propriedade foi alterada"
      }else if(!newModel._id){
        this.saveMessage = "Erro ao salvar espécie"
      }else{
        this.saveMessage = "Espécie salva com sucesso"
      }
      this.refreshModel( this.model);
    },
    refreshModel(newModel){
      this.model = newModel;
    }
  }
}
</script>