<template>
  <div class="mt-8" :class="{'ml-20': parent}">
    <div class="flex mt-4 flex-wrap">
      <img class="mr-4 h-16 rounded" :src="avatar" alt="Person silhouette" />

      <div class="flex-grow">
        <div class="flex flex-grow text-sm">
          {{ name }} <!--<span class="text-2xl mx-2 name-separator">·</span> 2 Days Ago-->
        </div>

        <div class="flex-grow mt-2 text-sm" v-html="content"></div>

        <span v-if="!parent" class="mt-2 inline-block text-xs cursor-pointer w-auto" @click="showReply = !showReply">Reply {{ replyIcon }}</span>

        <div class="flex-grow mt-2" v-if="showReply">
          <textarea v-model="comment" placeholder="Add your own comment. Keep it clean, please." class="appearance-none block w-full h-16 text-grey-darker border rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker focus:shadow-lg shadow-md resize-none border-grey"></textarea>
          <input v-if="!!comment" placeholder="Your name, please." v-model="authorName" class="mt-2 appearance-none block w-full text-grey-darker border rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker focus:shadow-lg shadow-md resize-none border-grey" />
          <input v-if="!!authorName" v-model="email" type="email" placeholder="I'll need your e-mail, please." class="mt-2 appearance-none block w-full text-grey-darker border rounded p-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey-darker focus:shadow-lg shadow-md resize-none border-grey" />
          <app-button v-if="!!email && validEmail" class="mt-2" @click.native="submitComment">Post Reply</app-button>
        </div>
      </div>
      </div>

    <slot />
  </div>
</template>

<script>
    import AppButton from "./AppButton";
    export default {
        name: 'post-comment',
        components: {AppButton},
        props: ['name', 'content', 'avatar', 'parent', 'postId', 'commentId'],

        data() {
            return {
                showReply: false,
                comment: "",
                email: "",
                authorName: "",
            }
        },

        methods: {
            submitComment() {
                this.$store.dispatch('blog/submitComment', {
                    author_email: this.email,
                    author_name: this.name,
                    content: this.comment,
                    post: this.$props.postId,
                    parent: this.$props.commentId
                }).then(() => {
                    this.$forceUpdate();

                    this.showReply = false;

                    this.comment = "";
                    this.name = "";
                    this.email = "";
                })
            }
        },

        computed: {
            validEmail() {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                return re.test(this.email);
            },

            replyIcon() {
                if (this.showReply) {
                    return '-';
                }

                return '+';
            }
        }
    }
</script>

<style>
  .name-separator {
    line-height: .8;
  }
</style>
