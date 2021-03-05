<template>
  <v-app>
    <v-main class="d-flex align-center text-center" cols="12">
      <spinner size="huge" message="Aguarde o carregamento dos dados..."></spinner>
    </v-main>
  </v-app>
</template>

<script>
import Spinner from 'vue-simple-spinner'
export default {  
  components: {
    Spinner
  }
}
</script>

<style>

</style>