<template>
  <div class="container-fluid flex justify-center p-3 mt-24">
    <form class="w-full max-w-md mt-2" @submit.prevent="submitForm">
      <h1 class="text-blue-darker">Login</h1>
      <div class="flex flex-wrap -mx-3 mb-6 mt-8">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            for="username">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            class="appearance-none block w-full text-grey-darker border border-grey rounded p-4 px-4 leading-tight focus:outline-none focus:shadow-lg focus:bg-white focus:border-grey-darker shadow-md">
        </div>
        <div class="w-full mt-8 px-3">
          <label
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            for="email">
            Password
          </label>
          <input
            class="appearance-none block w-full text-grey-darker border border-grey rounded p-4 px-4 leading-tight focus:outline-none focus:shadow-lg focus:bg-white focus:border-grey-darker shadow-md"
            id="email"
            type="password"
            placeholder="Password">
        </div>
        <div class="w-ful px-3">
          <button class="w-full shadow-md hover:shadow-lg focus:outline-none focus:shadow-lg sm:w-auto mt-8 bg-blue-darker hover:bg-blue-darkest text-white font-bold py-2 px-4 rounded">
            Let's go, baby!
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                hasErrors: false,
                errors: {
                    username: false,
                    password: false,
                },
                username: "",
                password: "",
            }
        },

        methods: {
            submitForm() {
                if (this.setErrors()) {
                    this.hasErrors = true;

                    return;
                } else {
                    this.hasErrors = false;
                }

                console.log('We got here!');
            },

            setErrors() {
                if (this.username.trim().length === 0) {
                    this.errors.username = true;
                } else {
                    this.errors.username = false;
                }

                if (this.password.trim().length === 0) {
                    this.errors.password = true;
                } else {
                    this.errors.password = false;
                }

                return this.errors.username || this.errors.password;
            }
        }
    }
</script>

<style scoped>
  input[type="text"], input[type="password"], button {
    -webkit-transition: border-color .3s, box-shadow .3s;
    -moz-transition: border-color .3s, box-shadow .3s;
    -ms-transition: border-color .3s, box-shadow .3s;
    -o-transition: border-color .3s, box-shadow .3s;
    transition: border-color .3s, box-shadow .3s;
  }
</style>
