<template>
  <div>
    <div class="flex flex-row flex-wrap content-center justify-center">
      <div
        class="max-w-sm rounded overflow-hidden shadow-md hover:shadow-lg m-4 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4 cursor-pointer"
        tabindex="0"
        v-for="post in posts"
        @click="loadPost(post)"
        @keyup.32.prevent="loadPost(post)"
        @keyup.13.prevent="loadPost(post)">

        <img class="w-full" v-bind:src="post.intro_image" alt="Sunset in the mountains">
        <div class="px-6 py-4">
          <div class="font-bold text-lg mb-5">{{ post.title }}</div>
          <p class="text-grey-darker text-base">
            {{ post.intro_text }}
          </p>
        </div>
        <div class="px-6 py-4">
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#laravel</span>
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">#nginx</span>
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">#auth</span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

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
          logKey(e) {
              console.log(e.keyCode);
          },

          loadPost(post) {
              console.log('Loading post...', post);
          }
      }
  }
</script>
