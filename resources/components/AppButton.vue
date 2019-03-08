<template>
  <div
    :to="to"
    :is="tag"
    :class="{'hover:bg-blue-darkest text-white bg-blue-darker': theme() === 'light',
              'bg-white hover:bg-grey-light text-blue-darkest': theme() === 'dark',
              'inline-block no-underline': tag === 'nuxt-link'}"
    class="sm:w-auto font-bold py-2 px-4 rounded shadow-md focus:shadow-lg focus:outline-none
    hover:shadow-lg">

    <slot></slot>

  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'app-button',

        props: {
            'to': {
                default: false,
            },

            'tag': {
                default: 'button'
            }
        },

        methods: {
            ...mapGetters({
                theme: 'default/theme'
            }),
        }
    }
</script>
