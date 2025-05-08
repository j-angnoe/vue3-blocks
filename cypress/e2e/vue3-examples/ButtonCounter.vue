<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
    Button Counter loaded from server:
    <button id="button-counter-action" @click="count++">You clicked me {{ count }} times.</button>
</template>