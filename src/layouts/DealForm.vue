<template>
  <div class="form-container">
    <h1>Create Deal and Account</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-group">
        <label for="deal_name">Deal Name:</label>
        <input class="form-input" type="text" id="deal_name" v-model="form.deal_name" required />
      </div>
      <div class="form-group">
        <label for="deal_stage">Deal Stage:</label>
        <input class="form-input" type="text" id="deal_stage" v-model="form.deal_stage" required />
      </div>
      <div class="form-group">
        <label for="account_name">Account Name:</label>
        <input class="form-input" type="text" id="account_name" v-model="form.account_name" required />
      </div>
      <div class="form-group">
        <label for="account_website">Account Website:</label>
        <input class="form-input" type="url" id="account_website" v-model="form.account_website" required />
        <span v-if="website_error" class="error-message">{{ website_error }}</span>
      </div>
      <div class="form-group">
        <label for="account_phone">Account Phone:</label>
        <input class="form-input" type="tel" id="account_phone" v-model="form.account_phone" required />
        <span v-if="phone_error" class="error-message">{{ phone_error }}</span>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
    <div v-if="error && !phone_error && !website_error" class="error-message">
      {{ error }}
    </div>
    <div v-if="success" class="success-message">
      Deal and Account created successfully!
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        deal_name: '',
        deal_stage: '',
        account_name: '',
        account_website: '',
        account_phone: ''
      },
      error: '',
      success: false,
      phone_error: '',
      website_error: ''
    };
  },
  methods: {
    validateForm() {
      this.error = '';
      this.phone_error = '';
      this.website_error = '';

      if (!this.form.deal_name || !this.form.deal_stage || !this.form.account_name|| !this.form.account_phone || !this.form.account_website) {
        this.error = 'All required fields must be filled out.';
        return;
      }

      // Validate phone number
      if (this.form.account_phone.length < 9) {
        this.phone_error = 'Phone number must be at least 9 digits long.';
      }

      // Validate website URL
      const url_input = document.createElement('input');
      url_input.type = 'url';
      url_input.value = this.form.account_website;
      if (!url_input.checkValidity()) {
        this.website_error = 'Please enter a valid URL.';
      }

      if (this.phone_error || this.website_error) {
        this.error = '';
      }
    },
    async submitForm() {
      this.validateForm();
      if (this.error || this.phone_error || this.website_error) {
        return;
      }
      try {
        this.success = false;
        const response = await axios.post('https://test.sweetbouquet.store/api/zoho/create', this.form);
        if (response.data.success) {
          this.success = true;
        } else {
          this.error = response.data.error || 'Failed to create deal and account.';
        }
      } catch (error) {
        this.error = 'An error occurred: ' + error.message;
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 15vh;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #d9534f;
  font-size: 14px;
  margin-top: 10px;
}

.success-message {
  color: #5cb85c;
  font-size: 14px;
  margin-top: 10px;
}

@media (max-width: 600px) {
  .form-container {
    padding: 15px;
  }

  .form-title {
    font-size: 20px;
  }

  .form-input {
    font-size: 14px;
  }

  .submit-button {
    font-size: 14px;
  }
}

</style>
