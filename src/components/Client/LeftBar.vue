<template>
  <div class="left-bar">
    <div class="sidebar">
      <div class="price-filter">
        <div class="price-input-group">
          <label for="min-price">Мін. ціна:</label>
          <input type="number" id="min-price" v-model="minPrice" @input="applyPriceFilter">
        </div>
        <div class="price-input-group">
          <label for="max-price">Макс. ціна:</label>
          <input type="number" id="max-price" v-model="maxPrice" @input="applyPriceFilter">
        </div>
      </div>
      <ul class="category-list">
        <li @click="resetFilters">Показати всі</li>
        <li v-for="category in categories" 
          :key="category.id" 
          @click="selectCategory(category)"
          :class="{ 'selected-category': selectedCategory && category.id === selectedCategory.id }">
        {{ category.name }} ({{ productCount[category.id] || 0 }})
      </li>

      </ul>
    </div>
  </div>
</template>

<script>

export default {
  
  name: 'LeftBar',

  props: {
    products: Array,
  },

  data() {
    return {
      categories: [],
      selectedCategory: null,
      minPrice: null,
      maxPrice: null,
    };
  },

  computed: {
    productCount() {
      const count = {};
      if (this.products && this.products.length) {
        this.products.forEach(product => {
          if (product.category_ids && product.category_ids.length) {
            product.category_ids.forEach(category_id => {
              if (!count[category_id]) {
                count[category_id] = 0;
              }
              count[category_id]++;
            });
          }
        });
      }
      return count;
    }
  },

  methods: {
    async getAllCategories() {
      const response = await fetch(this.$apiUrl + 'admin/product/category/getall');
      if (response.ok) {
        const data = await response.json();
        this.categories = data;
      } 
    },

    resetFilters() {
      this.selectedCategory = null;
      this.$emit('reset-filters');
    },

    selectCategory(category) {

      this.selectedCategory = category;
      this.$emit('category-selected', category);
    },

    applyPriceFilter() {
      this.$emit('price-filter', { min: this.minPrice, max: this.maxPrice });
    },
    
    initializePriceRange() {
      if (this.products && this.products.length) {
        const prices = this.products.map(p => p.price);
        this.minPrice = Math.min(...prices);
        this.maxPrice = Math.max(...prices);
      }
    },
  },

  async created() {
    await this.getAllCategories();
    this.initializePriceRange();
  },
};

</script>

<style>
.sidebar {
  width: 12vw;
  min-width: 100px;
  height: 84vh;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.category-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  padding: 10px 0;
  border-bottom: 1px solid #e1e1e1;
  color: #333;
  font-size: 16px;
  cursor: pointer;
}

.category-list li:hover {
  background-color: #e1e1e1;
}

.left-bar {
  width: 200px;
  flex-shrink: 0;
}

.selected-category {
  background-color: #e1e1e1; 
}

.price-filter {
  display: flex;
  flex-direction: column; 
  gap: 10px;
  padding: 10px;
}

.price-input-group {
  display: flex;
  flex-direction: column; 
}

.price-input-group label {
  font-size: 14px; 
  margin-bottom: 5px; 
}

.price-input-group input[type="number"] {
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

.price-input-group input[type="number"]:focus {
  border-color: #4CAF50;
}

.price-input-group input[type="number"]::-webkit-inner-spin-button,
.price-input-group input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-input-group input[type="number"]:hover {
  border-color: #999;
}
</style>

