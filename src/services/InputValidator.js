const ValidateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return {
        valid: re.test(email),
        message: re.test(email) ? null : 'Invalid email address'
    }
}

const ValidatePassword = password => {
    return {
        valid: password.length > 6,
        message: password.length > 6 ? null : 'Please enter at least 6 characters'
    }
}

export default {
    ValidateEmail,
    ValidatePassword
}