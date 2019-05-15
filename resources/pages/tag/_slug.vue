<template>
  <div class="container-fluid m-auto pb-8 pt-12 sm:mt-18 min-h-screen h-full flex flex-wrap justify-center" v-if="posts().length" :class="{'bg-blue-darkest': theme() === 'dark'}">
    <header-hero class="flex w-full mb-5"></header-hero>

    <div :class="{'bg-blue-darker': theme() === 'dark'}" class="relative blog-post-card no-underline max-w-sm rounded overflow-hidden shadow-md focus:shadow-lg focus:outline-none hover:shadow-lg m-4 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4" tabindex="0" v-for="post in posts()" :key="post.id">
      <div class="flex-grow flex flex-auto h-full flex-col">
        <div class="relative">
          <img class="w-full h-64" v-bind:src="featuredImage(post)" alt="Sunset in the mountains">
        </div>
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

    <app-button v-if="morePosts()" @click.native="toggleLoading" :disabled="loadingMore()" :class="{'opacity-50 cursor-not-allowed': loadingMore()}" class="relative no-underline max-w-sm rounded overflow-hidden shadow-md focus:shadow-lg focus:outline-none m-4 sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4 cursor-pointer">{{ loadButtonText }}</app-button>
  </div>

  <div class="flex justify-center" v-else>
    <loading-spinner></loading-spinner>
  </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import LoadingSpinner from "../../components/LoadingSpinner";
    import AppButton from "../../components/AppButton";
    import HeaderHero from "../../components/HeaderHero";

    export default {
        name: 'blog-posts-filtered',
        components: {HeaderHero, AppButton, LoadingSpinner},

        beforeMount() {
            this.$store.dispatch('blog/getPosts', this.$route.params.slug).then(r => {
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
</style>
