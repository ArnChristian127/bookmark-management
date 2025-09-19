<template>
    <div class="h-screen flex items-center justify-center flex-col">
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <button @click="logout">Logout</button>
    </div>
</template>
<script setup>
import { supabase } from '../api/supabase';
import { useRouter } from 'vue-router';
const router = useRouter();
const logout = async () => {
    await supabase.auth.signOut()
    router.push('/');
}
</script>
