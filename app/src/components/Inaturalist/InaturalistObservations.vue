<template>
    <div class="container">
        <h2 v-if="observationDataList.length === 1"> {{ observationDataList.length }} resultado</h2>
        <h2 v-else >{{ Object.keys(observationDataList).length }} resultados</h2>
        <div v-for="observation in observationDataList" :key="observation.id"> 
            <div class="card border-primary mb-3" >
                <div class="card-body text-primary">
                    <tr>
                        <td>Data: </td>
                        <td>{{observation.data}}</td>
                    </tr>
                    <tr v-show="observation.descrição !== null">
                        <td>Descrição: </td>
                        <td>{{observation.descrição}}</td>
                    </tr>
                    <tr >
                        <td>Local: </td>
                        <td>{{observation.local}}</td>
                    </tr>
                    <tr >
                        <td>Fonte: </td>
                        <td><a v-bind:href="observation.uri">{{observation.uri}}</a></td>
                    </tr>
                    <tr >
                        <td>Autoria: </td>
                        <td>{{ observation.autoria }}</td>
                    </tr>
                    <img v-bind:src="observation.foto_media" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['observationDataList', 'foto_media']
     }
</script>