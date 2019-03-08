import {eventBus} from "../eventBus";

export const strict = false;

export const state = () => ({
    posts: [],
    endpoint: '/api/v1/posts',
})

export const actions = {
    async getPosts({ state, commit }) {
        if (! state.posts.length) {
            eventBus.$emit('GOT_POSTS');
            commit('SET_POSTS', await (await fetch(new Request(state.endpoint))).json());
        }
    },
}

export const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts;
    }
}

export const getters = {
    all(state) {
        return state.posts;
    },

    getPost(state) {
        return (slug) => {
            return state.posts.filter(post => {
                return post.slug == slug;
            })[0];
        }
    }
}

