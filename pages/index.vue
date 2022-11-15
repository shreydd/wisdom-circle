<template>
  <div class="container max-w-lg mx-auto px-5 flex flex-col justify-center">
    <img
      src="../assets/images/wc-logo.svg"
      alt="WisdomCircle logo"
      class="max-h-12 my-10"
    />
    <h1 class="">Sign in to WisdomCircle</h1>
    <p class="">Don't have an account? <span class="text-royal-blue-4 font-bold">Sign up</span></p>

    <VForm @submit="submitHandler" class="flex flex-col gap-4 mt-12">
      <VField
        name="email"
        rules="email"
        class=""
        placeholder="Email"
        required
      />
      <VErrorMessage name="email" class="text-red-600" />

      <VField
        name="password"
        type="password"
        :rules="passwordRules"
        class=""
        placeholder="Password"
      />
      <VErrorMessage name="password" class="text-red-600" />
      <p class="text-royal-blue-4 font-bold text-right">Forgot Password</p>

      <button class="primary-btn mt-20 lg:mt-0">Sign in</button>
    </VForm>
  </div>
</template>

<script setup>

const submitHandler = () => {
  console.log("submitted");
};

const userSignInInputRules = (entry) => {
  // remove whitespaces
  if (entry && entry.trim()) {
        return true;
  } else {
    return "please provide a valid email address";
  }
};

const passwordRules = (pass) => {
  // check for char length in password
  if (pass && pass.length >= 8) {
    return true;
  } else {
    return "The password needs to be 8 characters long";
  }
};
</script>

<style scoped>
</style>