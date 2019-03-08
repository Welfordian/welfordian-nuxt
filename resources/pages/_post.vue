<template>
  <div :class="{'bg-blue-darkest text-white': theme() === 'dark'}">
    <div class="container-fluid m-auto pb-24 pt-24 min-h-screen h-full px-4 w-3/4 m-auto">
      <template v-if="post">
        <div class="font-sans mb-8">
          <nuxt-link
            to="/"
            :class="{'hover:text-blue-darkest text-blue-darker': theme() === 'light', 'hover:text-blue text-blue-dark': theme() === 'dark'}"
            class="nav-link block mt-4 lg:inline-block lg:mt-0 bg-transparent font-bold"><span class="text-base md:text-sm font-bold mr-1">&lt;</span>BACK TO BLOG</nuxt-link>
          <h1 class="font-sans break-normal pt-6 pb-2 text-3xl md:text-4xl">{{ post.title }}</h1>
          <p class="text-sm md:text-base font-normal text-grey-dark">Published {{ post.diffForHumans }}</p>
        </div>

        <div :class="{'bg-blue-darkest text-white': theme() === 'dark'}" v-html="post.content"></div>
      </template>

      <div class="flex flex-wrap justify-center" v-else>
        <h1 class="w-full text-center uppercase mb-4">Loading post...</h1>
        <loading-spinner></loading-spinner>
      </div>
    </div>
  </div>
</template>

<script>
    import { eventBus } from "../eventBus";
    import { mapActions, mapGetters } from 'vuex';
    import LoadingSpinner from "../components/LoadingSpinner";

    export default {
        components: {LoadingSpinner},
        async beforeMount() {
            this.getPosts();
        },

        computed: {
            post() {
                return this.getPost()(this.$route.params.post);
            }
        },

        methods: {
            ...mapActions({
                getPosts: 'blog/getPosts',

            }),

            ...mapGetters({
                theme: 'default/theme',
                getPost: 'blog/getPost'
            })
        },

        beforeRouteEnter(to, from, next) {
            eventBus.$emit('routeChange', to.fullPath);

            next();
        },

        head() {
            return {
                //title: this.post.title
            }
        }
    }
</script>

<style type="less">
  pre {
    @apply bg-blue-darker text-sm text-white py-2 my-4 px-2 rounded overflow-auto;
  }

  code {
    @apply bg-blue-darker text-white px-1 rounded my-1;
  }

  .no-select{
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -o-user-select: none;
    -moz-user-select: none;
  }

  .copy-only {
    /* Transparent text, should work on any background colour */
    color: rgba(0,0,0,0);
    font-size: 0;
  }
</style>
