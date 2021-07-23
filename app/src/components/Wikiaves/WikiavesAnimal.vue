<template>
    <div class="container">
            <div class="card border-primary mb-3" >
                <img v-bind:src="animalData.mainImg" />
                <img v-bind:src="'https://www.wikiaves.com.br' + animalData.ocurrencesMap" />
                <div class="card-body text-primary">
                    <tr v-for="(value, key) in animalData.taxonomy" :key="key">
                        <td>{{ key }}</td>
                        <td>{{ value}}</td>
                    </tr>
                </div>
                <a v-bind:href="animalData.url">Fonte</a>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'WikiavesAnimal',
        props: ['animalData']
     }
</script>