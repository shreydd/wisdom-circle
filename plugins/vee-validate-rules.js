import { defineRule } from "vee-validate";
import * as rules from "@vee-validate/rules";

// defineRule('isPhoneNo', (val) => {
//     const phNoStr = /^\d+$/
//     if (val && val.trim() && val.match(phNoStr)) {
//         return true
//     }
// })

defineRule('passwordRules', (pass) => {
    // check for char length in password
    if (pass && pass.length >= 8) {
        return true;
    } else {
        return "The password needs to be 8 characters long";
    }
});

export default defineNuxtPlugin((nuxtApp) => {
    Object.keys(rules)
        .filter((k) => k !== 'default')
        .forEach((rule) => {
            defineRule(rule, rules[rule]);
        });
});