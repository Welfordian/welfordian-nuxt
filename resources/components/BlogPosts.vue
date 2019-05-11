<template>
  <div class="flex flex-row flex-wrap content-center justify-center" v-if="posts().length">
    <nuxt-link :to="{ name: 'post', params: { post: post.slug }}"
               :class="{'bg-blue-darker': theme() === 'dark'}"
               class="relative blog-post-card no-underline max-w-sm rounded overflow-hidden shadow-md focus:shadow-lg focus:outline-none hover:shadow-lg m-4 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4 cursor-pointer"
               tabindex="0"
               v-for="post in posts()"
               :key="post.id">
      <img class="w-full h-64" v-bind:src="featuredImage(post)" alt="Sunset in the mountains">
      <div class="px-6 py-4" style="margin-bottom: 3em;">
        <div
          :class="{'text-white': theme() === 'dark'}"
          class="font-bold text-lg mb-5 text-grey-darkest" v-html="post.title.rendered"></div>
        <p
          :class="{'text-white': theme() === 'dark'}"
          class="leading-normal text-grey-darker text-base no-underline" v-html="post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')">
        </p>
        <app-button class="mt-8 w-full continue-reading">Continue Reading</app-button>
      </div>
    </nuxt-link>
  </div>

  <div class="flex justify-center" v-else>
    <loading-spinner></loading-spinner>
  </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import LoadingSpinner from "./LoadingSpinner";
    import AppButton from "./AppButton";

    export default {
        name: 'blog-posts',
        components: {AppButton, LoadingSpinner},

        beforeMount() {
            this.$store.dispatch('blog/getPosts').then(r => {
                console.log(r);
                this.$store.commit('blog/SET_POSTS', r);
            });
        },

        methods: {
            ...mapActions({
                getPosts: 'blog/getPosts'
            }),

            ...mapGetters({
                theme: 'default/theme',
                posts: 'blog/all'
            }),

            featuredImage(post) {
                console.log("Get image from this, baby!", post['_embedded']);

                if ('wp:featuredmedia' in post['_embedded']) {
                    if (post['_embedded']['wp:featuredmedia'].length) {
                      return post['_embedded']['wp:featuredmedia'][0]['source_url']
                    }
                }

                return "";

                return post['_embedded']['wp:featuredmedia'].length ? "yes" : "no" ;
            }
        },
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

  .continue-reading {
    position: absolute;
    bottom: 15px;
    right: 5%;
    width: 90%;
  }
</style>
