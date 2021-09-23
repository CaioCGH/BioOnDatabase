<template>
  <div class="d-flex flex-column min-vh-100">
    <b-card class="mt-1 ml-1 mr-1 mb-1 border-primary" >
    <p>O projeto Fauna do Município de São Paulo tem como objetivo facilitar a a busca por dados sobre as diversas espécies de animais silvestres que habitam a cidade de São Paulo. Reunindo diversas fontes num único lugar, e com diversas opções de busca, o interessado, seja pesquisador ou leigo, deve se sentir a vontade para obter informações e até relatórios mais complexos.</p>
  </b-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bars: [
          { variant: 'success', value: 75 },
          { variant: 'info', value: 75 },
          { variant: 'warning', value: 75 },
          { variant: 'danger', value: 75 },
          { variant: 'primary', value: 75 },
          { variant: 'secondary', value: 75 },
          { variant: 'dark', value: 75 }
        ],
        timer: null
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.bars.forEach(bar => (bar.value = 25 + Math.random() * 75))
      }, 100)
    },
    beforeDestroy() {
      clearInterval(this.timer)
      this.timer = null
    }
  }
</script>