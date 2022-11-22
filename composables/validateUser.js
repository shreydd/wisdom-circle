export const validateUser = async (formValues, actions, userExists) => {

    let userData = JSON.stringify({
        "phoneOrEmail": formValues.phoneOrEmail,
        "password": formValues.password
    })

    await fetch("https://wc-auth.up.railway.app/auth", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userData,
        redirect: 'follow'
    })
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result);
            if (result.error == 'email'){
                // console.log(result.error)
                actions.setFieldError("phoneOrEmail", "Sorry! this email ID is not registered")
            }
            else if (result.error == 'phone') {
                actions.setFieldError("phoneOrEmail", "Sorry! this phone number is not registered")
            }
            else if(result.error == 'password') {
                actions.setFieldError("password", "Sorry! Invalid password")
            }
            else if (result.name) {
                userExists = true
            }
        })
        .catch(error => {
            console.log('error', error)
        });

        return userExists;
};