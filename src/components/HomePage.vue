<template>
  <v-app>
    <v-row >
      <v-col cols="12" >
        <Navbar class="fixed-top" />
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="12" class="d-flex flex-column justify-center align-center items-center " >
        <h1>Bem-vindo a verificação de postagens, albums e to do's!</h1>
      </v-col>
       <v-col cols="12" class="d-flex flex-column justify-center align-center items-center ">
        <p>Utilize o menu acima para realizar toda a navegação!</p>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  components: { Navbar },

}
</script>

<style>

.fixed-top {
    position: fixed;
    z-index: 1030;
}

</style>