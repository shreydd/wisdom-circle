<template>
  <section class="grid xl:grid-cols-12">
    <section
      class="hidden xl:flex col-span-5 h-screen bg-neutral-grey flex-col"
    >
      <div class="h-1/2 flex justify-center">
        <img
          src="../assets/images/wc-logo-desktop.svg"
          alt="wisdom circle logo"
          class="max-h-40 mt-28"
        />
      </div>

      <section class="flex flex-1">
        <img
          src="../assets/images/mascot_pose.svg"
          class="max-h-38 flex self-end"
          alt="posing mascot"
        />

        <div class="flex flex-col justify-between">
          <div class="">
            <h1 class="text-white mb-3">Welcome back!</h1>
            <p class="text-white">
              Sign In to find opportunities that match your interests. We have
              both part-time and full-time roles that can be done online and
              in-person.
            </p>
          </div>

          <img
            src="../assets/images/dotted_lines.svg"
            class="basis-0 self-start"
            alt="dotted lines"
          />
          <small class="mb-6 text-white"
            >Please contact us at <b>+91-9380644532</b> if you need any
            assistance.</small
          >
        </div>
      </section>
    </section>

    <section
      class="
        container
        max-w-lg
        mx-auto
        px-5
        flex flex-col
        justify-center
        h-screen
        col-span-7
      "
    >
      <img
        src="../assets/images/wc-logo.svg"
        alt="WisdomCircle logo"
        class="max-h-12 mb-10 xl:hidden"
      />
      <h1 class="">Sign in to WisdomCircle</h1>
      <p class="">
        Don't have an account?
        <span class="text-royal-blue-4 font-bold">Sign up</span>
      </p>

      <VForm @submit="submitHandler" class="flex flex-col gap-4 mt-12">
        <VField
          name="phoneOrEmail"
          :rules="PhoneOrEmailRules"
          class=""
          placeholder="Phone number or Email"
        />
        <VErrorMessage
          name="phoneOrEmail"
          as="span"
          class="text-red-600"
        ></VErrorMessage>

        <VField
          name="password"
          type="password"
          rules="passwordRules"
          class=""
          placeholder="Password"
        />
        <VErrorMessage name="password" class="text-red-600"></VErrorMessage>

        <p class="text-royal-blue-4 font-bold text-right">Forgot Password</p>

        <button class="primary-btn mt-20 font-bold lg:mt-0">Sign in</button>
      </VForm>
    </section>
  </section>
</template>

<script setup>
import { email, numeric } from "@vee-validate/rules";
// import useRouter from "vue-router"
const router = useRouter();
let validUsers = [];
let userExists = false;

const PhoneOrEmailRules = (val) => {
  // if val exists
  if (val && val.trim()) {
    if (email(val) || numeric(val)) {
      if (email(val)) {
        return true;
      }

      if (numeric(val)) {
        // check if Indian ph no
        if (parseInt(val.at(0)) === 9) {
          if (val.toString().length === 10) {
            return true;
          } else {
            return "not a valid Indian Phone number";
          }
        }

        // check for other intl numbers
        if (
          parseInt(val.at(0)) !== 9 &&
          val.toString().length >= 8 &&
          val.toString().length <= 12
        ) {
          return true;
        } else {
          return "please enter a valid phone number";
        }
      }
    } else {
      return "Please enter a valid email address";
    }
  } else {
    return "please enter a valid phone number or email";
  }
};

const submitHandler = async (formValues, actions) => {
  // get existing users
  const { data: users } = await useFetch("http://localhost:5000/users", {
    onResponse({ request, response, options }) {
      validUsers = response._data;
    },
  });
  
  userExists = await validateUser(formValues, actions, userExists, users._rawValue);

  //   if user exists then go to home page
  if (userExists) {
    router.push({ path: "/home/" });
  }
};
</script>

<style scoped>
</style>