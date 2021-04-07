<template>
  <div class="home">

    <div class="sectionOne">
      <img src="/images/sectionOne.png">
        <div class="sectionText">
          <div class="currentListingsText">
            <p> See Current Listings </p>
            <div class = "button">
              <router-link to="/listings">Go</router-link>
            </div>
          </div>
        </div>

    </div>

    <div class="sectionTwo">

        <div class="sectionText">
          <div class="uploadText">
            <p> List Your Item </p>
            <div class = "button">
              <router-link to="/dashboard">Go</router-link>
            </div>
          </div>
        </div>

        <img src="/images/sectionTwo.jpg">

    </div>

    <div class = "footer">
      <p> Here is the link to my gitHub: <a href="https://github.com/richeyty/cp5"> GitHub </a>  </p>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  components: {
  }
}
</script>

<style scoped>

.sectionOne {
  display: flex;

}

.currentListingsText {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.button {
  background-color: white;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  width: 50%;
  font-size: 30px;
}

.button:hover a {
  text-decoration: none;
  background-color: black;
  color: white;
}

.button:hover {
  text-decoration: none;
  background-color: black;
  color: white;
}

.button:link a,
.button:visited a {
  text-decoration: none;
  color: black;
}

.button:link,
.button:visited {
  text-decoration: none;
  color: black;
}


a {
  text-decoration: none;
  color: black;
}

.sectionText {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffcaae;
  padding:15px;
  width: 50%;
}

.footer {
  background-color: #aee0ff;
  text-align: center;
  padding: 20px 0px 20px 0px;
  font-size: 30px;
}

.footer p {
  font-size: 25px;
}

.sectionTwo {
  display: flex;

}

.uploadText {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

p {
  font-size: 50px;
}

img {
  width: 50%;
  object-fit: cover;
}



</style>
