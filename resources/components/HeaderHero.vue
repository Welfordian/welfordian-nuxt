<template>
  <div class="flex flex-wrap justify-between items-center self-center justify-center sm:justify-center">
    <div class="w-full sm:w-full lg:w-1/4 mt-8">
      <img class="mt-8 mb-8 w-48 h-48 m-auto block shadow-lg rounded-lg" src="https://api.welford.me/images/me-min.jpg" alt="My very own beautiful face"/>
    </div>

    <div class="mt-8 mb-8 w-full justify-center lg:w-1/3">
      <h1
        :class="{'text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}"
        class="text-center lg:text-left">I'm Joshua Welford.</h1>
      <p
        :class="{'text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}"
        class="text-center lg:text-left">A web developer specializing in Laravel & Vue.</p>

      <div class="flex justify-center lg:justify-start">
        <nuxt-link
          :class="{'hover:bg-blue': theme() === 'dark', 'hover:bg-blue-darkest': theme() === 'light'}"
          to="/contact"
          class="contact-btn w-50 no-underline sm:w-auto mt-8 bg-blue-darker shadow-md text-white font-bold py-2 px-4 focus:outline-none focus:shadow-lg rounded hover:shadow-lg">Let's work together</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
      methods: {
          ...mapGetters({
              theme: 'default/theme'
          })
      }
    }
</script>

<style scoped>
  .contact-btn {
    -webkit-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -moz-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -ms-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -o-transition: border-color .3s, box-shadow .3s, background-color .3s;
    transition: border-color .3s, box-shadow .3s, background-color .3s;
  }
</style>
