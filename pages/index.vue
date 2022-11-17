<template>
  <section
    class="
      container
      max-w-lg
      mx-auto
      px-5
      flex flex-col
      justify-center
      h-screen
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

      <button class="primary-btn mt-20 lg:mt-0">Sign in</button>
    </VForm>
  </section>
</template>

<script setup>
import { email, numeric } from "@vee-validate/rules";
import { useResetForm } from "vee-validate";

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
            return "not a valid Indian phone number";
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

  const isValidUser = validateUser(formValues, actions);

  if (isValidUser) {
    console.log("herehere");
    const resetForm = useResetForm();
    resetForm(); // resets the for
  }
};

const validateUser = (formValues, actions) => {

  userExists = false;
  // check if email and user email ID exists
  if (email(formValues.phoneOrEmail)) {
    for (const validUser of validUsers) {
      if (validUser.emailID === formValues.phoneOrEmail) {
        if (validUser.password === formValues.password) {
          userExists = true;
          console.log("log in email");
          break;
        } else {
          actions.setFieldError("password", "wrong password");
          break;
        }
      }
    }
    if (userExists == false) {
      actions.setFieldError(
        "phoneOrEmail",
        "Sorry! This Email ID does not exist"
      );
    }
  }

  // check if ph no and user ph no exists
  else if (numeric(formValues.phoneOrEmail)) {

    for (const validUser of validUsers) {
      if (validUser.phNo === formValues.phoneOrEmail) {
        if (validUser.password === formValues.password) {
          userExists = true;
          console.log("log in ph no");
          break;
        } else {
          actions.setFieldError("password", "wrong password");
          break;
        }
      }
    }
    if (userExists == false) {
      // re do this
      actions.setFieldError(
        "phoneOrEmail",
        "Sorry this phone number does not exist"
      );
    }
  }
};
</script>

<style scoped>
</style>