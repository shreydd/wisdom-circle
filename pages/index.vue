<template>
    <div class="container-sm max-w-7xl mx-auto px-5 flex flex-col justify-center">
        <img src="../assets/images/wc-logo.svg" alt="WisdomCircle logo" class="max-h-12 my-10">
        <h1 class="mb-12">Sign in to WisdomCircle</h1>
        <form @submit.prevent="submitHandler" class="flex flex-col justify-center gap-8">
            <input type="text" placeholder="email or phone number">
            <input type="password" placeholder="password">
            <button class="primary-btn">Sign in</button>
        </form>
    </div>
</template>

<script setup>
    const submitHandler = () => {
        console.log('submitted')
    }
</script>

<style scoped>

</style>