<template>
  <div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import {eventBus} from "../eventBus";
    import NavBar from "../components/NavBar";
    export default {
        components: {NavBar},

        mounted() {
            this.initialTheme();
        },

        watch: {
            '$auth.loggedIn'(loggedIn) {
                if (loggedIn) {
                  eventBus.$emit('loggedIn', this.$auth);
                } else {
                    eventBus.$emit('loggedOut', this.$auth);
                }
            }
        },

        methods: {
            ...mapMutations({
                initialTheme: 'default/initialTheme'
            }),
        }
    }
</script>
