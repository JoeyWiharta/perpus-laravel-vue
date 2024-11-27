<script setup>
import { useUserStore } from '../stores/counter'

const store = useUserStore()

function increase(){
    store.thecounter++
}
</script>

<template>
    <div style="width: 200vh; height: 75vh;">
        <h3 class="text-light text-center m-5">STOK BARANG {{store.thecounter}}</h3>
        <button type="button" @click = "increase()" class="btn btn-primary mt-5" style="width: 100%;">
            COUNTER IN BARANG
        </button>
        <h3 class="text-light text-center m-4">Click to increase THE COUNTER</h3>
    </div>
</template>

