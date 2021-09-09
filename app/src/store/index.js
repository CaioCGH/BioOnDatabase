import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
      selectedArrayToCards: ['Nome Científico', 'Nome Comum', 'CITES (2021)', 'Observações Registradas'],
      selectedArrayToTable: ['Nome Científico', 'Nome Comum', 'CITES (2021)'],
      filterDict: {},
      selectedFilters: [],
      animalRows: [],
      mixedAnimalRows: [],
      hasSearched: false,
      displayType: 'display_tree',
      localitiesWrapper: [{chosenLocality: 'Município de São Paulo'}],
      CONCERN_CATEGORIES: ["Estado De SP (2014)",
      "Estado De SP (2018)",
      "Brasil (2014)",
      "Brasil (2018)",
      "IUCN (2014)",
      "IUCN (2019-1,2)",
      "IUCN (2020)",
      "IUCN (2020-3)",
      "IUCN (2021-1)",
      "CITES (2014)",
      "CITES (2019)",
      "CITES (2021)"],
      tooltipDict:{
        "Natureza": {
            "NatBR": "Nativa do Brasil, espécie nativa do território brasileiro, sem conhecimento da distribuição exata no território.",
            "NatAUT": "Nativa Autóctone, espécie nativa do território brasileiro, com ocorrência natural/histórica no Município de São Paulo.",
            "NatALO": "Nativa Alóctone, espécie nativa do território brasileiro, sem ocorrência histórica no Município de São Paulo, que estabeleceu população no Município sem intervenção humana, provavelmente por mudança climática, mudança na fisionomia e/ou por expansão natural da espécie.",
            "Ex": "Exótica, espécie de ocorrência natural e histórica de fora do território brasileiro, transportada e introduzida intencional ou acidentalmente pelo homem.",
            "Int": "Introduzida, sem ocorrência histórica no Município de São Paulo, transportada e introduzida intencional ou acidentalmente pelo homem e que estabeleceu população no Município.",
            "Inv": "Invasora, espécie alóctone ou exótica, considerada invasora ou com potencial invasor, ou seja, cujas características biológicas representam ameaça à biodiversidade, aos recursos genéticos e à saúde humana.",
            "NL": "Não localizada, quando não localizada na literatura a área de distribuição natural da espécie.",
            "NA": "Não se Aplica, quando não se aplica a classificação por se tratar de espécie não identificada mas cujo gênero foi identificado."
        },
        "Endemismo Mata Atlântica": {
            "EndMA": "espécie endêmica da Mata Atlântica.",
            "QE": "quase endêmica, adotada para Aves segundo classificação de Moreira-Lima (2013) que a adotou para espécies cuja área de distribuição ultrapassa em muito pouco a delimitação do bioma.",
            "NÃO": "espécie não considerada endêmica da Mata Atlântica.",
            "NL": "Não Localizada, quando não localizada na literatura a classificação quanto ao seu endemismo.",
            "NA": "Não se Aplica, quando não se aplica a classificação, por se tratar de espécie identificada até o nível do gênero ou exótica."
        },
        "Endemismo Brasil": {
            "EndBR": "espécie endêmica do território brasileiro.",
            "NÃO": "espécie não considerada endêmica do Brasil.",
            "NL": "Não Localizada, quando não localizada na literatura a classificação.",
            "NA": "Não se Aplica, quando não se aplica a classificação, por se tratar de espécie identificada até o nível do gênero ou exótica."
        },
        "Comportamento Migratório": {
            "MGT": "Migratória, espécies com populações que se afastam de seus locais de reprodução de maneira regular e sazonal e retornam a cada estação reprodutiva.",
            "MPR": "Parcialmente Migratória,espécies cuja população podem ser parte migratória, parte residente, dependendo da área de ocorrência",
            "VAG": "Vagante, espécies com ocorrência ocasional e localizada no território brasileiro, em sua maioria com registros de indivíduos isolados.",
            "RES": "Residentes, espécies que ocupam a mesma área o ano todo ou não possuem padrão de deslocamento previsível, sem fidelidade a um sítio reprodutivo específico.",
            "ND": "Não Definido, espécies com pouca ou nenhuma informação disponível, ou com dados conflitantes.",
            "*": "quando marcadas com asterisco, espécies que deve ser priorizados em estudo futuros.",
            "NL": "Não Localizada, quando não localizada na literatura a classificação.",
            "NA": "Não se Aplica, quando não se aplica a classificação, por se tratar de espécie identificada até o nível do gênero, exótica ou de outras Classes."
        },
        "Habitat": {
            "NL": "Não Localizada, quando não localizada na literatura a classificação.",
            "NA": "Não se Aplica, quando não se aplica a classificação, por se tratar de espécie identificada até o nível do gênero, exótica ou de outras Classes."
        },
        "Sensibilidade": {
            "L": "Low, do inglês baixa.",
            "M": "Medium, do inglês média.",
            "H": "High, do inglês alta.",
            "NL": "Não Localizada, quando não localizada na literatura a classificação.",
            "NA": "Não se Aplica, quando não se aplica a classificação, por se tratar de espécie identificada até o nível do gênero, exótica ou de outras Classes."
        },
        "Abundância Relativa": {
            "F": "Frequente.",
            "PF": "Pouco Frequente.",
            "R": "Raro.",
            "BC": "Bastante Comum.",
            "C": "Comum.",
            "I": "Incomum.",
            "ID": "Irregularmente distribuído.",
            "DD": "Dados Desconhecidos.",
            "NL": "Não Localizada, quando não localizada na literatura a classificação.",
            "NA": "Não se Aplica, quando não se aplica a classificação, por se tratar de espécie identificada até o nível do gênero, exótica ou de outras Classes."
        },
        "Categorias de Ameaça": {
            "CR (Critically Endangered)": "Criticamente em Perigo. Apresenta risco extremamente alto de extinção na natureza em futuro muito próximo, em decorrência de profundas alterações ambientais ou de alta redução populacional ou, ainda, de intensa diminuição da sua área de distribuição.",
            "EN (Endangered)": "Em Perigo. Risco muito alto de extinção na natureza, em decorrência de grandes alterações ambientais ou de significativa redução populacional, ou ainda, de grande diminuição da sua área de distribuição.",
            "VU (Vulnerable)": "Vulnerável. Apresenta alto risco de extinção em médio prazo, em decorrência de alterações ambientais preocupantes ou de sua redução populacional, ou ainda, da diminuição da sua área de distribuição.",
            "NT (Near Threatened)": "Quase Ameaçada. Espécie cuja avaliação quanto aos critérios não a qualifica para as categorias de ameaça citadas acima, mas mostra que ela está em vias de integrá-las em futuro próximo, se nenhuma ação de conservação for realizada.",
            "DD (Data Deficient)": "Dados Insuficientes. Espécie cujas informações disponíveis sobre sua distribuição e/ou estado de conservação de suas populações são insuficientes para realização de uma avaliação direta ou indireta sobre seu risco de extinção, reconhecendo-se a demanda por futuras pesquisas com vistas a subsidiar seu enquadramento em alguma das categorias de ameaça.",
            "LC (Least-Concern)": "Menos preocupante. Quando é avaliado segundo os critérios e não se qualifica em nenhuma das categorias de ameaça. Espécies de distribuição ampla ou abundantes normalmente são incluídos nesta categoria. Espécies raras e de distribuição restrita também podem ser classificadas como LC, desde que não haja ameaças significativas.",
            "CITES-I": "listada no Apêndice I que contém as espécies mais ameaçadas cujo comércio internacional é proibido.",
            "CITES-II": "listada no Apêndice II que contém as espécies que embora atualmente não se encontrem necessariamente em perigo de extinção, poderá vir a esta situação a menos que o comércio seja estritamente controlado.",
            "CITES-III": "listada no Apêndice III que contém as espécies incluídas por requisição de algum país que já regula o comércio destas espécies e que necessita da cooperação de outros países para prevenir a exploração ilegal ou insustentável.",
            "NL": "Não Localizada, quando a espécie não foi localizada na respectiva lista.",
            "NA": "Não se Aplica, quando não se aplica a classificação por se tratar de exemplar classificado até o nível gênero."
        }
    }
    },
    mutations: {
      updateSelectedArrayToCards(state, array){
        state.selectedArrayToCards = array;
      },
      updateSelectedArrayToTable(state, array){
        state.selectedArrayToTable = array;
      },
      updateFilterDict(state, dict){
        state.filterDict = dict;
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
  