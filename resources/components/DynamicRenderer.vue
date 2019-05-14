<template>
  <div>
    <no-ssr>
      <div class="post-content" :class="{'bg-blue-darkest text-white': theme() === 'dark'}" v-html="templateRender"></div>
    </no-ssr>
  </div>
</template>

<script>
  //import Vue from "vue";
  import VueWithCompiler from "vue/dist/vue.esm";
  import { mapActions, mapGetters } from 'vuex';

  export default {
      name: 'DynamicRenderer',

      props: ['body'],

      data() {
          return {
              templateRender: false,
          }
      },

      render(createElement) {
          if (this.templateRender) {
              return this.templateRender();
          } else {
              return createElement("div", "Loading...");
          }
      },

      created () {
          const compiled = VueWithCompiler.compile(`<div>hello</div>`);
          this.templateRender = compiled.render;

          this.$options.staticRenderFns = [];

          for (const staticRenderFunction of compiled.staticRenderFns) {
              this.$options.staticRenderFns.push(staticRenderFunction);
          }

          this.templateRender = this.templateRender();
      },

      methods: {
          ...mapActions({
              getPosts: 'blog/getPosts',

          }),

          ...mapGetters({
              theme: 'default/theme',
              getPost: 'blog/getPost'
          }),
      }
  }
</script>
