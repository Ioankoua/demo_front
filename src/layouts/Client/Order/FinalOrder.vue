<template>
  <Header />
  <div class="order-success-container">
    <h1>Замовлення успішно створено!</h1>
    <p>Ваше замовлення було успішно оформлене. Ми вже приступили до його обробки.</p>
    <button @click="goToHome" class="btn-next">На головну</button>
  </div>
</template>

<script>

import Header from '@/components/Client/HeaderSimple.vue'; 

export default {
  
  components: {
    Header,
  },

  methods: {
    goToHome() {
      this.$router.push({ path: '/' })
    },
  }
};

</script>

<style scoped>
  
.order-success-container {
  text-align: center;
  padding: 20px;
}

.order-success-container h1 {
  color: #4372C8;
}

.order-success-container p {
  color: #333;
  margin-bottom: 20px;
}

.btn-next {
  background-color: #4372C8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-next:hover {
  background-color: #365a96;
}
</style>

