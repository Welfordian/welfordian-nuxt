export const state = () => ({
    theme: 'dark'
})

export const mutations = {
    initialTheme(state) {
        state.theme = localStorage.hasOwnProperty('jw-theme') ? localStorage.getItem('jw-theme') : state.theme;
    },

    toggleTheme(state) {
        if (state.theme === 'light') {
            state.theme = 'dark';
            localStorage.setItem('jw-theme', 'dark');
        } else {
            state.theme = 'light';
            localStorage.setItem('jw-theme', 'light');
        }
    }
}

export const getters = {
    theme(state) {
        return state.theme;
    }
}
