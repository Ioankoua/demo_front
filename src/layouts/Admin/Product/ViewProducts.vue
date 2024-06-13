<template>
  <div>
    <Header />
    <div style="padding: 30px;">
      <UniversalTable
        :api-url="this.$apiUrl + 'admin/product/getall'" 
        :columns="columns"
        :per-page="10"
        :filter-options="filterOptions">
        <template v-slot:actions="{ item }">
          <div class="options">
            <button @click="view_product(item.id)" class="option-button view-button">&#128065;</button>
            <button @click="edit_product(item.id)" class="option-button edit-button">&#9998;</button>
            <button @click="delete_product(item.id)" class="option-button delete-button">&#10060;</button>
          </div>
        </template>
      </UniversalTable>
    </div>
  </div>
</template>

<script>

import UniversalTable from '@/components/Admin/UniversalTable.vue';
import Header from '@/components/Admin/HeaderAdmin.vue'; 

export default {

  components: {
    UniversalTable,
    Header,
  },
  
  data() {
    return {
      columns: [
        { name: 'id', title: 'ID', type: 'text' },
        { name: 'name', title: 'Название', type: 'text' },
        { name: 'price', title: 'Цена', type: 'text' },
        { name: 'part', title: 'Доля', type: 'text' },
        { name: 'short_description', title: 'Описание', type: 'text' },
        { name: 'click_count', title: 'Клики', type: 'text' },
        { name: 'main_image', title: 'Изображение', type: 'image' },
      ],
      filterOptions: [
        { value: 'id', text: 'ID', type: 'input' },
        { value: 'name', text: 'Название', type: 'input' },
        { value: 'price', text: 'Цена', type: 'input'}
      ],
      currentPage: 1,
    };
  },

  methods: {
    async view_product(id) {
      this.$router.push({ name: 'ViewProduct', params: { product_id: id } });
    },

    async edit_product(id) {
      this.$router.push({ name: 'EditProduct', params: { product_id: id } });
    },

    async delete_product(id) {
      const response = await fetch(this.$apiUrl + `admin/product/safedelete/${id}`, {
        method: 'POST'
      });      

      window.location.reload();
    },

    changePage(page) {
      this.currentPage = page;
      localStorage.setItem('currentPage', page.toString()); 
    },
  },

  created() {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      this.currentPage = parseInt(savedPage, 10);
    }
  },
}

</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f0f0f0;
}

.filter-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
}

.table-img {
  max-width: 100px;
  height: auto;
  border-radius: 5px;
}

.filter-section {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.select-wrapper,
.input-wrapper {
  flex-grow: 1;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.filter-select,
.filter-input {
  margin: 0px;
  width: 100%;
  padding: 10px;
  border: none;
  font-size: 16px;
  outline: none;
}

.filter-input::placeholder {
  color: #aaa;
}

.filter-select:focus,
.filter-input:focus {
  border-color: #3498db;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}

.pagination-button {
  width: 30px;
  height: 30px; 
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #2c3e50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-button:hover {
  background-color: #34495e;
}

.pagination-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.page-info {
  margin: 0 10px;
  font-size: 16px;
}

.options {
  display: flex; 
  align-items: center; 
}

.option-button {
  padding: 5px 10px; 
  border: none; 
  cursor: pointer; 
  border-radius: 50%; 
  font-size: 20px; 
  margin-right: 5px; 
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-button {
  background-color: #007bff;
  color: #fff;
}

.edit-button {
  background-color: #4CAF50;
  color: #fff;
}

.delete-button {
  background-color: #d4c4c3;
  color: #fff;
}

.option-button:hover {
  filter: brightness(0.8);
}

.icon-trash {
  fill: white; 
  width: 20px; 
  height: 20px; 
}

.back-button {
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: green; 
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-back {
  fill: white;
  width: 20px; 
  height: 20px; 
}
</style>