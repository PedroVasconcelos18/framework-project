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
              <th class="text-left">
                Id
              </th>
              <th class="text-left">
                Title
              </th>
              <th class="text-left">
                Content (Body)
              </th>
              <th class="text-left">
                Post Owner 
              </th>
              <th class="text-left">
                Comments Number 
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, i) in Posts" :key="i" >
              <td>{{post.Publishe.id}}</td>
              <td class="text-capitalize">{{post.Publishe.title}} </td>
              <td>{{post.Publishe.body}} </td>
              <td>{{post.PostOwner[0].username}} </td>
              <td>{{post.PostComment.length}}</td> 
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
      Posts: [],
      TemporaryData: [],
    }
  },
 async mounted() {
    this.TemporaryData = await this.getAllPostsRelationships();

    setTimeout(() => {
      this.Dataload();
    }, 500);
  },
  methods: {
    async getAllPostsRelationships() {
      const AllPosts = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const PostComments = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const Users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const AllPostsData = AllPosts.data;
      const PostCommentsData = PostComments.data;
      const AllUsers = Users.data;

      const filterPosts = AllPostsData.map((Publishe) => {
        const PostComment = PostCommentsData.filter((comment) => comment.postId === Publishe.id);
        const PostOwner = AllUsers.filter((user) => user.id === Publishe.userId);

        return {
          Publishe,
          PostComment,
          PostOwner,
        };
      });

      return filterPosts;
    },
    Dataload() {
      this.Posts = this.TemporaryData;
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