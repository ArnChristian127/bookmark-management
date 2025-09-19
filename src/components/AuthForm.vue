<template>
    <form @submit.prevent="$emit('handler', { username, email, password, isSignUp: isSignUpLocal })" class="w-100 bg-white p-5 rounded-lg lg:rounded-none">
        <h1 class="text-blue-400 text-2xl md:text-3xl lg:text-4xl font-semibold">{{ isSignUpLocal ? 'Sign Up' : 'Sign In' }}</h1>
        <h1 class="text-xl md:text-2xl lg:text-3xl font-semibold">
            Bookmark Management
        </h1>
         <!--Register flag-->
        <div v-if="isSignUpLocal" class="border border-gray-300 w-full p-3 mt-5 rounded-lg flex items-center gap-3">
            <CiUser/>
            <input v-model="username" type="text" class="w-full outline-none" placeholder="Username"/>
        </div>
        <div class="border border-gray-300 w-full p-3 mt-5 rounded-lg flex items-center gap-3">
            <CiMail/>
            <input v-model="email" type="email" class="w-full outline-none" placeholder="Email"/>
        </div>
        <div class="border border-gray-300 w-full p-3 mt-5 rounded-lg flex items-center gap-3">
            <CiLock/>
            <input v-model="password" type="password" class="w-full outline-none" placeholder="Password"/>
        </div>
        <button v-if="!isSignUpLocal" class="mt-5 text-gray-400 hover:text-gray-500 focus:text-gray-500 cursor-pointer">Forgot Password?</button>
        <button type="submit" class="w-full text-white p-3 bg-blue-400 mt-5 rounded-lg hover:bg-blue-500 focus:bg-blue-500">
            {{ isSignUpLocal ? 'Sign Up' : 'Sign In' }}
        </button>
        <p v-if="!isSignUpLocal" class="mt-5 text-gray-400 text-center">
            Don't have an account? <span @click="$emit('update:isSignUp', true)" class="text-blue-400 hover:text-blue-500 focus:text-blue-500 cursor-pointer">Sign Up</span>
        </p>
        <!--Register flag-->
        <button v-if="isSignUpLocal" @click="$emit('update:isSignUp', false)" type="button" class="w-full text-white p-3 bg-green-400 mt-5 rounded-lg hover:bg-green-500 focus:bg-green-500">Back</button>
    </form>
</template>
<script setup>
    import { CiUser, CiLock, CiMail } from 'vue-icons-plus/ci';
    import { ref, computed } from 'vue';
    const props = defineProps({
        isSignUp: Boolean
    })
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const isSignUpLocal = computed(() => props.isSignUp)
    defineEmits(['handler','update:isSignUp']);
</script>