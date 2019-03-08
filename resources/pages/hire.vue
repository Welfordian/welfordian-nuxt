<template>
  <div
    :class="{'bg-blue-darkest text-white': theme() === 'dark', 'text-blue-darkest': theme() === 'light'}"
    class="container-fluid m-auto min-h-screen h-full pb-8 pt-24 px-4 flex justify-center"
  >
      <div class="w-full sm:w-3/4 mt-2">
        <div class="flex justify-between items-end flex-wrap sm:items-center">
          <h1 class="w-full sm:text-2xl lg:text-3xl sm:w-1/2">Let's work together</h1>
          <app-button no-hover type="warning" tag="p" class="mt-8 sm:mt-0">Not Available For Work</app-button>
        </div>
      </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import AppButton from "../components/AppButton";

    export default {
        components: {AppButton},
        methods :{
            ...mapGetters({
                theme: 'default/theme'
            })
        }
    }
</script>
