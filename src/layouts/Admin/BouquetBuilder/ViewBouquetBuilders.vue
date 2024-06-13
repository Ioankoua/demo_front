<template>
  <div>
    <Header />
    <div style="padding: 30px;">
      <UniversalTable
        :api-url="this.$apiUrl + 'admin/bouquetbuilder/getall'" 
        :columns="columns"
        :per-page="10"
        :filter-options="filterOptions">
        <template v-slot:actions="{ item }">
          <div class="options">
            <button @click="view_bouquet(item.id)" class="option-button view-button">&#128065;</button>
            <button @click="delete_bouquet(item.id)" class="option-button delete-button">&#10060;</button>
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
        { name: 'description', title: 'Описание', type: 'text' },
        { name: 'compound', title: 'Состав', type: 'text' },
        { name: 'phone', title: 'Телефон', type: 'text' },
        { name: 'social', title: 'Соцсеть', type: 'text' },
        { name: 'main_image', title: 'Изображение', type: 'image' },
      ],
      filterOptions: [
        { value: 'id', text: 'ID', type: 'input' },
        { value: 'phone', text: 'Телефон', type: 'input' },
        { value: 'social', text: 'Соцсеть', type: 'input'}
      ],
    };
  },

  methods: {
    async view_bouquet(bouquet_id) {
      this.$router.push({ name: 'ViewBouquetBuilder', params: { bouquet_id: bouquet_id } });
    },

    async delete_bouquet(bouquet_id) {
      const response = await fetch(this.$apiUrl + `admin/bouquetbuilder/safedelete/${bouquet_id}`, {
        method: 'POST'
      });

      window.location.reload();
    },
  }
}

</script>

<style scoped>
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
</style>