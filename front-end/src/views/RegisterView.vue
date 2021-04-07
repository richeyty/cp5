<template>
<div class="registerView">
  <Upload v-if="user" />
  <Register v-else />
</div>
</template>

<script>
import Register from '@/components/Register.vue';
import Upload from '@/components/Upload.vue';
import axios from 'axios';
export default {
  name: 'dashboard',
  components: {
    Register,
    Upload
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
