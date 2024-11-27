<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/counter';
import axios from 'axios';

const store = useUserStore();
const therouter = useRouter();

const customConfig = {
  Authorization: 'Bearer ' + store.token,
};

// Fungsi Logout
function logout() {
  axios({
    url: 'http://localhost:8000/api/logout',
    method: 'get',
    headers: customConfig,
  })
    .then((response) => {
      console.log(response.data); // Untuk pengembangan
      if (response.data.success === true) {
        store.reset(); // Reset data di store
        therouter.push('/'); // Arahkan ke halaman utama
      }
    })
    .catch((error) => {
      console.error('AJAX Error:', error); // Debugging error
    });
}
</script>

<template>        
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">PERPUS</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/menu">Menu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/pegawai">Pegawai</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/barang">Barang</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Perpustakaan
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="/buku">Buku</a></li>
                    <li><a class="dropdown-item" href="#">Peminjaman</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Pembelian</a></li>
                  </ul>
                </li>


            </ul>
            <button @click="logout" class="btn btn-danger">Logout</button>

            </div>
        </div>

    </nav>

</template>


