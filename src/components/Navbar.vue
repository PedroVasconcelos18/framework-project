<template>
  <v-container>
    <v-app-bar
      dense
      color="#e7e3ff"
    >
      <router-link class="mr-5 black--text" exact-active-class="active" to="/">
        <span class="material-icons"> 
          home 
        </span>
      </router-link>
      <router-link class="mr-5 black--text" to="/posts">Posts</router-link>
      <router-link class="mr-5 black--text" to="/albums">Albums</router-link>
      <router-link class="mr-5 black--text" to="/todos">To Dos</router-link>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {

}
</script>

<style>


</style>