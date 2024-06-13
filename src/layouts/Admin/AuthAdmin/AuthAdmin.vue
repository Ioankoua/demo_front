<template>
  <div class="login-container">
    <div class="cream-card">
      <form @submit.prevent="enterUser" class="auth-form">
        <router-link class="back-link" to="/">← Вернуться назад</router-link>
        <h2 class="auth-text">Авторизация</h2>
        <div class="input-group">
          <label for="login">Логин</label>
          <input type="text" id="login" v-model="login" required>
          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="actions">
          <button type="submit">Вход</button> 
        </div>
      </form>
  </div>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      login: '',
      password: ''
    };
  },

  methods: {
    async enterUser() {
      try {
        const response = await fetch(this.$apiUrl + 'admin/auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: this.login, password: this.password })
        });
        const data = await response.json();

        if (data.success && data.token) {
            localStorage.setItem('adminToken', data.token);
            this.$router.push({ path: '/admin/product' });
        } 
      } catch (error) {
        console.error('Error autorisation', error);
      }
    }
  }
}

</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.login-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(~@/assets/backgrounds/phone.webp);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.back-link, .auth-text {
  color: #8b4513; 
  text-decoration: none;
  margin-bottom: 15px;
  margin-left: 10px;
}

.back-link:hover {
  text-decoration: underline;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-group label {
  color: #8b4513;
}

.input-group input {
  padding: 8px;
  border: 1px solid #8b4513;
  border-radius: 5px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.actions button {
  background-color: #8b4513; 
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.actions button:hover {
  background-color: #a0522d;
}

.cream-card {
  background-color: #f5f5dc; 
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
