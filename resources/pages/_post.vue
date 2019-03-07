<template>
  <div class="mt-24 w-3/4 m-auto">
    <div class="font-sans mb-8">
      <nuxt-link to="/" class="nav-link block mt-4 lg:inline-block lg:mt-0 hover:text-blue-darkest bg-transparent text-blue-darker font-bold"><span class="text-base md:text-sm font-bold mr-1">&lt;</span>BACK TO BLOG</nuxt-link>
      <h1 class="font-sans break-normal text-black pt-6 pb-2 text-3xl md:text-4xl">{{ post.title }}</h1>
      <p class="text-sm md:text-base font-normal text-grey-dark">Published 2nd February 2019</p>
    </div>

    <div v-html="post.content"></div>
  </div>
</template>

<script>
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
</style>
