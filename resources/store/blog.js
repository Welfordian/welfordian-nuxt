import { client } from './../plugins/client';

export const strict = false;

export const state = () => ({
    posts: [],
    currentPage: 1,
    morePosts: false,
    loadingMore: false,
    endpoint: '/posts',
    comments: []
})

export const actions = {
    getPosts({ state, commit, rootState }, slug = false) {
        let endpoint = 'https://api.laravel-freelancer.com/wp-json/wp/v2/posts?per_page=9&_embed&_tags';

        if (rootState.auth.loggedIn) {
            endpoint = 'https://api.laravel-freelancer.com/wp-json/wp/v2/posts?per_page=9&_embed&_tags&status=any';
        }

        if (slug) {
            endpoint += "&filter[tag]=" + slug;
        }

        return new Promise((resolve) => {
            client.get(endpoint).then((r) => {
                commit('SET_MORE_POSTS', r.headers['x-wp-totalpages'] > state.currentPage);

                resolve(r.data);
            });
        });
    },

    getComments({ state, commit, rootState }, id = false) {
        let endpoint = `https://api.laravel-freelancer.com/wp-json/wp/v2/comments?post=${id}&_embedded`;

        return new Promise((resolve) => {
            client.get(endpoint).then((r) => {
                resolve(r.data);
            });
        });
    },

    submitComment({ state, commit, rootState}, data) {
        let endpoint = `https://api.laravel-freelancer.com/wp-json/wp/v2/comments`;

        return new Promise((resolve) => {
            client.post(endpoint, data).then((r) => {
                commit('ADD_COMMENT', r.data);

                resolve();
            });
        });
    },

    loadMore({ state, commit }) {
        commit('SET_LOADING', true);
        commit('INCREMENT_PAGE');

        client.get('https://api.laravel-freelancer.com/wp-json/wp/v2/posts?per_page=9&_embed&status=any&page=' + state.currentPage).then((r) => {
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
    },

    SET_COMMENTS(state, comments) {
        state.comments = comments;
    },

    ADD_COMMENT(state, comment) {
        state.comments.unshift(comment);
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
    },

    comments(state) {
        return state.comments;
    }
}

