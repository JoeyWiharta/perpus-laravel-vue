<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/counter';
import alertify from 'alertifyjs';

const books = ref([]);
const store = useUserStore();
const therouter = useRouter();

const customConfig = {
  Authorization: 'Bearer ' + store.token,
};

// Fungsi untuk mengambil data buku
function refreshdata() {
  axios({
    url: 'http://localhost:8000/api/book/show/2',
    method: 'get',
    headers: customConfig,
  })
    .then((response) => {
      console.log(response.data); // Debugging
      if (response.data.success === true) {
        books.value = response.data.data;
      }
    })
    .catch((error) => {
      console.error('AJAX Error:', error);
    });
}

// Fungsi untuk dialog konfirmasi penghapusan
function delete_dialog(id) {
  alertify.confirm(
    'Confirmation',
    'Are you sure to delete this data?',
    function () {
      hapus(id); // Jika pengguna mengonfirmasi
    },
    function () {
      alertify.error('Action canceled'); // Jika pengguna membatalkan
    }
  );
}

// Fungsi untuk menghapus data
function hapus(id) {
  axios({
    url: `http://localhost:8000/api/book/delete/${id}`,
    method: 'get',
    headers: customConfig,
  })
    .then((response) => {
      if (response.data.success === true) {
        alertify.alert('Information', 'Data has been deleted!', function () {
          alertify.success('OK');
        });
        refreshdata(); // Segarkan data setelah penghapusan
      }
    })
    .catch((error) => {
      console.error('AJAX Error:', error);
    });
}

// Ambil data buku saat komponen dipasang
onMounted(() => {
  refreshdata();
});
</script>

<template>
  <!-- Tombol untuk menambahkan buku -->
  <router-link to="/bukuview/:theisbn">
    <button type="button" class="btn btn-primary">
      <font-awesome-icon :icon="['fas', 'folder-plus']" />
      Add Book
    </button>
  </router-link>

  <table class="table bg-light" style="width: 100vh; height: 50vh;">
    <thead>
      <tr>
        <th>#</th>
        <th>ISBN</th>
        <th>Judul</th>
        <th>Pengarang</th>
        <th>Tahun</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in books" :key="item.isbn">
        <td class="text-end">{{ index + 1 }}</td>
        <td>{{ item.isbn }}</td>
        <td>{{ item.judul }}</td>
        <td>{{ item.pengarang }}</td>
        <td class="text-center">{{ item.tahun }}</td>
        <td>
          <router-link :to="{ name: 'bukuview', params: { theisbn: item.isbn } }">
            <button type="button" class="btn btn-outline-success btn-sm">
              <font-awesome-icon :icon="['fas', 'eye']" /> View
            </button>
          </router-link>
        </td>
        <td>
          <button
            type="button"
            @click="delete_dialog(item.isbn)"
            class="btn btn-outline-danger btn-sm"
          >
            <font-awesome-icon :icon="['fas', 'trash']" /> Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
