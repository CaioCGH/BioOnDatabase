<template>
    <div class="container">
        <h2 v-if="observationDataList.length === 1"> {{ observationDataList.length }} resultado</h2>
        <h2 v-else >{{ Object.keys(observationDataList).length }} resultados</h2>
        <div v-for="observation in observationDataList" :key="observation.id"> 
            <div class="card border-primary mb-3" >
                <div class="card-body text-primary">
                    <tr v-for="(value, key) in observation" :key="key">
                        <td>{{ key }}: </td>
                        <td>{{ value}}</td>
                    </tr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['observationDataList']
     }
</script>