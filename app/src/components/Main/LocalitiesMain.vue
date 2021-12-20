<template>
  <b-container>
    <b-row class="vh-60" align-v="center">
      <b-col class="m-4">
        <h3 class="title">Áreas Verdes e Recursos Hídricos</h3>
        <p>
          As listas das espécies por área verde também são atualizadas
          constantemente, atualmente há informações acerca de:
        </p>
      </b-col>
    </b-row>
    <b-row class="vh-60">
      <b-col>
        <ul
          class="list-group"
          v-for="localityType in localityTypes"
          :key="localityType.id"
        >
          <li class="list-group-item">
            <b-spinner
              v-show="loading"
              small
              variant="primary"
              label="Spinning"
            ></b-spinner
            ><span class="number">{{ localityType.quantity }} </span>{{
            localityType.type}}
          </li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

export default {
  data() {
    return {
      imagePaths: ["1.jpeg", "2.jpeg", "3.jpeg", "4.png"],
      localityTypes: [
        { quantity: 114, type: " Parques Urbanos Municipais" },
        { quantity: 8, type: "Unidades de Conservação Municipais" },
        { quantity: 13, type: "Áreas Públicas Municipais" },
        { quantity: 9, type: "Parques Estaduais" },
        { quantity: 4, type: "Áreas Públicas Estaduais" },
        { quantity: 19, type: "Áreas Verdes Particulares" },
        { quantity: 5, type: "Corpos Hídricos" },
      ],
      histogram: {},
      loading: false,
    };
  },
  methods: {},
  created() {},
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

.number {
  color: peru !important;
  font-weight: bold;
  font-size: 100%;
}
/* .list-group .list-group-item:hover {
  background-color: red;
} */
</style>
