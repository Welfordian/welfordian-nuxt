<template>
  <div
    :to="to"
    :is="tag"
    :class="{'bg-orange text-white': type === 'warning',
              'bg-red text-white': type === 'error',
              'bg-blue-darker': (theme() === 'light' && type === 'default' && active),
              'text-white': (theme() === 'light' && active),
              'hover:text-white': (theme() === 'light' && !active && !noHover),
              'hover:bg-blue-darkest hover:shadow-lg': (theme() === 'light' && !noHover),
              'text-blue-darkest': (theme() === 'dark' && type === 'default'),
              'text-white hover:text-blue-darkest': (theme() === 'dark' && type === 'default' && !active && !noHover),
              'text-blue-darkest': (theme() === 'dark' && type === 'default' && active),
              'bg-white': (theme() === 'dark' && type === 'default' && active),
              'hover:bg-grey-light hover:shadow-lg': (theme() === 'dark' && !noHover),
              'inline-block no-underline': tag === 'nuxt-link'}"
    class="app-button font-bold py-2 px-4 rounded shadow-md focus:shadow-lg focus:outline-none">

    <slot></slot>

  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'app-button',

        props: {
            'no-hover': {
                default: false,
                type: Boolean
            },

            'active': {
                default: true,
                type: Boolean
            },

            'to': {
                default: false,
            },

            'tag': {
                default: 'button'
            },

            type: {
                default: 'default'
            }
        },

        methods: {
            ...mapGetters({
                theme: 'default/theme'
            }),
        },
    }
</script>

<style scoped>
  .app-button {
    -webkit-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -moz-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -ms-transition: border-color .3s, box-shadow .3s, background-color .3s;
    -o-transition: border-color .3s, box-shadow .3s, background-color .3s;
    transition: border-color .3s, box-shadow .3s, background-color .3s;
  }
</style>
