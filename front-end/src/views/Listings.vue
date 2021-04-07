<template>
  <div class="listings">
    <div class="header">
      <h2>Listings</h2>
    </div>


    <div class="image" v-for="item in items" :key="item.id">

      <img :src="item.path" />

      <h2>{{item.title}}</h2>
      <h2>${{item.price}}</h2>
      <h3>{{item.description}}</h3>



      <h2> Seller: {{item.user.firstName}} {{item.user.lastName}}</h2>
      <h2> Phone #: {{item.user.phone}} </h2>
      <h2> City: {{item.user.city}} </h2>
      <p class="photoDate">{{formatDate(item.created)}}</p>



    </div>




  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Listings',
  data() {
    return {
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>


<style scoped>

.image {
  padding-bottom: 3px;
  border-bottom: solid 5px black;

}

.image img {
  width: 30%;
}

.listings {
  background-color: #ffcaae;
  align-text: center;
  padding: 30px;
}

</style>
