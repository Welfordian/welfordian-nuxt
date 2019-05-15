<template>
  <div
    :class="{'bg-blue-darkest': currentTheme() === 'dark'}"
    class="container-fluid m-auto pb-8 pt-12 sm:mt-18 min-h-screen h-full">
    <header-hero class="mb-5"></header-hero>

    <blog-posts></blog-posts>

    <app-footer></app-footer>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { eventBus } from "../eventBus";

    import HeaderHero from "../components/HeaderHero";
    import BlogPosts from "../components/BlogPosts";
    import AppFooter from "../components/AppFooter";

    export default {
        components: {AppFooter, BlogPosts, HeaderHero},
        layout: 'default',

        methods: {
            ...mapGetters({
                currentTheme: 'default/theme'
            })
        },

        beforeRouteEnter(to, from, next) {
            eventBus.$emit('routeChange', to.fullPath);

            next();
        }
    }
</script>
