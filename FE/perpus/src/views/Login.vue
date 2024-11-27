<template>
    <div class="container d-flex flex-column">
      <h2 class="text-light">Login</h2>
      <form @submit.prevent="login" class="login-form rounded-3">
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label text-dark">Email address</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter your email" v-model="username" required>
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="col-sm-2 col-form-label text-dark">Password</label>
            <input type="password" class="form-control" id="inputPassword" v-model="password" required placeholder="Enter your password">
        </div>

        <button type="submit" class="btn btn-success rounded-pill">Login</button>
      </form>
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/counter';
  
  axios.defaults.withCredentials = true;
  
  const therouter = useRouter();
  const store = useUserStore();
  
  const auth = ref(null);
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const customConfig = {
    'Content-Type': 'application/json',
  };
  
  const bodyParameters = computed(() => ({
    email: username.value,
    password: password.value,
  }));
  
  // Fungsi login
  function login() {
    axios({
      url: 'http://localhost:8000/api/login',
      method: 'post',
      data: bodyParameters.value,
      headers: customConfig,
    })
      .then((response) => {
        auth.value = response.data;
        console.log(response.data); // Hanya untuk pengembangan
        if (auth.value.success === true) {
          store.email = username.value;
          store.token = auth.value.data; // Token dari API Laravel
          therouter.push('/menu'); // Redirect ke halaman menu
        } else {
          errorMessage.value = auth.value.message || 'Login failed';
        }
      })
      .catch((error) => {
        console.error('AJAX Error: ', error);
        errorMessage.value = 'Login failed, please try again.';
      });
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f4f4;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 50vh;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
  }
  
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
  
  button {
    padding: 10px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0d6a1c;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  
  /* Tambahan untuk membuat layout responsif */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  </style>
  