import {eventBus} from "../eventBus";
import client from './../plugins/client';

export const strict = false;

export const state = () => ({
    posts: [],
    currentPage: 1,
    morePosts: false,
    loadingMore: false,
    endpoint: '/posts',
})

export const actions = {
    getPosts({ state, commit }) {
        return new Promise((resolve, reject) => {
            client.get('https://api.welford.dev/wp-json/wp/v2/posts?per_page=9&_embed').then((r) => {
                commit('SET_MORE_POSTS', r.headers['x-wp-totalpages'] > state.currentPage);

                resolve(r.data);
            });
        });
    },

    loadMore({ state, commit }) {
        commit('SET_LOADING', true);
        commit('INCREMENT_PAGE');

        client.get('https://api.welford.dev/wp-json/wp/v2/posts?per_page=9&_embed&page=' + state.currentPage).then((r) => {
            commit('SET_MORE_POSTS', r.headers['x-wp-totalpages'] > state.currentPage);

            commit('APPEND_POSTS', r.data);
            commit('SET_LOADING', false);
        });
    }
}

export const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts;
    },

    INCREMENT_PAGE(state) {
        state.currentPage++;
    },

    APPEND_POSTS(state, posts) {
        state.posts = state.posts.concat(posts);
    },

    SET_MORE_POSTS(state, morePosts) {
        state.morePosts = morePosts;
    },

    SET_LOADING(state, loadingMore) {
        state.loadingMore = loadingMore;
    }
}

export const getters = {
    all(state) {
        return state.posts;
    },

    loadingMore(state) {
        return state.loadingMore;
    },

    morePosts(state) {
        return state.morePosts;
    },

    getPost(state) {
        return (slug) => {
            return state.posts.filter(post => {
                return post.slug == slug;
            })[0];
        }
    }
}

