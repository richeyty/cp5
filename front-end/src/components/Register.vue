<template>

<div class="register">

  <form class="pure-form">
    <h1> Register for an account </h1>
    <fieldset>

      <input placeholder="first name" v-model="firstName">
      <input placeholder="last name" v-model="lastName">
      <input placeholder="Phone Number" v-model="phone">
      <input placeholder="City" v-model="city">
    </fieldset>
    <fieldset>
      <input placeholder="username" v-model="username">
      <input type="password" placeholder="password" v-model="password">
    </fieldset>

    <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>

  </form>



  <p v-if="error" class="error">{{error}}</p>




</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      username: '',
      password: '',
      error: '',
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async register() {
      this.error = '';
      if (!this.firstName || !this.lastName || !this.phone || !this.city || !this.username || !this.password) {
        this.error = "Please fill out all forms!";
        return;
        }
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          city: this.city,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.space-above {
  margin-top: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.register {
  padding: 120px;
  display: flex;
  jusify-content: center;
  background-color: #ffcaae;
}



.register form {


  font-size: 14px;


}

.register form legend {
  font-size: 30px;

}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-text: center;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 16px;
  background-color: #d9534f;
  color: #fff;
}
</style>
