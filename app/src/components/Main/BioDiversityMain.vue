<template>
  <b-container>
    <b-row class="vh-60" align-v="center">
      <b-col class="m-4">
        <h3 class="title">Conheça nossa Biodiversidade</h3>
        <p>
          O banco de dados das espécies catalogadas por área verde da Cidade é
          atualizado constantemente. Atualmente há informações acerca de:
        </p>
      </b-col>
    </b-row>
    <b-row class="vh-60">
      <b-col>
        <h4>Invertebrados</h4>
        <ul class="list-group"
          v-for="invertebrate in invertebrates"
          :key="invertebrate.id"
        >
          <li class="list-group-item">
            <b-spinner
              v-show="loading"
              small
              variant="primary"
              label="Spinning"
            ></b-spinner
            ><span class="number" >{{ histogram[invertebrate.name] }} </span>espécies de
            {{ invertebrate.translation }}</li
          >
        </ul>
      </b-col>
      <b-col>
        <h4>Vertebrados</h4>
        <ul class="list-group"
          v-for="vertebrate in vertebrates"
          :key="vertebrate.id"
        >
          <li class="list-group-item">
            <b-spinner
              v-show="loading"
              small
              variant="primary"
              label="Spinning"
            ></b-spinner
            ><span class="number" >{{ histogram[vertebrate.name] }} </span>espécies de
            {{ vertebrate.translation }}</li
          >
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { bioOnlineSearchAnimalsInLocalities } from "../BioOnline/BioOnlineService";
import { createHistogram } from "./HistogramMaker.js";

export default {
  data() {
    return {
      imagePaths: ["1.jpeg", "2.jpeg", "3.jpeg", "4.png"],
      vertebrates: [
        {
          name: "Osteichtyes",
          taxonomyLevel: "Taxonomia.Classe",
          translation: "Peixes",
          quantity: null,
        },
        {
          name: "Amphibia",
          taxonomyLevel: "Taxonomia.Classe",
          translation: "Anfíbios",
          quantity: null,
        },
        {
          name: "Reptilia",
          taxonomyLevel: "Taxonomia.Classe",
          translation: "Répteis",
          quantity: null,
        },
        {
          name: "Aves",
          taxonomyLevel: "Taxonomia.Classe",
          translation: "Aves",
          quantity: null,
        },
        {
          name: "Mammalia",
          taxonomyLevel: "Taxonomia.Classe",
          translation: "Mamíferos",
          quantity: null,
        },
      ],
      invertebrates: [
        {
          name: "Mollusca",
          taxonomyLevel: "Taxonomia.Filo",
          translation: "Moluscos",
          quantity: null,
        },
        {
          name: "Crustacea",
          taxonomyLevel: "Taxonomia.Subfilo",
          translation: "Crustáceos",
          quantity: null,
        },
        {
          name: "Araneae",
          taxonomyLevel: "Taxonomia.Ordem",
          translation: "Aranhas",
          quantity: null,
        },
        {
          name: "Insecta",
          taxonomyLevel: "Taxonomia.Classe",
          translation: "Insetos",
          quantity: null,
        },
      ],
      histogram: {},
      loading: true,
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../../assets/mainImage" + pic);
    },
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    },
    createHistogram() {
      const filters = [];
      for (let i = 0; i < this.vertebrates.length; i++) {
        filters.push({
          selectedKey: this.vertebrates[i]["taxonomyLevel"],
          selectedValue: this.vertebrates[i]["name"],
        });
      }
      for (let i = 0; i < this.invertebrates.length; i++) {
        filters.push({
          selectedKey: this.invertebrates[i]["taxonomyLevel"],
          selectedValue: this.invertebrates[i]["name"],
        });
      }
      bioOnlineSearchAnimalsInLocalities({
        localities: ["Município de São Paulo"],
        filters: filters,
        filterCompositionType: "OR",
      }).then((response) => {
        this.histogram = createHistogram(response);
        this.loading = false;
      });
    },
  },
  created() {
    this.createHistogram();
  },
};
</script>

<style>
p {
  font-size: 130% !important;
  color: dimgray;
}

h3 {
  color: peru !important;
  font-weight: bold;
}

.list-group .list-group-item {
  background-color: blanchedalmond;
  border: 0px;
}

.number{
color: peru !important;
  font-weight: bold;
  font-size: 100%;
}
/* .list-group .list-group-item:hover {
  background-color: red;
} */
</style>