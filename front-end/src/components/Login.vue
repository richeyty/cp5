<template>
<div class="login">

    <form>
      <fieldset>
        <h2>Login</h2>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>

  <div class="linkToRegister">
    <p>Don't have an account? <router-link to="/register">Register</router-link> </p>
  </div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      usernameLogin: '',
      passwordLogin: '',
      errorLogin: '',
    }
  },
  methods: {
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
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

.login {
  padding: 120px;
  background-color: #ffcaae;
}

a {
  background-color: white;
  padding: 2px;
  border-radius: 9px;
  margin-top: 40px;
}

.linkToRegister {
  margin-top: 20px;
}


.login form {
  font-size: 14px;
  margin-bottom: 5px;
}

.login form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 16px;
  background-color: #d9534f;
  color: #fff;
  margin-bottom: 40px;
}
</style>
