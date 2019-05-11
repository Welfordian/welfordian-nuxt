import {eventBus} from "../eventBus";
import client from './../plugins/client';

export const strict = false;

export const state = () => ({
    posts: [],
    endpoint: '/posts',
})

export const actions = {
    getPosts({ state, commit }) {
        return new Promise((resolve, reject) => {
            client.get('https://api.welford.dev/wp-json/wp/v2/posts?per_page=12&_embed').then((r) => {
                resolve(r.data);
            });
        });
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

