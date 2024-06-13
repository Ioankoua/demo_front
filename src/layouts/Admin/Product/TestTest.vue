<template>
  <div>
    <form @submit.prevent="deleteFile">
      <div>
        <label for="user_id">User ID:</label>
        <input type="text" id="user_id" v-model="user_id" required>
      </div>
      <button type="submit">Delete File</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: '',
    };
  },
  methods: {
    async deleteFile() {
      if (!this.user_id) {
        alert('Please fill in all fields');
        return;
      }

      const formData = new FormData();
      formData.append('id', this.user_id);

      try {
        const response = await fetch('https://backend.cybersoftw.online/staffuser/staffuser/deleteFileUser', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
        // Дополнительные действия после успешного удаления файла
      } catch (error) {
        console.error('Error:', error);
        // Обработка ошибок
      }
    }
  }
};
</script>

<style scoped>
/* Добавьте ваши стили здесь */
</style>
