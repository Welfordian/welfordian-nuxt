<template>
  <div class="flex flex-row flex-wrap content-center justify-center" v-if="posts().length">
    <div v-if="full" :class="{'bg-blue-darker': theme() === 'dark'}"
         class="relative blog-post-card no-underline max-w-sm rounded overflow-hidden shadow-md focus:shadow-lg focus:outline-none hover:shadow-lg m-4 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4"
         tabindex="0"
         v-for="post in orderedPosts"
         :key="post.id">
      <div class="flex-grow flex flex-auto h-full flex-col">
        <div class="relative">
          <img class="w-full h-64" v-bind:src="featuredImage(post)" alt="Post Intro Image">

          <div class="flex post-author-details rounded-l px-4 py-2 items-center bg-white" :class="{'bg-blue-darker text-white': theme() === 'dark'}">
            <img :src="post._embedded.author[0].avatar_urls['96']" width="24" class="mr-2" />
            <p>{{ post._embedded.author[0].name }}</p>
          </div>
        </div>
        <p v-if="post._embedded['wp:term'][0][0]['slug'] === 'featured'" class="featured-label" :class="{'bg-blue-darker text-white': theme() === 'dark', 'text-blue-darker bg-white': theme() === 'light'}">Featured</p>
        <p v-if="post.status === 'draft'" class="draft-label">Draft</p>
        <div class="px-6 py-4 flex flex-col flex-grow">
          <div
            :class="{'text-white': theme() === 'dark'}"
            class="font-bold text-lg mb-5 text-grey-darkest" v-html="post.title.rendered"></div>
          <p
            :class="{'text-white': theme() === 'dark'}"
            class="leading-normal text-grey-darker text-base no-underline" v-html="post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')">
          </p>

          <div class="flex flex-grow mt-8 items-end flex-wrap">
            <app-button tag="nuxt-link" :to="{ name: 'tag-slug', params: { slug: tag.slug }}" class="mr-2 mt-2 text-xs p-2 no-underline" v-for="tag in post._embedded['wp:term'][1]" :key="tag.id">{{ tag.name }}</app-button>

            <app-button tag="nuxt-link" :to="{ name: 'post', params: { post: post.slug }}"  class="text-center w-full mt-5">Continue Reading</app-button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full" v-if="featured">
      <div class="mt-4" v-for="post in featuredPosts"
           :key="post.id">
        <nuxt-link :to="{ name: 'post', params: { post: post.slug }}" class="no-underline text-white hover:text-blue">
          <div class="relative">
            <img class="w-full rounded" v-bind:src="featuredImage(post)" alt="Post Intro Image">

            <div class="flex post-author-details rounded-l px-4 py-2 items-center bg-white" :class="{'bg-blue-darker text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}">
              <img :src="post._embedded.author[0].avatar_urls['96']" width="24" class="mr-2 rounded" />
              <p>{{ post._embedded.author[0].name }}</p>
            </div>

            <p v-if="post.status === 'draft'" class="draft-label">Draft</p>
          </div>

          <p class="font-bold mt-2" v-html="post.title.rendered"></p>
        </nuxt-link>
      </div>
    </div>

    <div class="w-full" v-if="recent">
      <div class="mt-4" v-for="post in posts()"
           :key="post.id">
        <nuxt-link :to="{ name: 'post', params: { post: post.slug }}" class="no-underline text-white hover:text-blue">
          <div class="relative">
            <img class="w-full rounded" v-bind:src="featuredImage(post)" alt="Post Intro Image">

            <div class="flex post-author-details rounded-l px-4 py-2 items-center bg-white" :class="{'bg-blue-darker text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}">
              <img :src="post._embedded.author[0].avatar_urls['96']" width="24" class="mr-2 rounded" />
              <p>{{ post._embedded.author[0].name }}</p>
            </div>

            <p v-if="post.status === 'draft'" class="draft-label">Draft</p>
          </div>

          <p class="font-bold mt-2" v-html="post.title.rendered"></p>
        </nuxt-link>
      </div>
    </div>

    <app-button v-if="morePosts()" @click.native="toggleLoading" :disabled="loadingMore()" :class="{'opacity-50 cursor-not-allowed': loadingMore(), 'w-full my-4': recent, 'w-full sm:w-full md:w-2/3 lg:w-3/3 xl:w-4/4 m-4': !recent}" class="relative no-underline rounded overflow-hidden shadow-md focus:shadow-lg focus:outline-none cursor-pointer">{{ loadButtonText }}</app-button>
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
        props: {
            recent: {
                type: Boolean,
                default: false
            },

            featured: {
                type: Boolean,
                default: false
            },

            full: {
                type: Boolean,
                default: false
            }
        },

        beforeMount() {
            this.$store.dispatch('blog/getPosts').then(r => {
                this.$store.commit('blog/SET_POSTS', r);
            });
        },

        methods: {
            ...mapActions({
                getPosts: 'blog/getPosts',
                setFetching: 'blog/setFetching'
            }),

            ...mapGetters({
                theme: 'default/theme',
                posts: 'blog/all',
                morePosts: 'blog/morePosts',
                loadingMore: 'blog/loadingMore'
            }),

            toggleLoading() {
                this.$store.dispatch('blog/loadMore');
            },

            featuredImage(post) {
                if ('wp:featuredmedia' in post['_embedded']) {
                    if (post['_embedded']['wp:featuredmedia'].length) {
                      return post['_embedded']['wp:featuredmedia'][0]['source_url']
                    }
                }

                return "";

                return post['_embedded']['wp:featuredmedia'].length ? "yes" : "no" ;
            }
        },

        computed: {
            loadButtonText() {
                if (this.loadingMore()) {
                    return 'More posts incoming!';
                }

                return 'Load more posts'
            },

            orderedPosts() {
                let featured = this.posts().filter((post) => {
                    return post._embedded['wp:term'][0][0]['slug'] === 'featured';
                });

                let regular = this.posts().filter((post) => {
                    return post._embedded['wp:term'][0][0]['slug'] !== 'featured';
                });

                return featured.concat(regular);
            },

            featuredPosts() {
                return this.posts().filter((post) => {
                    return post._embedded['wp:term'][0][0]['slug'] === 'featured';
                });
            }
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

  .continue-reading {
    position: absolute;
    bottom: 15px;
    right: 5%;
    width: 90%;
  }

  .draft-label {
    position: absolute;
    top: 0;
    left: 15px;
    background: white;
    color: black;
    padding: 6px 10px;
    border-radius: .25rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);
    text-transform: uppercase;
    font-weight: bold;
  }

  .featured-label {
    position: absolute;
    top: 10px;
    left: 15px;
    padding: 6px 10px;
    border-radius: .25rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);
    text-transform: uppercase;
    font-weight: bold;
  }

  .post-author-details {
    position: absolute;
    bottom: 10px;
    right: 0px;
  }
</style>
