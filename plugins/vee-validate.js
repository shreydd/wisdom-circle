import { Form } from "vee-validate";
import { Field } from "vee-validate";
import { ErrorMessage } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("VForm", Form);
    nuxtApp.vueApp.component("VField", Field);
    nuxtApp.vueApp.component("VErrorMessage", ErrorMessage);
  });