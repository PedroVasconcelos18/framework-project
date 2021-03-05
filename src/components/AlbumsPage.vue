<template>
  <v-app>
    <v-row>
      <v-col cols="12">
        <header>
          <Navbar class="fixed-top" />
        </header>
      </v-col>
    </v-row>

    <v-spacer></v-spacer>

    <div v-if="isDataLoaded === false">
      <Spinner :isLoading="isDataLoaded" />
    </div>
    <div v-else>      
         <br /><br /><br />
      <v-simple-table class="pa-4" width="100">
        <template class="d-flex justify-center align-center items-center" >
          <thead>
            <tr>
              <th class="text-center">
                Id
              </th>
              <th class="text-center">
                Album Title
              </th>
              <th class="text-center">
                Album Photos Numbers
              </th>
              <th class="text-center">
                Album Owner
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(album, i) in AllAlbumsPhotos" :key="i" >
              <td class="text-center">{{album.AlbumData.id}}</td>
              <td class="text-capitalize text-center">{{album.AlbumData.title}}</td>
              <td class="text-center"> {{album.AlbumPhotos.length}} </td>
              <td class="text-center"> {{ getAlbumOwner(album.AlbumData.userId)[0].email }} </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-app>
</template>

<script>
import Navbar from './Navbar.vue'
import axios from "axios";
import Spinner from './Spinner'


export default {
  components: { Navbar, Spinner },
  data() {
    return {
      isDataLoaded: false,
      AllAlbumsPhotos: [],
      AllUsers: [],
      TemporaryData: [],
    }
  },
 async mounted() {
    this.TemporaryData = await this.getAllAlbumsRelationships();
    setTimeout(() => { 
      this.Dataload();
    }, 500);
  },
  methods: {
    async getAllAlbumsRelationships() {
      const AllAlbums = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const AlbumsPhotos = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
       const Users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const AllAlbumsData = AllAlbums.data;
      const AlbumsPhotosData = AlbumsPhotos.data;
      this.AllUsers = Users.data;

      const filterAlbums = AllAlbumsData.map((AlbumData) => {
        const AlbumPhotos = AlbumsPhotosData.filter((photo) => photo.albumId === AlbumData.id);

        return {
          AlbumData,
          AlbumPhotos,
        };
      });

      return filterAlbums;
    },
    getAlbumOwner(UserID) {  

      const AlbumOwner = this.AllUsers.filter((user) => user.id === UserID);

      return AlbumOwner;
    },
    Dataload() {
      this.AllAlbumsPhotos = this.TemporaryData;
      this.isDataLoaded = true;
    },
  },
}

</script>

<style>

.fixed-top {
    position: fixed;
    z-index: 1030;
}

</style>