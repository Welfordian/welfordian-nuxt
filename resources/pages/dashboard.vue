<template>
  <div
    :class="{'bg-blue-darkest text-white': theme() === 'dark', 'text-blue-darkest': theme() === 'light'}"
    class="container-fluid m-auto min-h-screen h-full pb-8 pt-24 px-4"
  >
    <h1 class="text-center">Active visitors: {{ Object.keys(connections()).length }}</h1>

    <div class="w-full mt-16">
      <h1>Active Pages</h1>

      <div v-for="(page) in Object.keys(mappedPages)" class="m-8">
        <span class="bg-blue px-4 py-2">{{ page }}:</span>
        <span class="bg-blue px-6 py-2">{{ mappedPages[page].count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventBus } from "../eventBus";
  import { mapGetters } from 'vuex'

  export default {
      middleware: 'auth',

      computed: {
          mappedPages() {
              if (typeof(this.connections()) === 'object' && Object.keys(this.connections()).length) {
                  let connections = this.connections();
                  let pages = Object.values(connections);

                  let mapped = pages.map(t => { return t.route });
                  let mappedPages = {};

                  mapped.forEach(page => {
                      if (page === "") {
                          page = 'undefined';
                      }

                      if (page === "/") {
                          page = "index";
                      }

                      page = page.replace('/', '');

                      if (mappedPages.hasOwnProperty(page)) {
                          mappedPages[page].count++;
                      } else {
                          mappedPages[page] = {count: 1};
                      }
                  });

                  return mappedPages;
              } else {
                  return {};
              }
          }
      },

      beforeRouteEnter(to, from, next) {
          eventBus.$emit('routeChange', to.fullPath);

          next();
      },

      methods: {
          ...mapGetters({
              theme: 'default/theme',
              connections: 'dashboard/connections'
          })
      }
  }
</script>
