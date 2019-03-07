<template>
  <div :class="{'bg-blue-darkest text-white': theme() === 'dark'}">
    <div class="container-fluid m-auto pb-24 pt-24 height-screen px-4 w-3/4 m-auto">
      <div class="font-sans mb-8">
        <nuxt-link
          to="/"
          :class="{'hover:text-blue-darkest text-blue-darker': theme() === 'light', 'hover:text-blue text-blue-dark': theme() === 'dark'}"
          class="nav-link block mt-4 lg:inline-block lg:mt-0 bg-transparent font-bold"><span class="text-base md:text-sm font-bold mr-1">&lt;</span>BACK TO BLOG</nuxt-link>
        <h1 class="font-sans break-normal pt-6 pb-2 text-3xl md:text-4xl">{{ post.title }}</h1>
        <p class="text-sm md:text-base font-normal text-grey-dark">Published {{ post.diffForHumans }}</p>
      </div>

      <div :class="{'bg-blue-darkest text-white': theme() === 'dark'}" v-html="post.content"></div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        async beforeMount() {
            if (typeof (this.post) === "string") {
                this.post = await (await fetch(new Request(`https://api.welford.me/posts/${this.post}`))).json();
            }
        },

        data() {
            return {
                post: this.$route.params.full_post || this.$route.params.post
            }
        },

        methods: {
            ...mapGetters({
                theme: 'default/theme'
            })
        },

        head() {
            return {
                title: this.post.title
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
