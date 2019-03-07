<template>
  <div class="flex flex-row flex-wrap content-center justify-center">
    <nuxt-link :to="{ name: 'post', params: { post: post.slug, full_post: post }}"
      class="blog-post-card no-underline max-w-sm rounded overflow-hidden shadow-md focus:shadow-lg focus:outline-none hover:shadow-lg m-4 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4 cursor-pointer"
      tabindex="0"
      v-for="post in posts"
      :key="post.id">
      <img class="w-full h-64" v-bind:src="post.intro_image" alt="Sunset in the mountains">
      <div class="px-6 py-4">
        <div
          :class="{'text-white': theme() === 'dark'}"
          class="font-bold text-lg mb-5 text-grey-darkest">{{ post.title }}</div>
        <p
          :class="{'text-white': theme() === 'dark'}"
          class="text-grey-darker text-base no-underline">
          {{ post.intro_text }}
        </p>
      </div>
      <div class="px-6 py-4">
        <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darkest mr-2">#laravel</span>
        <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darkest mr-2">#nginx</span>
        <span
          class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darkest">#auth</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: 'blog-posts',

        async mounted() {
            this.posts = await (await fetch(new Request('https://api.welford.me/posts'))).json();
        },

        data() {
            return {
                posts: []
            }
        },

        methods: {
            ...mapGetters({
                theme: 'default/theme'
            })
        }
    }
</script>

<style scoped>
  .blog-post-card {
    -webkit-transition: border-color .3s, box-shadow .3s;
    -moz-transition: border-color .3s, box-shadow .3s;
    -ms-transition: border-color .3s, box-shadow .3s;
    -o-transition: border-color .3s, box-shadow .3s;
    transition: border-color .3s, box-shadow .3s;
  }
</style>
