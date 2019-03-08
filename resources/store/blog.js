export const strict = false;

export const state = () => ({
    endpoint: 'https://api.welford.me/posts',
    posts: []
})

export const mutations = {
    async setPosts(state) {
        return await (await fetch(new Request(state.endpoint))).json();
    }
}

export const getters = {
    all(state) {
        if (state.posts.length) {
            return state.posts;
        } else {
            let posts = mutations.setPosts(state);

            return posts;
        }
    }
}
