<template>
  <div class="container-fluid m-auto mb-8">
    <header-hero></header-hero>

    <blog-posts></blog-posts>



    <app-footer></app-footer>
  </div>
</template>

<script>
    import HeaderHero from "../components/HeaderHero";
    import BlogPosts from "../components/BlogPosts";
    import AppFooter from "../components/AppFooter";
    export default {
        components: {AppFooter, BlogPosts, HeaderHero},
        layout: 'default'
    }
</script>
