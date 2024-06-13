<template>
  <div>
    <div class="table-filter-section">
      <button @click="addFilter">Добавить фильтр</button>
      <input v-model="searchQuery" placeholder="Поиск..." class="search-input" />
      <div v-for="(filter, index) in filters" :key="index" class="filter">
        <select v-model="filter.field" class="filter-select">
          <option v-for="option in filterOptions" :value="option.value" :key="option.value">
            {{ option.text }}
          </option>
        </select>
        <div v-if="getFilterType(filter.field) === 'select-input'" class="filter-select-input">
          <select v-model="filter.value" class="filter-select">
            <option v-for="option in getSelectOptions(filter.field)" :value="option.value" :key="`select-input-${index}-${option.value}`">
              {{ option.text }}
            </option>
          </select>
          <input v-model="filter.value" placeholder="Введите значение" class="filter-input">
        </div>
        <div v-if="getFilterType(filter.field) === 'select'" class="">
          <select v-model="filter.value" class="filter-select-search">
            <option v-for="option in getSelectOptions(filter.field)" :value="option.value" :key="`select-input-${index}-${option.value}`">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-if="getFilterType(filter.field) === 'input'" class="">
          <input v-model="filter.value" placeholder="Введите значение" class="filter-input">
        </div>
        <button @click="removeFilter(index)">X</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.name" @click="sort(column.name)">
            {{ column.title }}
          </th>
          <th v-if="hasActionsSlot">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredAndSortedItems" :key="item.id">
          <td v-for="column in columns" :key="column.name">
            <span v-if="column.type === 'text'">{{ item[column.name] }}</span>
            <img v-if="column.type === 'image'" :src="getImageFullPath(item[column.name])" class="table-image" />
          </td>
          <td v-if="hasActionsSlot">
            <slot name="actions" :item="item"></slot>
          </td>
        </tr>
      </tbody>   
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">&lt;</button>
      <span class="page-info">{{ currentPage }} из {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">&gt;</button>
    </div>
  </div>
</template>

<script>

export default {
  
  props: {
    apiUrl: String,
    columns: Array,
    perPage: {
      type: Number,
      default: 10,
    },
    filterOptions: Array, 
  },

  data() {
    return {
      items: [],
      filters: [],
      sortKey: '',
      sortOrder: 1,
      currentPage: 1,
      searchQuery: '',
    };
  },

  computed: {
    hasActionsSlot() {
      return !!this.$slots.actions;
    },

    filteredAndSortedItems() {
      let result = this.items;

      if (this.searchQuery) {
        result = result.filter(item => 
          Object.values(item).some(value => 
            (value !== null && value !== undefined) && 
            value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }

      // Фильтрация по каждому добавленному фильтру
      this.filters.forEach(filter => {
        if (filter.field && filter.value !== undefined && filter.value !== null) {
          const filterValue = filter.value.toString().toLowerCase(); 
          result = result.filter(item =>
            item[filter.field].toString().toLowerCase().includes(filterValue)
          );
        }
      });

      // Сортировка
      if (this.sortKey) {
        result.sort((a, b) => {
          if (a[this.sortKey] < b[this.sortKey]) return -1 * this.sortOrder;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * this.sortOrder;
          return 0;
        });
      }

      // Пагинация
      const startIndex = (this.currentPage - 1) * this.perPage;
      return result.slice(startIndex, startIndex + this.perPage);
      return result;
    },

    totalPages() {
      return Math.ceil(this.items.length / this.perPage);
    },
  },

  methods: {
    sort(key) {
      this.sortKey = key;
      this.sortOrder = this.sortKey === key ? this.sortOrder * -1 : 1;
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        localStorage.setItem('currentPage', this.currentPage); 
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        localStorage.setItem('currentPage', this.currentPage); 
      }
    },

    addFilter() {
      this.filters.push({ field: '', value: '' });
    },

    removeFilter(index) {
      this.filters.splice(index, 1);
    },

    getFilterType(fieldValue) {
      const option = this.filterOptions.find(option => option.value === fieldValue);
      return option ? option.type : 'input'; 
    },

    getFilterOptions(fieldValue) {
      const option = this.filterOptions.find(option => option.value === fieldValue);
      return option && option.options ? option.options : []; 
    },

    getImageFullPath(imagePath) {
      return `${this.$root.$imgPath}${imagePath}`;
    },

    getSelectOptions(fieldName) {
      const uniqueValues = this.items
        .map(item => item[fieldName])
        .filter((value, index, self) => self.indexOf(value) === index && value != null); 
      return uniqueValues.map(value => ({ value, text: value }));
    },
    
    async fetchData() {
      const response = await fetch(this.apiUrl);
      if (response.ok) {
        this.items = await response.json();
        console.log(this.items)
      } 
    },
  },
  
  created() {
    const savedPage = parseInt(localStorage.getItem('currentPage'), 10);
    if (savedPage) {
      this.currentPage = savedPage;
    }
    this.fetchData();
  },
};

</script>

<style scoped>
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 20px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

th, td {
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: #2c3e50;
  color: white;
  cursor: pointer;
  position: sticky;
  top: 0;
}

th:hover {
  background-color: #34495e;
}

tbody tr {
  background-color: white;
  transition: background-color 0.3s;
}

tbody tr:hover {
  background-color: #ecf0f1;
}
  
.table-filter-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.table-filter-section button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  outline: none;
}

.table-filter-section button:hover, .table-filter-section button:focus, .table-filter-section button:active {
  background-color: #0056b3;
  outline: none; 
  box-shadow: none; 
}

.filter {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.filter-select, .filter-input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
  width: 300px;
}

.filter-input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
}

.filter button {
  background-color: #dc3545;
}

.filter button:hover, .filter button:focus, .filter button:active {
  background-color: #c82333;
  outline: none;
  box-shadow: none;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 20px; 
  outline: none; 
  width: 100%;
  max-width: 400px; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  margin-bottom: 20px; 
  margin-left: 65%;
  margin-top: -30px;
  display: flex;
}

.search-input:focus {
  border-color: #007bff; 
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); 
}

.filter-select-search{
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
  width:250px;
}

.table-image {
  max-width: 100px; 
  height: auto; 
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.pagination-button {
  background-color: #007bff; 
  border: none;
  color: white;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease; 
}

.pagination-button:disabled {
  background-color: #ccc; 
  cursor: not-allowed;
}

.pagination-button:not(:disabled):hover {
  background-color: #0056b3; 
}

.page-info {
  color: #333; 
  font-size: 16px;
  margin: 0 10px;
}

@media (max-width: 1300px) {
  .search-input{
    max-width: 300px;
    margin-left: 50%;
  }
}

@media (max-width: 750px) {
  .search-input{
    max-width: 150px;
    margin-left: 50%;
  }
}

@media (max-width: 500px) {
  .table-filter-section{
    display: none;
  }
}

</style>