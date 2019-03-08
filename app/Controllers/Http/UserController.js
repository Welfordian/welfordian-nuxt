'use strict'

class UserController {
    attempt({ request, response, auth }) {
        return auth.attempt(request.input('email'), request.input('password'));
    }

    me({ request, response, auth }) {
        return {user: auth.getUser()}
    }
}

module.exports = UserController
