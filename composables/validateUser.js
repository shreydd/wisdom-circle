import { email, numeric } from "@vee-validate/rules";

export const validateUser = async (formValues, actions, userExists, validUsers) => {
    userExists = false;
    let userEmailExists = false;
    let userPhNoExists = false;

    // check if email and user email ID exists
    if (email(formValues.phoneOrEmail)) {
      for (const validUser of validUsers) {
        if (validUser.emailID === formValues.phoneOrEmail) {
          userEmailExists = true;

          if (validUser.password === formValues.password) {
            userExists = true;
            console.log("log in email");
            return true;
            // break;
          } else {
            actions.setFieldError("password", "wrong password");
            break;
          }

        }
      }
      
      if (userEmailExists == false) {
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
          userPhNoExists = true;

          if (validUser.password === formValues.password) {
            userExists = true;
            console.log("log in ph no");
            return true;
            // break;
          } else {
            actions.setFieldError("password", "wrong password");
            break;
          }
        }
      }
      if (userPhNoExists == false) {
        // re do this
        actions.setFieldError(
          "phoneOrEmail",
          "Sorry this phone number does not exist"
        );
      }
    }
  };