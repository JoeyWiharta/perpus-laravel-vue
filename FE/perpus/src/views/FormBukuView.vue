<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/counter';
import alertify from 'alertifyjs';

const isbn_readonly = ref(false);
const theroute = useRoute();
const therouter = useRouter();
const store = useUserStore();

const isbn = ref('');
const judul = ref('');
const pengarang = ref('');
const tahun = ref(2020);

const customConfig = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + store.token,
};

// Data yang akan dikirim ke server
const thedata = computed(() => ({
  isbn: isbn.value,
  judul: judul.value,
  pengarang: pengarang.value,
  tahun: tahun.value,
}));

// Fungsi untuk menyimpan atau memperbarui data
function save() {
  if (!judul.value || !pengarang.value) {
    alertify.error('Judul dan Pengarang wajib diisi!');
    return;
  }

  const store_or_update = theroute.params.theisbn !== undefined ? 'update' : 'store';
  axios({
    url: `http://localhost:8000/api/book/${store_or_update}`,
    method: 'post',
    data: thedata.value,
    headers: customConfig,
  })
    .then((response) => {
      console.log(response.data); // Debugging
      if (response.data.success === true) {
        alertify.alert('Information', 'Data has been saved!', function () {
          alertify.success('OK');
        });
        therouter.push('/buku');
      } else {
        alertify.error('Gagal menyimpan data!');
      }
    })
    .catch((error) => {
      console.error('AJAX Error:', error);
      alertify.error('Terjadi kesalahan saat menyimpan data.');
    });
}

// Fungsi yang dijalankan saat komponen dipasang
onMounted(() => {
  if (theroute.params.theisbn !== undefined) {
    isbn_readonly.value = true;

    axios({
      url: `http://localhost:8000/api/book/show/${theroute.params.theisbn}`,
      method: 'get',
      headers: customConfig,
    })
      .then((response) => {
        console.log(response.data); // Debugging
        if (response.data.success === true) {
          isbn.value = response.data.data.isbn;
          judul.value = response.data.data.judul;
          pengarang.value = response.data.data.pengarang;
          tahun.value = response.data.data.tahun;
        } else {
          alertify.error('Gagal mengambil data buku.');
        }
      })
      .catch((error) => {
        console.error('AJAX Error:', error);
        alertify.error('Terjadi kesalahan saat mengambil data.');
      });
  }
});
</script>

<template>
  <div class="form-group">
    <label for="isbn">ISBN</label>
    <input
      type="text"
      class="form-control"
      id="isbn"
      required
      v-model="isbn"
      :readonly="isbn_readonly"
    />
  </div>

  <div class="form-group">
    <label for="judul">Judul</label>
    <input
      type="text"
      class="form-control"
      id="judul"
      required
      v-model="judul"
    />
  </div>

  <div class="form-group">
    <label for="pengarang">Pengarang</label>
    <input
      type="text"
      class="form-control"
      id="pengarang"
      required
      v-model="pengarang"
    />
  </div>

  <div class="form-group">
    <label for="tahun">Tahun</label>
    <input
      type="number"
      class="form-control"
      id="tahun"
      min="1980"
      max="2040"
      v-model="tahun"
    />
  </div>

  <button type="button" class="btn btn-success mt-5 mx-2" @click="save" style="width: 98%;">Save</button>
<a href="/buku" class="w-100">
  <button type="button" class="btn btn-danger mt-2 w-100">Cancel</button>
</a>


</template>
