<template>
  <div
    :class="{'bg-blue-darkest': currentTheme() === 'dark'}"
    class="container-fluid m-auto pb-8 pt-12 sm:mt-18">
    <header-hero></header-hero>

    <blog-posts></blog-posts>

    <app-footer></app-footer>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'

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
        }
    }
</script>
