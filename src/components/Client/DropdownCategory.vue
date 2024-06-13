<template>
  <div class="dropdown">
    <div class="menu-icon" @click="toggleDropdown">
        <span></span>
        <span></span> {{ selectedCategory ? selectedCategory.name : '' }}
    </div>
    <div class="dropdown-content" v-if="isDropdownOpen">
      <div class="dropdown-item" @click="goToBuilder">Загрузити власний букет</div>
      <div class="dropdown-item" @click="goToAbout">Про нас</div>
      <div class="dropdown-item" @click="resetFilters">Показать все</div>
      <div class="dropdown-item" v-for="category in categories" :key="category.id" @click="selectCategory(category)">
        {{ category.name }} ({{ productCount[category.id] || 0 }})
      </div>
      <div class="price-filter">
        <div class="price-input-group">
          <label for="min-price">Мин. цена:</label>
          <input type="number" id="min-price" v-model="minPrice" @input="applyPriceFilter">
        </div>
        <div class="price-input-group">
          <label for="max-price">Макс. цена:</label>
          <input type="number" id="max-price" v-model="maxPrice" @input="applyPriceFilter">
        </div>
      </div>
      <div class="btn-container">
        <button class="btn-ok" @click="closeDropdown">ОК</button>
      </div>
    </div>
  </div>
</template>

<script>
  
export default {

  name: 'Dropdown',
  
  props: {
    products: Array,
  },

  data() {
    return {
      categories: [],
      selectedCategory: null,
      minPrice: null,
      maxPrice: null,
      isDropdownOpen: false,
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
     this.$emit('reset-filters');
    },
    selectCategory(category) {
      this.$emit('category-selected', category);
    },
    applyPriceFilter(priceFilter) {
      this.$emit('price-filter', { min: this.minPrice, max: this.maxPrice });
    },
    goToAbout() {
      this.$router.push({ path: '/about' })
    },
    goToBuilder() {
      this.$router.push({ path: '/bouquet_builder' })
    },
    initializePriceRange() {
      if (this.products && this.products.length) {
        const prices = this.products.map(p => p.price);
        this.minPrice = Math.min(...prices);
        this.maxPrice = Math.max(...prices);
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    }
  },

  async created() {
    await this.getAllCategories();
    this.initializePriceRange();
  },
};

</script>

<style>

.dropdown {
  position: relative;
}

.menu-icon {
  margin-left: 11vw;
  display: inline-block;
  cursor: pointer;
  background-color: #d9bf16;
}

.menu-icon span {
  display: block;
  width: 25px; 
  height: 3px; 
  background-color: black; 
  margin: 5px 0; 
}

.dropdown-content {
  position: absolute;
  left: 50%; 
  top: 57%; 
  transform: translate(-50%, -50%);
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  margin-top: 35vh;
  margin-left: -30vw;
}

.dropdown-item {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.price-filter {
  padding: 10px;
}

.price-input-group {
  margin-bottom: 10px;
}

.btn-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.btn-ok {
  padding: 10px 20px; 
  margin-bottom: 10px;
  background-color: #007bff; 
  color: #ffffff; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

.btn-ok:hover {
  background-color: #0056b3; 
}
</style>
