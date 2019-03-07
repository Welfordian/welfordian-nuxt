<template>
  <nav-bar></nav-bar>
</template>

<script>
    import { mapMutations } from 'vuex'
    import NavBar from "../components/NavBar";
    export default {
        components: {NavBar},

        mounted() {
            this.initialTheme();
        },

        methods: {
            ...mapMutations({
                initialTheme: 'default/initialTheme'
            }),
        }
    }
</script>
