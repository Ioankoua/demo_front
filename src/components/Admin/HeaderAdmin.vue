<template>
  <header class="header">
    <div class="actions ml">
      <button @click="goToHome" class="home-button">На главную</button>
      <button @click="createProduct" class="create-product">Создать товар</button>
      <button @click="goCategory" class="create-product">Категории</button>
      <button @click="goOrder" class="create-product">Заказы</button>
      <button @click="goBuilder" class="create-product">Особые заказы</button>
      <button @click="createCategory" class="create-product">Создать категорию</button>
    </div>
    <div class="actions">
      <button class="trash-button" @click="goTrash">
        <svg class="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m2 0V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
      <button @click="logout" class="logout-button">Выход</button>
    </div>
  </header>
</template>

<script>

  export default {

    methods: {
    createProduct() {
      this.$router.push({ path: '/admin/product/create' })
    },
    goCategory() {
      this.$router.push({ path: '/admin/product/category' })
    },
    goToHome() {
      this.$router.push({ path: '/admin/product/' })
    },
    goOrder() {
      this.$router.push({ path: '/admin/order/' })
    },
    goBuilder() {
      this.$router.push({ path: '/admin/bouquet_builder/' })
    },
    createCategory() {
      this.$router.push({ path: '/admin/product/category/create' })
    },
    goTrash() {
      this.$router.push({ path: '/admin/product/trash/' })
    },
    logout() {
      localStorage.removeItem('adminToken');
      this.$router.push({ path: '/' })
    },
  }
}

</script>

<style scoped>
  
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  background-color: #1e1e6b;
  color: #fff;
}

.create-product, .home-button {
  margin: 10px;
  width: 150px;  
  height: 40px;  
  padding: 10px 20px; 
  border: none; 
  cursor: pointer; 
  border-radius: 5px; 

  display: flex;
  justify-content: center;
  align-items: center;
}

.create-product {
  background-color: #ff6600;
  color: #fff; 
}

.home-button {
  background-color: #4CAF50; 
  color: #fff; 
}

.create-product:hover {
  background-color: #ff9900; 
}

.logout-button {
  margin: 10px;
  background-color: #007bff; 
  color: #fff; 
  padding: 10px 20px; 
  border: none; 
  cursor: pointer; 
  border-radius: 5px; 
}

.logout-button:hover {
  background-color: #0056b3; 
}

.home-button:hover {
  background-color: #45a049; 
}

.actions {
  display: flex;
  justify-content: center;
}

.actions button {
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.trash-button {
  background-color: #d4c4c3;
  color: #fff;
  cursor: pointer;
  width: 50px;
  height: 50px;
  background-color: red;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.trash-button:hover {
  background-color: #cc0000;
}

.icon-trash {
  fill: white; 
  width: 20px; 
  height: 20px; 
}

.ml{
  margin-left: 90px;
}

@media (max-width: 500px) {
  .header{
    background-color: white;
  }

  .actions {
    margin-left: 0px;
  }
}
</style>
