<template>
  <div>
    <h2 :class="{'text-blue-darkest': theme() === 'light', 'text-white': theme() === 'dark'}">Comments ({{ parentCommentCount }})</h2>
    <div class="flex mt-4 flex-wrap mb-16">
      <img class="mr-4 h-16 rounded" src="https://secure.gravatar.com/avatar/a56f0cb48dce5a44de6b95f15e2abbdc?s=64&d=mm&f=y&r=g" alt="Person silhouette" />

      <div class="flex-grow">
        <textarea v-model="comment" placeholder="Add your own comment. Keep it clean, please." class="appearance-none block w-full h-32 text-grey-darker border rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker focus:shadow-lg shadow-md resize-none border-grey"></textarea>
        <input v-if="!!comment" placeholder="Your name, please." v-model="name" class="mt-2 appearance-none block w-full text-grey-darker border rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker focus:shadow-lg shadow-md resize-none border-grey" />
        <input v-if="!!name" v-model="email" type="email" placeholder="I'll need your e-mail, please." class="mt-2 appearance-none block w-full text-grey-darker border rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker focus:shadow-lg shadow-md resize-none border-grey" />
        <app-button v-if="!!email && validEmail" class="mt-2" @click.native="submitComment">Post Comment</app-button>
      </div>
    </div>

    <post-comment :post-id="post" :comment-id="parent.id" :name="parent.author_name" :content="parent.content.rendered" :avatar="parent.author_avatar_urls['48']" v-for="parent in commentsWithReplies">
      <post-comment :post-id="child.id" :comment-id="child.id" :parent="parent.id" :name="child.author_name" :content="child.content.rendered" :avatar="child.author_avatar_urls['48']" v-for="child in parent.children"></post-comment>
    </post-comment>
  </div>
</template>

<script>
  import { mapGetters, mapAction } from 'vuex';
  import PostComment from "./PostComment";
  import AppButton from "./AppButton";

  export default {
      name: 'post-comments',
      components: {AppButton, PostComment},
      props: ['post'],

      data() {
          return {
              comment: '',
              email: '',
              name: ''
          }
      },

      async beforeMount() {
          let comments = await this.$store.dispatch('blog/getComments', this.$props.post);

          this.$store.commit('blog/SET_COMMENTS', comments);
      },

      methods: {
          ...mapGetters({
              theme: 'default/theme',
              comments: 'blog/comments'
          }),

          submitComment() {
            this.$store.dispatch('blog/submitComment', {
                author_email: this.email,
                author_name: this.name,
                content: this.comment,
                post: this.$props.post
            }).then(() => {
                this.$forceUpdate();

                this.comment = "";
                this.name = "";
                this.email = "";
            })
          }
      },

      computed: {
          parentCommentCount() {
              return this.comments().filter((comment) => {
                  return comment.parent === 0;
              }).length;
          },

          commentsWithReplies() {
              let childComments = this.comments().filter((comment) => {
                  return comment.parent !== 0;
              });

              let parentComments = this.comments().filter((comment) => {
                  return comment.parent === 0;
              });

              parentComments.forEach((parentComment) => {
                  if (! 'children' in parentComment) {
                      parentComment.children = [];
                  }

                  parentComment.children = childComments.filter((comment) => {
                      return comment.parent === parentComment.id;
                  })
              });

              return parentComments;
          },

          validEmail() {
              let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              return re.test(this.email);
          }
      }
  }
</script>

<style>

</style>
