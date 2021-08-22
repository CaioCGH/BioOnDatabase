<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Gerenciador de espécies</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Nome Cinetífico</th>
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
                  v-b-modal="'modal-new-species'"
                  @click.prevent="populateSpeciesToEdit(species)"
                  >Editar</b-button>
                <!-- <a href="#" @click.prevent="populateSpeciesToEdit(species)">Editar</a> -->
                <a href="#" @click.prevent="deleteSpecies(species.id)">Deletar</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <NewSpeciesModal :model="model"/>
  </div>
</template>

<script>
import {
  getAllSpecies,
  updateSpecies,
  createSpecies,
  deleteSpecies
} from "../components/BioOnline/BioOnlineService";

import NewSpeciesModal  from "../components/BioOnline/NewSpeciesModal.vue";

export default {
  components:{
    NewSpeciesModal
  },
  data () {
    return {
      loading: false,
      speciesList: [],
      model: {}
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
    async saveSpecies () {
      if (this.model.id) {
        await updateSpecies(this.model.id, this.model)
      } else {
        await createSpecies(this.model)
      }
      this.model = {} // reset form
      await this.refreshSpecies()
    },
    async deleteSpecies (id) {
      if (confirm('Are you sure you want to delete this post?')) {
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