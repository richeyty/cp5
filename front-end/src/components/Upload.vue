<template>
  <div class="upload">

    <div class="logoutSection">
      <button>
        <a @click="logout">Logout</a>
      </button>
    </div>

    <div class="add">
      <h2>List Your Item</h2>
      <div class="form">
        <input v-model="title" placeholder="Product Title">
          <p></p>
        <input v-model="price" placeholder="Price">
          <p></p>
        <textarea v-model="description" placeholder="Description">
          <p></p>
        </textarea>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>

      <div class="submit" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <h3>{{addItem.description}}</h3>
        <img :src="addItem.path" />
      </div>
    </div>

    <div class="edit">
      <h2>Edit/Delete An Item</h2>
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s._id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="editInfo">
        <div class="submit" v-if="findItem">

          <input v-model="findItem.title">

          <input v-model="findItem.price">
          <textarea v-model="findItem.description">
          </textarea>

        </div>

        <div class="submitRight" v-if="findItem">
          <img :src="findItem.path" />
          <div class="actions" v-if="findItem">
            <button @click="deleteItem(findItem)">Delete</button>
            <button @click="editItem(findItem)">Edit</button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Upload',
  data() {
    return {
      title: "",
      description: "",
      city: "",
      phone: "",
      name: "",
      price: "",
      file: null,
      addUser: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items/' + this.$root.$data.user._id, {
          title: this.title,
          user: this.$root.$data.user,
          description: this.description,
          price: this.price,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items/" + this.$root.$data.user._id);
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          name: this.findItem.name,
          phone: this.findItem.phone,
          price: this.findItem.price,
          city: this.findItem.city,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>

.upload {
  background-color: #ffcaae;
  padding: 30px;
}

input {
  display: block;
  height: 30px;
}

button {
  margin-right: 3px;
  padding: 4px;
}
button.selected {
  border-bottom: 2px solid #000;
  background-color: #f7ecda;
}


.editInfo {
  margin-top: 10px;
  display: flex;
  padding: 0px;
}

textarea {
  height: 80px;
  display: block;
}

.add {
  margin-top: 40px;
  display: block;
}


.edit {
  margin-top: 50px;
}

.form {
  display: block;
}

img {
  width: 40%
}

.logoutSection {
  float: right;
}

.submit {
  display: block;

}

.submitRight {
  display: block;
  margin-left: 30px;
}
.suggestions {
  width: 150px;
  border: 1px solid black;
  background-color: white;
}

.suggestion:hover {
  background-color: #aee0ff;
}

</style>
