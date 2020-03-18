<template>
  <div class="flex flex-wrap justify-between items-center self-center justify-center sm:justify-center">
    <div class="w-full sm:w-full lg:w-1/4 mt-8">
      <img class="mt-8 mb-8 w-48 h-48 m-auto block shadow-lg rounded-lg" src="/me.jpg" alt="My very own beautiful face"/>
    </div>

    <div class="mt-8 mb-8 w-full justify-center lg:w-1/3">
      <h1
        :class="{'text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}"
        class="text-center lg:text-left">I'm Joshua Welford.</h1>
      <p
        :class="{'text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}"
        class="text-center lg:text-left mt-4">A web developer specializing in Laravel & Vue.</p>

      <div class="flex justify-center lg:justify-start">
        <app-button tag="nuxt-link" to="/contact" class="mt-12">Let's work together</app-button>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import AppButton from "./AppButton";
    export default {
        components: {AppButton},
        methods: {
          ...mapGetters({
              theme: 'default/theme'
          })
      }
    }
</script>
