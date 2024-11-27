import { createRouter, createWebHistory } from 'vue-router';
import MenuView from '@/views/MenuView.vue';
import Login from '@/views/Login.vue';
import PegawaiView from '@/views/PegawaiView.vue';
import BarangView from '@/views/BarangView.vue';
import FormBukuView from '@/views/FormBukuView.vue';
import BukuView from '@/views/BukuView.vue'; // Pastikan komponen ini ada dan diimpor

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/barang',
      name: 'barang',
      component: BarangView,
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      component: PegawaiView,
    },
    {
      path: '/buku',
      name: 'buku',
      component: BukuView, // Pastikan ini sesuai dengan impor
    },
    {
      path: '/bukuview/:theisbn',
      name: 'bukuview',
      component: FormBukuView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'), // Gunakan alias yang konsisten
    },
  ],
});

export default router;
