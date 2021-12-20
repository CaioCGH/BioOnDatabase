<template>
  <b-container>
    <b-row class="vh-60" align-v="center">
      <b-col>
        <img
          class="m-4"
          style="width: 100%"
          :src="getImgUrl(selectedImage)"
          alt=""
        />
      </b-col>
      <b-col class="m-4">
        <p>
          O Fauna Sampa tem como objetivo disponibilizar e facilitar o acesso
          aos dados sobre a diversidade da fauna silvestre das áreas verdes da
          Cidade de São Paulo, reunindo as informações do Inventário da Fauna
          Silvestre da Prefeitura de São Paulo com os sites de Ciência Cidadã
          eBird, WikiAves e iNaturalist.
        </p>

        <p>
          Estão disponíveis as informações taxonômicas das espécies, aspectos da
          sua biologia, estado de conservação e ocorrência nas áreas verdes.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      imagePaths: ["1.jpeg", "2.jpeg", "3.jpeg", "4.png"],
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("../../assets/mainImage" + pic);
    },
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    },
  },
  created() {
    this.selectedImage = this.randomItem(this.imagePaths);
  },
};
</script>

<style>

p{
    font-size: 200px!important;
    color: dimgray;
}

</style>