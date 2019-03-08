<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-blue-darker p-3 mb-6 shadow-lg fixed w-full pin-t z-10">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Joshua Welford</span>
      </div>
      <div class="block lg:hidden" @click="navOpen = !navOpen">
        <button class="flex items-center px-3 py-2 border rounded text-blue-lighter border-blue-light hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" :class="navOpen ? 'block': 'hidden'">
        <div class="text-sm lg:flex-grow">
          <nuxt-link ref="index" @click.native="navOpen = false" to="/" class="nav-link block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4" :class="{'text-white no-underline': $route.name == 'index', 'text-blue-lighter': $route.name !== 'index'}">
            Blog
          </nuxt-link>
          <!--<nuxt-link ref="hire" @click.native="navOpen = false" to="/hire" class="nav-link block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4" :class="{'text-white no-underline': $route.name == 'hire', 'text-blue-lighter': $route.name !== 'hire'}">
            Hire Me
          </nuxt-link>-->
          <!--<nuxt-link @click.native="navOpen = false" to="#responsive-header" class="nav-link block mt-4 lg:inline-block lg:mt-0 text-blue-lighter hover:text-white mr-4">
            Photography
          </nuxt-link>-->
          <nuxt-link ref="contact" @click.native="navOpen = false" to="/contact" class="nav-link block mt-4 lg:inline-block lg:mt-0 hover:text-white" :class="{'text-white no-underline': $route.name == 'contact', 'text-blue-lighter': $route.name !== 'contact'}">
            Contact
          </nuxt-link>
          <nuxt-link v-if="$auth.loggedIn" ref="contact" @click.native="navOpen = false" to="/dashboard" class="ml-4 nav-link block mt-4 lg:inline-block lg:mt-0 hover:text-white" :class="{'text-white no-underline': $route.name == 'dashboard', 'text-blue-lighter': $route.name !== 'dashboard'}">Dashboard</nuxt-link>
        </div>
        <div>
          <p class="nav-btn inline-block text-sm leading-none text-white no-underline hover:border-transparent mt-4 lg:mt-0 mr-4 flex items-center" @click="toggleTheme">
            <span class="mr-2 cursor-pointer">Dark Mode</span>
            <span
              :class="{'justify-start': currentTheme() === 'light', 'justify-end bg-green': currentTheme() === 'dark'}"
              class="border rounded-full border-grey flex items-center cursor-pointer w-12">
              <span class="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow"></span>
            </span>
          </p>
        </div>
        <div>
          <template v-if="$auth.loggedIn">
            <button @click.prevent="$auth.logout" class="nav-btn inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white no-underline hover:border-transparent hover:text-grey-darker hover:bg-white mt-4 lg:mt-0">Logout</button>
          </template>
          <template v-else>
            <nuxt-link ref="login" @click.native="navOpen = false" to="/login" class="nav-btn inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white no-underline hover:border-transparent hover:text-grey-darker hover:bg-white mt-4 lg:mt-0">Login</nuxt-link>
          </template>
        </div>
      </div>
    </nav>

    <nuxt />
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex'

  export default {
      name: 'nav-bar',

      mounted() {
          document.onkeydown = (e) => {
              if ((e.metaKey || e.ctrlKey) && (e.key === "1" || e.key === "2" || e.key === "3")) {
                  let map = {
                      "1": "/",
                      "2": "contact",
                      "3": "login"
                  };

                  e.preventDefault();

                  this.$router.push({path: map[e.key]});
              }
          }
      },

      data() {
          return {
              navOpen: false
          }
      },

      methods: {
          ...mapMutations({
              toggleTheme: 'default/toggleTheme'
          }),

          ...mapGetters({
              currentTheme: 'default/theme'
          })
      }
  }
</script>

<style scoped>
  .nav-link {
    -webkit-transition: color .2s;
    -moz-transition: color .2s;
    -ms-transition: color .2s;
    -o-transition: color .2s;
    transition: color .2s;
  }

  .nav-btn {
    -webkit-transition: background-color .2s, border-color .2s;
    -moz-transition: background-color .2s, border-color .2s;
    -ms-transition: background-color .2s, border-color .2s;
    -o-transition: background-color .2s, border-color .2s;
    transition: background-color .2s, border-color .2s;
  }
</style>
