<template>
  <div>
    <b-modal id="modal-new-species">
      <b-card :title="(model['Nome Científico'] ? 'Editar Espécie ' + model['Nome Científico'] : 'Editar espécie')">
          <form @submit.prevent="saveSpecies(model._id)">
            <b-form-group label="Nome Científico">
              <b-form-input type="text" v-model="model['Nome Científico']"></b-form-input>
            </b-form-group>
            <b-form-group label="Nome Comum">
              <b-form-input type="text" v-model="model['Nome Comum']"></b-form-input>
            </b-form-group>
            <b-form-group label="Nome em Inglês">
              <b-form-input type="text" v-model="model['Taxonomia']['Nome em Inglês']"></b-form-input>
            </b-form-group>
                <div>
              <b-btn type="submit" variant="success">Salvar</b-btn>
            </div>
          </form>
        </b-card>
    </b-modal>
  </div>
</template>
<script>
import {
//   getAllSpecies,
  // getSpecies,
  updateSpecies,
  createSpecies,
  deleteSpecies
} from "./BioOnlineService";


export default {
    props: ['model'],
  components:{
  },
  data () {
    return {
    }
  },
  methods: {
    async saveSpecies () {
      if (this.model._id) {
        await updateSpecies(this.model._id, this.model)
      } else {
        await createSpecies(this.model)
      }
      this.model = {} // reset form
      await this.refreshSpecies()
    },
    async deleteSpecies (_id) {
      if (confirm('Are you sure you want to delete this post?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model._id === _id) {
          this.model = {}
        }
        await deleteSpecies(_id);
        await this.refreshSpecies();
      }
    }
  }
}
</script>