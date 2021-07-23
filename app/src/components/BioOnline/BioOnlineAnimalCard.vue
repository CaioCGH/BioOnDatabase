<template>
<div>
    <b-card
    class="mb-2"
  >
     <b-table
     thead-class="d-none"
     striped hover 
     :items="animalInfoAsRows"
     :fields="['key', 'value', 'actions']"
     :tbody-tr-class="rowClass"
     >
     <template #cell(actions)="row">
        <b-button v-show="isDictionary(row)" size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Esconder' : 'Mostrar' }} detalhes
        </b-button>
      </template>

      <template #cell(value)="data">
        <span v-b-tooltip.hover :title="conservationStatusDict[data.value]">{{ data.value}}</span>
      </template>

      <template #row-details="row">
            <b-card>
            <b-table
     striped hover
     :items="row.item.innerObject"
     :fields="['local', 'detalhes']"
     ></b-table>
        </b-card>
      </template>
     </b-table>
  </b-card>
    <div>
  </div>
  </div>
</template>
<script>

export default {
      props: ["animalInfo"],
      

    data() {
        return {
            animalInfoAsRows: [],
            row: {}
        }
    },
    created(){
this.transformAnimalDictIntoRows();
    },
    methods:{
        transformAnimalDictIntoRows(){
            const entries = Object.entries(this.$props.animalInfo);
            for(var i = 0; i < entries.length; i++){
                if(typeof entries[i][1] === 'object'){
                    var innerEntries = Object.entries(entries[i][1])
                    var objectAsArrayForTable = [];
                    for(var j = 0; j < innerEntries.length; j++){
                        objectAsArrayForTable.push({local: innerEntries[j][0], detalhes: innerEntries[j][1]})
                    }
                    this.animalInfoAsRows.push({key: entries[i][0], innerObject: objectAsArrayForTable});
                }else{
                    this.animalInfoAsRows.push({key: entries[i][0], value: entries[i][1]});
                }
            }
        },
        rowClass(item) {
        if (!this.$store.state.selectedArrayToCards.includes(item.key)){
            return 'd-none'
        }
      },
      isDictionary(row){
            return  row.item.innerObject !== undefined;
      }

    },
    computed:{
      conservationStatusDict:{
        get(){
          return this.$store.state.conservationStatusDict;
        }
      }
    }

}
</script>
