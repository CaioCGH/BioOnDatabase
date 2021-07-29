<template>
  <div>
    <!-- {{ animalInfoAsRows }} -->
    <b-card class="mb-2">
      <b-table
        thead-class="d-none"
        striped hover
        :items="animalInfoAsRows"
        :fields="['key', 'value', 'actions']"
        :tbody-tr-class="outerRowClass"
      >
        <template #cell(actions)="row">
          <b-button
            v-show="isDictionary(row)"
            size="sm"
            @click="row.toggleDetails"
          >
            {{ row.detailsShowing ? "Esconder" : "Mostrar" }} detalhes
          </b-button>
        </template>

        <template #cell(value)="data">
          <span v-b-tooltip.hover :title="conservationStatusDict[data.value]">{{
            data.value
          }}</span>
        </template>

        <template #row-details="row">
          <b-card>
            <b-table
            thead-class="d-none"
              striped hover
              :items="row.item.innerObject"
              :fields="['column1', 'column2', 'actions']"
            >
              <template #cell(actions)="row">
                <b-button  v-show="isDictionary(row)" @click="row.toggleDetails">Detalhes</b-button>
              </template>
              <template #row-details="row">
                <b-table thead-class="d-none" :items="row.item.innerObject"></b-table>
              </template>

            </b-table>
          </b-card>
        </template>
      </b-table>
    </b-card>
  </div>
</template>
<script>
export default {
  props: ["animalInfo"],

  data() {
    return {
      animalInfoAsRows: [],
    };
  },
  created() {
    this.transformAnimalDictIntoRows();
  },
  methods: {
    newtransformAnimalDictIntoRows(){

    },
    transformAnimalDictIntoRows() {
      const entries = Object.entries(this.$props.animalInfo);
      for (var i = 0; i < entries.length; i++) {
        if(Array.isArray(entries[i][1])){
          const arrayOfObservationsAsObjects = entries[i][1];
          const arrayOfObservationsAsArrays = [];
          for(let j = 0; j < arrayOfObservationsAsObjects.length; j++){
            const observationAsObject = arrayOfObservationsAsObjects[j];
            const observationKeys = Object.keys(observationAsObject);
            const observationAsArray = [];
            for(let k = 0; k < observationKeys.length; k++){
              const key = observationKeys[k];
              if(key != '_id'){
                observationAsArray.push({
                  'column1': key,
                  'column2': observationAsObject[key]
                  });
              }
            }
            arrayOfObservationsAsArrays.push(
              {'column1': observationAsObject['Localidade'],
              'innerObject': observationAsArray});
          }
          this.animalInfoAsRows.push({
            key: entries[i][0],
            innerObject: arrayOfObservationsAsArrays,
          });
          continue;
        }
        if (typeof entries[i][1] === "object") {
          var innerEntries = Object.entries(entries[i][1]);
          var objectAsArrayForTable = [];
          for (var j = 0; j < innerEntries.length; j++) {//abre o objeto e vai pushando cada atributo
            objectAsArrayForTable.push({
              column1: innerEntries[j][0],
              column2: innerEntries[j][1],
            });
          }
          this.animalInfoAsRows.push({
            key: entries[i][0],
            innerObject: objectAsArrayForTable,
          });
        } else {//atributos string (nome científico e comum)
          this.animalInfoAsRows.push({
            key: entries[i][0],
            value: entries[i][1],
          });
        }
      }
      console.log(this.animalInfoAsRows);
    },
    outerRowClass(item) {
      if (this.$store.state.selectedArrayToCards.includes(item.key)) {
        return "";
      }
      const innerObject = this.$props.animalInfo[item.key];
      const innerKeys = Object.keys(innerObject);
      for (let i = 0; i < innerKeys.length; i++) {
        if (this.$store.state.selectedArrayToCards.includes(innerKeys[i])) {
          return "";
        }
      }
      return "d-none";
    },
    isDictionary(row) {
      return row.item.innerObject !== undefined;
    },
  },
  computed: {
    conservationStatusDict: {
      get() {
        return this.$store.state.conservationStatusDict;
      },
    },
  },
};
</script>
