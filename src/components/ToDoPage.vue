<template>
  <v-app>
    <v-row>
      <v-col cols="12">
        <header >
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
                Task
              </th>
               <th class="text-center">
                Task Owner
              </th>
               <th class="text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, i) in AllToDoS" :key="i" >
              <td class="text-center">{{task.ToDoS.id}}</td>
              <td class="text-center text-capitalize">{{task.ToDoS.title}}</td>
              <td class="text-center">{{task.ToDoOwner[0].name}}</td>
              <td class="text-center" :class="task.ToDoS.completed ? 'completed' : 'unCompleted' ">{{taskStatus(task.ToDoS.completed)}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Spinner from '@/components/Spinner.vue'
import axios from "axios";


export default {
  components: { Navbar, Spinner },
  data() {
    return {
      isDataLoaded: false,
      TemporaryData: [],
      AllToDoS: [],
    }
  },
 async mounted() {
  this.TemporaryData = await this.getAllToDoSRelationships();
  setTimeout(() => { 
    this.isDataLoaded = true;
    this.Dataload();
    }, 500);
  },
  methods: {
    async getAllToDoSRelationships() {
      const AllToDoS = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );

       const Users = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const AllToDoSData = AllToDoS.data;
      const AllUsers = Users.data;

      const filtertoDoS = AllToDoSData.map((ToDoS) => {
        const ToDoOwner = AllUsers.filter((user) => user.id === ToDoS.userId);

        return {
          ToDoS,
          ToDoOwner,
        };
      });

      return filtertoDoS;
    },
    Dataload() {
      this.AllToDoS = this.TemporaryData;
      
    },
    taskStatus(status) {
      return status ? 'Finalizada' : 'Não Finalizada' 
    }
  },
}

</script>

<style>

.completed {
  color: green;
  font-weight: bold;
}

.unCompleted {
   color: red;
  font-weight: lighter;
}

.fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
}



</style>