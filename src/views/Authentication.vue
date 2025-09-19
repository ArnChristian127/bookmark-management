<template>
    <AuthModalError :text="textMsg" :event="isOpenModalError" @close="isOpenModalError = false"/>
    <AuthModalSuccess :text="textMsg" :event="isOpenModalSuccess" @close="isOpenModalSuccess = false"/>
    <!--Desktop View-->
    <div class="h-screen lg:grid grid-cols-3 hidden">
        <div class="flex items-center justify-center">
            <AuthForm v-model:isSignUp="isSignUp" @handler="handlerForm"/>
        </div>
        <div class="bg-[url('/assets/bg/auth-bg.jpg')] bg-center bg-cover col-span-2"></div>
    </div>
    <!--Mobile View-->
    <div class="lg:hidden h-screen flex items-center justify-center bg-[url('/assets/bg/auth-bg.jpg')] px-3 bg-center bg-cover">
        <AuthForm v-model:isSignUp="isSignUp" @handler="handlerForm"/>
    </div>
</template>
<script setup>
    import AuthForm from '../components/AuthForm.vue';
    import AuthModalError from '../components/AuthModalError.vue';
    import AuthModalSuccess from '../components/AuthModalSuccess.vue';
    import { supabase } from '../api/supabase';
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';

    const textMsg = ref('')
    const isOpenModalError = ref(false)
    const isOpenModalSuccess = ref(false)
    const isSignUp = ref(false)
    const router = useRouter();
    const showError = (message) => {
        textMsg.value = message
        isOpenModalError.value = true
    }
    const showSuccess = (message) => {
        textMsg.value = message
        isOpenModalSuccess.value = true
    }
    const handlerForm = async ({ username, email, password, isSignUp: signUpMode }) => {
        try {
            if (signUpMode) {
                if (!username) return showError('Username is required')
                const { data: userData, error } = await supabase.auth.signUp({
                    email,
                    password,
                })
                if (error) return showError(error.message)
                const { error: errorInsert } = await supabase.from('users').insert({
                    id: userData?.user.id,
                    username,
                    email,
                })
                if (errorInsert) return showError(errorInsert.message)
                showSuccess('Sign Up Success!')
                isSignUp.value = false
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) return showError(error.message)
                router.push('/dashboard')
            }
        } catch (err) {
            showError(err.message || 'An unexpected error occurred')
        }
    }
</script>