<template>
  <Header />
  <div class="form-create-product-container">
    <form @submit.prevent="submit" class="product-form">
      <div>
        <label class="label-create-form">Название Продукта</label>
        <input class="input-create-form" type="text" v-model="name" required />
      </div>

      <div>
        <label class="label-create-form" for="category">Категория</label>
        <multiselect class="multiselect"
          v-model="selected_categories" 
          :options="categories" 
          :multiple="true" 
          :close-on-select="false" 
          :clear-on-select="false" 
          :preserve-search="true" 
          placeholder="Выберите категории"
          label="name" 
          track-by="id" 
          :preselect-first="false"
        ></multiselect>
      </div>

      <div>
        <label class="label-create-form" for="for_type">Для</label>
        <select class="select-category" id="for_type" v-model="for_type">
          <option value=1>Дівчини </option>
          <option value=2>Чоловіка</option>
          <option value=3>Дитини</option>
          <option value=4>Уневерсальна</option>
        </select>
      </div>

      <div>
        <label class="label-create-form">Приоритет</label>
        <input class="input-create-form" type="number" v-model="priority" />
      </div>

      <div>
        <label class="label-create-form">Цена</label>
        <input class="input-create-form" type="number" v-model="price" required />
      </div>

      <div>
        <label class="label-create-form">Доля</label>
        <input class="input-create-form" type="number" v-model="part" required />
      </div>

      <div>
        <label class="label-create-form">Краткое Описание</label>
        <textarea class="textarea-create-form" v-model="short_description"></textarea>
      </div>

      <div>
        <label class="label-create-form">Полное Описание</label>
        <textarea class="textarea-create-form" v-model="full_description"></textarea>
      </div>

      <div>
        <label class="label-create-form">Основное изображение</label>
        <input class="input-create-form" type="file" @change="onMainImageChange" />
        <img class="img-product-create" v-if="main_image_url" :src="main_image_url" alt="Выбранное изображение" />
      </div>

      <div>
        <label class="label-create-form">Второстепенные Изображения</label>
        <input class="input-create-form" type="file" multiple @change="onSecondaryImagesChange" />
        <div v-if="secondary_images_urls.length > 0">
          <img class="img-product-create" v-for="(url, index) in secondary_images_urls" :key="index" :src="url" alt="Второстепенное изображение" />
        </div>
      </div>
      <button class="btn-created-product" @click="createProduct">Создать</button>
    </form>
  </div>
</template>

<script>

import Header from '@/components/Admin/HeaderAdmin.vue';
import Multiselect from 'vue-multiselect';

export default {

  components: {
    Header,
    Multiselect, 
  },

  data() {
    return {
      name: '',
      cost: 0,
      hours: 0,
      price: 0,
      part: 0,
      priority: 0,
      for_type: 1,
      short_description: '',
      full_description: '',
      main_image: null,
      main_image_url: null,
      secondary_images: [],
      secondary_images_urls: [],
      filters: [],
      selected_categories: [],  
      categories: [],
    };
  },

  mounted() {
    this.getAllCategories();
  },
  
  methods: {
    checkToken() {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        this.$router.push('/admin');
      }
    },

    onMainImageChange(event) {
      this.main_image = event.target.files[0];
      this.main_image_url = URL.createObjectURL(this.main_image);
    },

    async getAllCategories() {
     
      const response = await fetch(this.$apiUrl + 'admin/product/category/getall');
      
      if (response.ok) {

        const data = await response.json();
        this.categories = data;
      } 
    },

    onSecondaryImagesChange(event) {
      const files = event.target.files;
      const dataTransfer = new DataTransfer();

      for (let i = 0; i < this.secondary_images.length; i++) {
        dataTransfer.items.add(this.secondary_images[i]);
      }

      for (let i = 0; i < files.length; i++) {
        dataTransfer.items.add(files[i]);
      }

      this.secondary_images = [...dataTransfer.files];

      this.secondary_images_urls = [];
      for (const file of this.secondary_images) {
        this.secondary_images_urls.push(URL.createObjectURL(file));
      }

      event.target.files = dataTransfer.files;
    },

    async createProduct() {

      const formData = new FormData();

      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('part', this.part);
      formData.append('priority', this.priority);
      formData.append('short_description', this.short_description);
      formData.append('full_description', this.full_description);
      formData.append('for_type', this.for_type);

      if (this.main_image) {
        formData.append('main_image', this.main_image);
      }

      if (this.selected_categories.length > 0) {
        for (let i = 0; i < this.selected_categories.length; i++) {
          formData.append('category_ids[]', this.selected_categories[i].id);
        }
      }

      if (this.secondary_images.length > 0) {
        for (let i = 0; i < this.secondary_images.length; i++) {
          formData.append('secondary_images[]', this.secondary_images[i]);
        }
      }

      const response = await fetch(this.$apiUrl + 'admin/product/create', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.status === 201) {
        this.$router.push({ path: '/admin/product/' });
      } 
    },
  },

  created() {
    this.checkToken();
  },
  
};

</script>

<style scoped>

  @import 'vue-multiselect/dist/vue-multiselect.css';

  .product-form {
    width: 40%; 
    margin: auto; 
    background-color: #ede7b4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px #ccc;
  }

  .label-create-form {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
    color: black;
  }

  .input-create-form[type="text"],
  .input-create-form[type="number"],
  .textarea-create-form,
  .input-create-form[type="file"],
  .btn-created-product {
    box-sizing: border-box; 
    width: calc(100% - 20px); 
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    margin-top: 4px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .input-create-form[type="checkbox"] {
    margin-left: 10px;
  }

  .btn-created-product {
    background-color: #A58F7F;
    color: white;
    cursor: pointer;
    border: none;
  }

  .btn-created-product:hover {
    background-color: #8B7355;
  }

  .select-category {
    box-sizing: border-box;
    width: calc(100% - 20px);
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    margin-top: 4px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    appearance: none;
    cursor: pointer;
  }

  .select-category::-ms-expand {
    display: none;
  }

  .select-category:focus {
    outline: none;
    border-color: #aaa;
  }

  .img-product-create {
    max-width: 100%;
    max-height: 200px;
    margin: 5px;
  }

  .form-create-product-container {
    height: auto !important;
    background-image: url('@/assets/backgrounds/phone.webp');
    background-size: cover;
    background-position: center;
    padding: 30px 0;
  }

  .product-form {
    opacity: 0.95;
  }

  .multiselect {
    margin-left: 10px; 
    width: 97%; 
    margin-bottom: 20px;
  }

@media (max-width: 500px) {
  .form-create-product-container{
    background-image: none;
  }

  .product-form{
    width: 100%;
    margin-left: 30px;
  }
}
</style>