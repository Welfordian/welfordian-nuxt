<template>
  <div
    :class="{'bg-blue-darkest': theme() === 'dark'}"
    class="container-fluid m-auto pb-24 pt-24 flex justify-center sm:mt-18 px-4 h-screen">
    <form class="w-full max-w-md mt-2" @submit.prevent="submitForm">
      <h1 :class="{'text-blue-darker': theme() === 'light', 'text-white': theme() === 'dark'}">Login</h1>
      <div class="flex flex-wrap -mx-3 mb-6 mt-8">
        <div class="w-full px-3">
          <label
            :class="{'text-white': theme() === 'dark'}"
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
            :class="{'text-white': theme() === 'dark'}"
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
          <button
            :class="{'hover:bg-blue-darkest': theme() === 'light', 'hover:bg-blue': theme() === 'dark'}"
            class="w-full shadow-md hover:shadow-lg focus:outline-none focus:shadow-lg sm:w-auto mt-8 bg-blue-darker text-white font-bold py-2 px-4 rounded">
            Let's go, baby!
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';

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
            ...mapGetters({
                theme: 'default/theme'
            }),

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
        },

        head() {
            return {
                title: "Login"
            }
        }
    }
</script>

<style scoped>
  input[type="text"], input[type="password"], button {
    -webkit-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -moz-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -ms-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -o-transition: border-color .3s, box-shadow .3s, background-color .3s;
    transition: border-color .3s, box-shadow .3s, background-color .3s;
  }
</style>
