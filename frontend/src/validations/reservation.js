'use strict';

export default function (firstname, lastname, email) {
    if(!firstname || firstname.length <= 0){
        return false;
    }

    if (!lastname || lastname.length <= 0) {
        return false;
    }

    if (!email || email.length <= 0) {
        return false;
    }

    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
