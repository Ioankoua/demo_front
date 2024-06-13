<template>
  <Header />
  <div class="form-create-container">
    <form @submit.prevent="submit" class="category-form">
      <div>
        <label class="label-cat">Редактировать Категорию</label>
        <input class="input-cat" type="text" v-model="name" required />
      </div>
      <button class="btn-creat-cat" @click="editCategory">Редактировать</button>
    </form>
  </div>
</template>

<script>

import Header from '@/components/Admin/HeaderAdmin.vue'; 

export default {

  components: {
    Header
  },

  data() {
    return {
      name: ''
    };
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      const category_id = this.$route.params.category_id;
      const response = await fetch(this.$apiUrl + `admin/product/category/getdata/${category_id}`);
      if (response.ok) {
        const category = await response.json();
        this.name = category.name;
      } 
    },
    
    async editCategory() {
      const category_id = this.$route.params.category_id;
      const formData = new FormData();
      formData.append('name', this.name);

      const response = await fetch(this.$apiUrl + `admin/product/category/update/${category_id}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.status === 200) {
        this.$router.push({ path: '/admin/product/category' });
      }
    },
  },
};

</script>

<style scoped>
  .category-form {
  width: 40%; 
  margin: auto; 
  background-color: #ede7b4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px #ccc;
}

.label-cat {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
  margin-left: 15vw;
}

.input-cat {
  box-sizing: border-box; 
  width: calc(100% - 20px); 
  padding: 10px;
  margin-top: 4px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-creat-cat {
  box-sizing: border-box; 
  width: calc(100% - 20px); 
  margin-right: 10px;
  padding: 10px;
  margin-top: 4px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #A58F7F;
  color: white;
  cursor: pointer;
  border: none;
}

.btn-creat-cat:hover {
  background-color: #8B7355;
}

.form-create-container {
    height: 85.8vh !important; 
    background-image: url('@/assets/backgrounds/phone.webp');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; 
    margin: 0;
    padding: 30px 0;
}

.category-form {
  margin-top: 200px;
  opacity: 0.95;
}
</style>