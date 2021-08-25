<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Gerenciador de espécies</h1>
    <b-button
                  variant="success"
                  class="m-2"
                  v-b-modal="'modal-new-species'"
                  @click.prevent="populateEmptyModel()"
                  >Criar nova espécie</b-button>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome Científico</th>
              <th>Nome Comum</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="species in speciesList" :key="species.id">
              <td>{{ species['Nome Científico'] }}</td>
              <td>{{ species['Nome Comum'] }}</td>
              <td class="text-right">
                <b-button
                  class="m-2"
                  v-b-modal="'modal-observations'"
                  @click.prevent="populatePropsToObservations(species)"
                  >Observações</b-button>
                <b-button
                  class="m-2"
                  v-b-modal="'modal-new-species'"
                  @click.prevent="populateSpeciesToEdit(species)"
                  >Editar</b-button>
                <b-button  class="m-2"
                variant="danger"
                @click.prevent="deleteSpecies(species._id)">
                Deletar</b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <ObservationsModal :species_id="species_id" :observations="observations"/>
    <NewSpeciesModal :model="model"/>
  </div>
</template>

<script>
import {
  getAllSpecies,
  deleteSpecies
} from "../components/BioOnline/BioOnlineService";

import NewSpeciesModal  from "../components/BioOnline/NewSpeciesModal.vue";
import ObservationsModal  from "../components/BioOnline/ObservationsModal.vue";

export default {
  components:{
    NewSpeciesModal, ObservationsModal
  },
  data () {
    return {
      loading: false,
      speciesList: [],
      observations: [],
      model: {},
      species_id: ''
    }
  },
  async created () {
    this.refreshSpecies()
  },
  methods: {
    async refreshSpecies () {
      this.loading = true
      this.speciesList = await getAllSpecies()
      this.loading = false
    },
    async populateSpeciesToEdit (species) {
      this.model = Object.assign({}, species)
    },
    async populatePropsToObservations (species) {
      this.species_id = species._id;
      this.observations = species['Observações Registradas'];
    },
    async populateEmptyModel () {
      var species = this.speciesList[0];
      var outerKeys = Object.keys(species);
      var emptyModel = {}
      for(let i = 0; i < outerKeys.length; i++){
        var outerKey = outerKeys[i];
        console.log(outerKey);
        if(['_id', '__v', 'Observações Registradas'].includes(outerKey)){
          console.log("continuing")
          continue;
        }
        if(typeof species[outerKey] === 'object'){
          var innerKeys = Object.keys(species[outerKey]);
          for(let j = 0; j < innerKeys.length; j++){
            var innerKey = innerKeys[j];
            if(emptyModel[outerKey] == undefined){
              emptyModel[outerKey] = {};
            }
            emptyModel[outerKey][innerKey] = '';
          }
        }else{
          emptyModel[outerKey] = '';
        }
      }
      console.log(emptyModel);
      this.model = Object.assign({}, emptyModel)
    },
    async deleteSpecies (id) {
      if (confirm('Tem certeza que deseja deletar esta espécie?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await deleteSpecies(id)
        await this.refreshSpecies()
      }
    }
  }
}
</script>