<template>
  <div>
    <b-modal id="modal-new-locality">
      <b-card :title="(model['Nome Completo'] ? 'Editar Localidade ' + model['Nome Completo'] : 'Criar localidade')">
          <form @submit.prevent="saveLocality(model._id)" @submit="$parent.refreshLocalities()">
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
  updateLocality,
  createLocality
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
    async saveLocality () {
        console.log("this.model", this.model);
      var newModel = this.model;
      if (this.model._id) {
        newModel = await updateLocality({_id: this.model._id, model: this.model})
      } else {
        newModel = await createLocality({model: this.model});
      }
      if(newModel == this.model){
        this.saveMessage = "Nenhuma propriedade foi alterada"
      }else if(!newModel._id){
        this.saveMessage = "Erro ao salvar localidade"
      }else{
        this.saveMessage = "Localidade salva com sucesso"
      }
      this.refreshModel( this.model);
    },
    refreshModel(newModel){
      this.model = newModel;
    }
  }
}
</script>