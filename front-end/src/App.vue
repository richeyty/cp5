<template>
  <div id="app">
    <router-link to="/">
    <div class="header">
      <h1> iShop </h1>
    </div>
    </router-link>
    <router-view />
    
  </div>
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
 font-family: 'Questrial', sans-serif;
}

.header{
  background-color: #aee0ff;
  text-align: center;
  padding: 20px 0px 20px 0px;
  font-size: 30px;
}

a {
  color: black;
  text-decoration: none;
}


</style>
