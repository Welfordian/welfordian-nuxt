<template>
  <div>
    <h1 class="text-center mt-16 text-blue-darker">Sorry, still working on this.</h1>
    <p class="text-center mt-8 text-blue-darker">Come back later.</p>
  </div>
</template>

<script>
    export default {
        mounted() {
          console.log(this.post);
        },

        data() {
            return {
                post: this.$route.params.full_post || this.$route.params.post
            }
        },
    }
</script>
