<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-grey-darkest p-3 mb-6">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Joshua Welford</span>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-blue-lighter border-blue-light hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto hidden">
        <div class="text-sm lg:flex-grow">
          <nuxt-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-white no-underline hover:text-white mr-4">
            Blog
          </nuxt-link>
          <nuxt-link to="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white mr-4">
            Music
          </nuxt-link>
          <nuxt-link to="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white mr-4">
            Photography
          </nuxt-link>
          <nuxt-link to="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white">
            Contact
          </nuxt-link>
        </div>
        <div>
          <nuxt-link to="/login" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue hover:bg-white mt-4 lg:mt-0">Login</nuxt-link>
        </div>
      </div>
    </nav>

    <nuxt />
  </div>
</template>

<script>
  export default {
      name: 'nav-bar'
  }
</script>
