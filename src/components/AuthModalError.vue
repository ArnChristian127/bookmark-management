<template>
    <div v-if="event">
        <div class="inset-0 fixed bg-black opacity-50"></div>
        <div class="inset-0 fixed flex items-center justify-center px-3">
            <div class="bg-white p-5 rounded-lg w-100 text-center flex items-center justify-center flex-col">
                <div class="h-10 w-10 md:w-13 md:h-13 lg:w-15 lg:h-15 bg-red-100 flex items-center justify-center rounded-full">
                    <BiSolidError class="text-red-400 w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"/>
                </div>
                <h1 class="font-semibold text-xl md:text-2xl lg:text-3xl mt-3">{{ event ? 'Sign Up' : 'Sign In' }} Error</h1>
                <p class="mt-3 text-gray-500">{{ text }}</p>
                <button class="w-full bg-blue-400 hover:bg-blue-500 focus:bg-blue-500 rounded-lg p-2 text-white mt-3" @click="$emit('close')">
                    Close
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { BiSolidError } from 'vue-icons-plus/bi';
    defineEmits(['close'])
    defineProps({ text: String, event: { type: Boolean, default: false } })
</script>