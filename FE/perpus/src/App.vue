<script setup>
import { ref, computed } from 'vue';
import FooterView from './views/FooterView.vue';
import MenuView from './views/MenuView.vue';
import { useRoute } from 'vue-router';

const theroute = useRoute();
const isNotLogin = computed(() => theroute.name !== 'login');
</script>

<template>
  <div class="container">
    <MenuView v-if="isNotLogin" />
    <div class="row" style="margin-top: 65px;">
      <router-view />
    </div>
    <FooterView v-if="isNotLogin" />
  </div>
</template>
