import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
      selectedArrayToCards: ['Nome Científico', 'Nome Comum', 'Observações Registradas'],
      selectedArrayToTable: ['Nome Científico', 'Nome Comum'],
      animalRows: [],
      mixedAnimalRows: [],
      displayType: 'display_cards',
      localitiesWrapper: [{chosenLocality: 'Tudo'}],
      conservationStatusDict:{
        "CR": "(Critically Endangered): Criticamente em Perigo",
        "EN": "(Endangered): Em Perigo",
        "VU": "(Vulnerable): Vulnerável",
        "NT": "(Near Threatened):Quase Ameaçada",
        "DD": "(Data Deficient): Dados Insuficientes",
        "LC": "(Least-Concern): Menos preocupante",
        "CITES-I": "listadas no Apêndice I que contém as espécies mais ameaçadas cujo comércio internacional é proibido.",
        "CITES-II": "listadas no Apêndice II que contém as espécies que embora atualmente não se encontrem necessariamente em perigo de extinção, poderá vir a esta situação a menos que o comércio seja estritamente controlado.",
        "CITES-III": "listadas no Apêndice III que contém as espécies incluídas por requisição de algum país que já regula o comércio destas espécies e que necessita da cooperação de outros países para prevenir a exploração ilegal ou insustentável.",
        "NL": "Não Localizada",
        "NA": "Não se Aplica"
      }
    },
    mutations: {
      updateSelectedArrayToCards(state, array){
        state.selectedArrayToCards = array;
      },
      updateSelectedArrayToTable(state, array){
        state.selectedArrayToTable = array;
      },
      updateAnimalRows(state, array){
        state.animalRows = array;
      },
      updateMixedAnimalRows(state, array){
        state.mixedAnimalRows = array;
      },
      updateDisplayType(state, type){
        state.displayType = type;
      },
      updateLocalitiesWrapper(state, array){
        state.localitiesWrapper = array;
      },
      updateSelectedArrayOnLocalities(state, availableLocalities){
        let selectedArrayWithoutLocalities = state.selectedArrayToTable.filter( element => !availableLocalities.includes(element));
        state.selectedArrayToTable = selectedArrayWithoutLocalities;
        state.selectedArrayToTable.push( ...state.localitiesWrapper.map( (wrapper) => wrapper.chosenLocality));
      }
    },
    modules: {
      auth
    }
  });
  