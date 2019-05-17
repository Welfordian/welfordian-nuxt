<template>
  <div class="flex w-full justify-center" :class="{'bg-blue-darkest text-white': theme() === 'dark', 'text-blue-darker': theme() === 'light'}">
    <div class="w-full sm:w-4/5 flex justify-around">
      <div class="container-fluid pb-24 pt-16 min-h-screen h-full px-4 w-full lg:w-3/5">
        <template>
          <div class="font-sans">
            <div class="flex justify-start items-center">
              <p v-if="post.status === 'draft'" class="draft-label" :class="{'bg-blue-darkest text-white': theme() === 'light', 'bg-white text-blue-darkest': theme() === 'dark'}">Draft</p>
              <h1 class="font-sans break-normal pt-6 pb-2 text-2xl md:text-4xl" v-html="post.title.rendered"></h1>
            </div>
          </div>
          <div class="flex justify-between mt-4 items-center">
            <div class="flex text-xs">
              <font-awesome-icon class="mr-2" :icon="['far', 'clock']" />

              <p>{{ this.timeAgo(post.date) }}</p>
            </div>

            <div>
            <span class="px-3 py-2 share-facebook cursor-pointer" @click="shareToFacebook()">
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </span>

              <span class="px-3 py-2 share-twitter cursor-pointer" @click="shareToTwitter()">
              <font-awesome-icon :icon="['fab', 'twitter']" />
            </span>
            </div>
          </div>
          <hr class="bg-blue-darker my-4" />

          <div class="post-content" :class="{'bg-blue-darkest text-white': theme() === 'dark'}" v-html="post.content.rendered"></div>

          <app-button v-if="post.status === 'draft'" tag="a" target="_blank" class="w-full block text-center no-underline mt-5" :href="'https://api.welford.dev/wp-admin/post.php?post=' + post.id + '&action=edit'">Continue Editing</app-button>

          <post-comments class="mt-16" :post="post.id"></post-comments>
        </template>
      </div>

      <div class="hidden lg:block w-1/5">
        <div class="hidden lg:block w-full mt-24 px-4 pt-4 text-white bg-blue-darker h-auto self-start pb-4 rounded">
          <h2>Featured</h2>

          <blog-posts featured></blog-posts>
        </div>

        <div class="hidden lg:block w-full mt-24 px-4 pt-4 text-white bg-blue-darker h-auto self-start pb-4 rounded">
          <h2>Recent</h2>

          <blog-posts recent></blog-posts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { eventBus } from "../eventBus";
    import { mapActions, mapGetters } from 'vuex';
    import LoadingSpinner from "../components/LoadingSpinner";
    import AppButton from "../components/AppButton";
    import PostComments from "../components/PostComments";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import BlogPosts from "../components/BlogPosts";

    export default {
        middleware: 'amp',
        amp: true,
        components: {BlogPosts, PostComments, LoadingSpinner, AppButton, FontAwesomeIcon},

        async fetch({store, error}) {
            let posts = await store.dispatch('blog/getPosts');

            store.commit('blog/SET_POSTS', posts);
        },

        data() {
            return {
                times: [["second", 1], ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000]]
            }
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
            }),

            htmlToText(encodedStr) {
                if (!process.browser) {
                    const Entities = require('html-entities').AllHtmlEntities;

                    const entities = new Entities();

                    return entities.decode(encodedStr);
                } else {
                    var parser = new DOMParser;
                    var dom = parser.parseFromString(
                        '<!doctype html><body>' + encodedStr,
                        'text/html');

                    return dom.body.textContent;
                }
            },

            shareToFacebook() {
                window.open("https://www.facebook.com/sharer/sharer.php?u=https://welford.me/" + this.post.slug, "pop", "width=600, height=400, scrollbars=no");
            },

            shareToTwitter() {
                window.open("https://twitter.com/intent/tweet?url=https://welford.me/" + this.post.slug + "&via=welfordian", "pop", "width=600, height=270, scrollbars=no");
            },

            timeAgo(date) {
                let NOW = new Date()
                let diff = Math.round((NOW - (new Date(date))) / 1000)

                for (let t = 0; t < this.times.length; t++) {
                    if (diff < this.times[t][1]) {
                        if (t === 0) {
                            return "Just now"
                        } else {
                            diff = Math.round(diff / this.times[t - 1][1])
                            return diff + " " + this.times[t - 1][0] + (diff === 1?" ago":"s ago")
                        }
                    }
                }
            },

            featuredImage(post) {
                if ('wp:featuredmedia' in post['_embedded']) {
                    if (post['_embedded']['wp:featuredmedia'].length) {
                        return post['_embedded']['wp:featuredmedia'][0]['source_url']
                    }
                }

                return "";
            }
        },

        beforeRouteEnter(to, from, next) {
            eventBus.$emit('routeChange', to.fullPath);

            next();
        },

        head() {
            return {
                meta: [
                    { name: 'twitter:card', property: 'twitter:card', hid: 'twitter:card', content: 'summary' },
                    { name: 'twitter:site', property: 'twitter:site', hid: 'twitter:site', content: '@welfordian' },
                    { name: 'twitter:creator', property: 'twitter:creator', hid: 'twitter:creator', content: '@welfordian' },
                    { name: 'og:url', property: 'og:url', hid: 'og:url', content: `https://welford.me/${this.post.slug}` },
                    { name: 'og:title', property: 'og:title', hid: 'og:title', content: this.htmlToText(this.post.title.rendered) },
                    { name: 'og:description', property: 'og:description', hid: 'og:description', content: this.htmlToText(this.post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '')) },
                    { name: 'og:image', property: 'og:image', hid: 'og:image', content: this.featuredImage(this.post) },
                    { name: 'og:type', property: 'og:type', hid: 'og:type', content: 'article' }
                ]
            }
        }
    }
</script>

<style type="less">
  .post-content {
    line-height: 1.5;
  }

  .post-content p {
    margin-bottom: 1em;
  }

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

  .rt-reading-time {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: .85rem;
  }

  .draft-label {
    padding: 6px 10px;
    border-radius: .25rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);
    text-transform: uppercase;
    margin-top: 1rem;
    margin-right: 1rem;
    font-weight: bold;
  }

  .share-facebook {
    color: #3b5998;
  }

  .share-facebook:hover {
    background-color: #3b5998;
    color: white;
  }

  .share-messenger {
    color: #0084ff;
  }

  .share-messenger:hover {
    background-color: #0084ff;
    color: white;
  }

  .share-twitter {
    color: #1da1f2;
  }

  .share-twitter:hover {
    background-color: #1da1f2;
    color: white;
  }

  hr {
    height: 0.05rem;
  }

  .post-content img:nth-of-type(1) {
    margin-bottom: 1.2rem;
    width: 100%;
    @apply rounded;
  }

  .post-content img {
    @apply rounded;
  }
</style>
