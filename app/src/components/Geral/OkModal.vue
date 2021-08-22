<template>
  <div>
    <b-modal id="ok-modal">
      {{message}}
    </b-modal>
  </div>
</template>
<script>


export default {
    props: ['message'],
  components:{
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>